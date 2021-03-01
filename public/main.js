main();

//
// Start here
//
function main() {
    const canvas = document.querySelector('#glcanvas');
    // Initialize the GL context
    const gl = canvas.getContext('webgl');

    // If we don't have a GL context, give up now
    // Only continue if WebGL is available and working

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }
    
    // Vertex Shader Program
    const vShaderProgram = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
    `;
    
    // Fragment Shader program
    const fShaderProgram = `
    varying lowp vec4 vColor; 
    void main() {
        gl_FragColor = vColor;
    }
    `;

    // Initialize the shader program
    const ShaderProgram = initShaderProgram(gl, vShaderProgram, fShaderProgram);
    
    //Lookup attributes and uniform locations
    const ProgramInfo = {
        program: ShaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(ShaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(ShaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(ShaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(ShaderProgram, 'uModelViewMatrix'),
        },
    };
    
    const buffers = initBuffer(gl);
   
    // Draw
    drawScene(gl, ProgramInfo, buffers);
    
}


// Now we have to pass the shaders to WebGL

// Initialize shader program
function initShaderProgram(gl, vShaderProgram, fShaderProgram) {
    const VertexShader = loadShader(gl, gl.VERTEX_SHADER, vShaderProgram);
    const FragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fShaderProgram);

   
    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, VertexShader); // we are attaching the vertex shader to the shader program
    gl.attachShader(shaderProgram, FragmentShader); // then we are attaching the fragment shader to the shader program also
    gl.linkProgram(shaderProgram); // finally we link the two to combine into one shader program
    

    // check to if link failed
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Shader Link failed " + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    // If Link is successful we return shaderProgram
    return shaderProgram;

}

// Load Shader
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the shader source
    gl.shaderSource(shader, source);

    // Compile shader program
    gl.compileShader(shader);

    // Check to see if compiled
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Shader did not compile " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    // If shader doesn't fail we return shader
    return shader;
}

// Create initial buffer for our shape
function initBuffer(gl){

    // Shape Array
    const positions = [
        1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        -1.0, -1.0,
    ];

    //color Array
    const colors = [
        1.0, 0.0, 1.0, 1.0, // (Top Right)
        1.0, 0.0, 1.0, 1.0, // (Top Left)
        0.0, 0.0, 1.0, 1.0, // (Bottom Right)
        0.0, 0.0, 1.0, 1.0, // (Bottom Left)
    ]
    // Create Position Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create Color Buffer
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return {
        position: positionBuffer, 
        color: colorBuffer,
    };
}

// Draw
function drawScene(gl, ProgramInfo, buffers){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Sets canvas to white
    gl.clearDepth(1);           // Clears everything
    gl.enable(gl.DEPTH_TEST);   // Enables depth tester
    gl.depthFunc(gl.LEQUAL);    // Closer objects overlap the further away objects

    // Clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create perspective matrix
    const FOV = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix,
        FOV,
        aspect,
        zNear,
        zFar);

    // Set the draw position
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);

    // Pulling position to webGL
    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            ProgramInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            ProgramInfo.attribLocations.vertexPosition);
    }

    // Pulling colors to webGL
    {
        const numComponents = 4;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
        gl.vertexAttribPointer(
            ProgramInfo.attribLocations.vertexColor,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            ProgramInfo.attribLocations.vertexColor);
    }

    // Use Program when drawing
    gl.useProgram(ProgramInfo.program);

    // Set shader uniforms
    gl.uniformMatrix4fv(ProgramInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(ProgramInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    
} 
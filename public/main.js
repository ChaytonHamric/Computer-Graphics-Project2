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
    
    /*
            ARM 1 MODEL
    */
    {
    // Vertex Shader Program
    const vArmOneShaderProgram = `
    attribute vec4 aArmOneVertexPosition;
    attribute vec4 aArmOneVertexColor;

    uniform mat4 uArmOneModelViewMatrix;
    uniform mat4 uArmOneProjectionMatrix;

    varying lowp vec4 vArmOneColor;

    void main() {
      gl_Position = uArmOneProjectionMatrix * uArmOneModelViewMatrix * aArmOneVertexPosition;
      vArmOneColor = aArmOneVertexColor;
    }
    `;
    
    // Fragment Shader program
    const fArmOneShaderProgram = `
    varying lowp vec4 vArmOneColor; 
    void main() {
        gl_FragColor = vArmOneColor;
    }
    `;

    // Initialize the shader program
    const ArmOneShaderProgram = initShaderProgram(gl, vArmOneShaderProgram, fArmOneShaderProgram);
    
    //Lookup attributes and uniform locations
    const ArmOneProgramInfo = {
        program: ArmOneShaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(ArmOneShaderProgram, 'aArmOneVertexPosition'),
            vertexColor: gl.getAttribLocation(ArmOneShaderProgram, 'aArmOneVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(ArmOneShaderProgram, 'uArmOneProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(ArmOneShaderProgram, 'uArmOneModelViewMatrix'),
        },
    };

    // Positioning of vectors
    const positions = [
        // Front face
        -0.5, -0.2, 0.2,
        0.5, -0.2, 0.2,
        0.5, 0.2, 0.2,
        -0.5, 0.2, 0.2,

        // Back face
        -0.5, -0.2, -0.2,
        -0.5, 0.2, -0.2,
        0.5, 0.2, -0.2,
        0.5, -0.2, -0.2,

        // Top face
        -0.5, 0.2, -0.2,
        -0.5, 0.2, 0.2,
        0.5, 0.2, 0.2,
        0.5, 0.2, -0.2,

        // Bottom face
        -0.5, -0.2, -0.2,
        0.5, -0.2, -0.2,
        0.5, -0.2, 0.2,
        -0.5, -0.2, 0.2,

        // Right face
        0.5, -0.2, -0.2,
        0.5, 0.2, -0.2,
        0.5, 0.2, 0.2,
        0.5, -0.2, 0.2,

        // Left face
        -0.5, -0.2, -0.2,
        -0.5, -0.2, 0.2,
        -0.5, 0.2, 0.2,
        -0.5, 0.2, -0.2,
    ];
    
    // Coloring of 3D Model
    const faceColors = [
        [1.0, 1.0, 1.0, 1.0],    // Front face: white
        [1.0, 0.0, 0.0, 1.0],    // Back face: red
        [0.0, 1.0, 0.0, 1.0],    // Top face: green
        [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
        [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
        [1.0, 0.0, 1.0, 1.0],    // Left face: purple
    ];

    // Indices for individual vectors
    const indices = [
        0, 1, 2, 0, 2, 3,    // front
        4, 5, 6, 4, 6, 7,    // back
        8, 9, 10, 8, 10, 11,   // top
        12, 13, 14, 12, 14, 15,   // bottom
        16, 17, 18, 16, 18, 19,   // right
        20, 21, 22, 20, 22, 23,   // left
    ];

    const ArmOneBuffers = initBuffer(gl, positions, faceColors, indices);
   
    // Draw ArmOne
    drawScene(gl, ArmOneProgramInfo, ArmOneBuffers);
    }

    /*
            ARM 2 MODEL
    */
   {

   }
    
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
function initBuffer(gl, positions, faceColors, indices){

    // Create Position Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create Color Buffer
    var colors = [];
    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];

        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c, c, c);
    }
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // Now send the element array to GL
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices), gl.STATIC_DRAW);

    return {
        position: positionBuffer, 
        color: colorBuffer,
        indices: indexBuffer,
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

    mat4.rotate(modelViewMatrix, modelViewMatrix, -0.45, [0, 0, 1]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, 0.45, [0, 1, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, -1, [1, 0, 0]);

    // Pulling position to webGL
    {
        const numComponents = 3;
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

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Use Program when drawing
    gl.useProgram(ProgramInfo.program);

    // Set shader uniforms
    gl.uniformMatrix4fv(ProgramInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(ProgramInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

    {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    
} 
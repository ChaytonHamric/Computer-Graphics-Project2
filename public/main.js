main();

//
// Start here
//
function main() {
    const canvas = document.querySelector('#glcanvas');
    // Initialize the GL context
    const gl = canvas.getContext('webgl',{ preserveDrawingBuffer: true });

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
        [0.0, 0.0, 0.0, 1.0],    // Front face: white
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

    // Rotation and Transition data
    const ArmOnePosInfo = {
        xRotation: 1.45,
        yRotation: 0.45,
        zRotation: -0.45,

        xTranslation: 0,
        yTranslation: -0.2,
        zTranslation: -5.0,
    };

    const ArmOneBuffers = initBuffer(gl, positions, faceColors, indices);
   
    // Draw ArmOne
        drawScene(gl, ArmOneProgramInfo, ArmOneBuffers, ArmOnePosInfo);
    }
    /*
            ARM 2 MODEL
    */
   {
        // Vertex Shader Program
        const vArmTwoShaderProgram = `
        attribute vec4 aArmTwoVertexPosition;
        attribute vec4 aArmTwoVertexColor;

        uniform mat4 uArmTwoModelViewMatrix;
        uniform mat4 uArmTwoProjectionMatrix;

        varying lowp vec4 vArmTwoColor;

        void main() {
            gl_Position = uArmTwoProjectionMatrix * uArmTwoModelViewMatrix * aArmTwoVertexPosition;
            vArmTwoColor = aArmTwoVertexColor;
        }
        `;

        // Fragment Shader program
        const fArmTwoShaderProgram = `
        varying lowp vec4 vArmTwoColor; 
        void main() {
            gl_FragColor = vArmTwoColor;
        }
        `;

        // Initialize the shader program
        const ArmTwoShaderProgram = initShaderProgram(gl, vArmTwoShaderProgram, fArmTwoShaderProgram);

        //Lookup attributes and uniform locations
        const ArmTwoProgramInfo = {
            program: ArmTwoShaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(ArmTwoShaderProgram, 'aArmTwoVertexPosition'),
                vertexColor: gl.getAttribLocation(ArmTwoShaderProgram, 'aArmTwoVertexColor'),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(ArmTwoShaderProgram, 'uArmTwoProjectionMatrix'),
                modelViewMatrix: gl.getUniformLocation(ArmTwoShaderProgram, 'uArmTwoModelViewMatrix'),
            },
        };

        // Positioning of vectors
        const ArmTwoPositions = [
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
        const ArmTwoFaceColors = [
            [0.0, 0.0, 0.0, 1.0],    // Front face: white
            [1.0, 0.0, 0.0, 1.0],    // Back face: red
            [1.0, 0.0, 0.0, 1.0],    // Top face: green
            [1.0, 0.0, 0.0, 1.0],    // Bottom face: blue
            [1.0, 0.0, 0.0, 1.0],    // Right face: yellow
            [1.0, 0.0, 1.0, 1.0],    // Left face: purple
        ];

        // Indices for individual vectors
        const ArmTwoIndices = [
            0, 1, 2, 0, 2, 3,    // front
            4, 5, 6, 4, 6, 7,    // back
            8, 9, 10, 8, 10, 11,   // top
            12, 13, 14, 12, 14, 15,   // bottom
            16, 17, 18, 16, 18, 19,   // right
            20, 21, 22, 20, 22, 23,   // left
        ];

        // Rotation and Transition data
        const ArmTwoPosInfo = {
            xRotation: -0.45,
            yRotation: 0.45,
            zRotation: 0.45,

            xTranslation: -0.2,
            yTranslation: -0.6,
            zTranslation: -6.0,
        };

        const ArmTwoBuffers = initBuffer(gl, ArmTwoPositions, ArmTwoFaceColors, ArmTwoIndices);

        // Draw ArmOne
        drawScene(gl, ArmTwoProgramInfo, ArmTwoBuffers, ArmTwoPosInfo);
   }

    /*
            Body MODEL
    */
    {
        // Vertex Shader Program
        const vBodyShaderProgram = `
        attribute vec4 aBodyVertexPosition;
        attribute vec4 aBodyVertexColor;

        uniform mat4 uBodyModelViewMatrix;
        uniform mat4 uBodyProjectionMatrix;

        varying lowp vec4 vBodyTwoColor;

        void main() {
            gl_Position = uBodyProjectionMatrix * uBodyModelViewMatrix * aBodyVertexPosition;
            vBodyTwoColor = aBodyVertexColor;
        }
        `;

        // Fragment Shader program
        const fBodyShaderProgram = `
        varying lowp vec4 vBodyTwoColor; 
        void main() {
            gl_FragColor = vBodyTwoColor;
        }
        `;

        // Initialize the shader program
        const BodyShaderProgram = initShaderProgram(gl, vBodyShaderProgram, fBodyShaderProgram);

        //Lookup attributes and uniform locations
        const BodyProgramInfo = {
            program: BodyShaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(BodyShaderProgram, 'aBodyVertexPosition'),
                vertexColor: gl.getAttribLocation(BodyShaderProgram, 'aBodyVertexColor'),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(BodyShaderProgram, 'uBodyProjectionMatrix'),
                modelViewMatrix: gl.getUniformLocation(BodyShaderProgram, 'uBodyModelViewMatrix'),
            },
        };
        // Object Details
        
        // Positioning of vectors
        const BodyPositions = [
            // Front face
            -1.0, -0.2, 0.4,
            1.0, -0.2, 0.4,
            1.0, 0.2, 0.4,
            -1.0, 0.2, 0.4,

            // Back face
            -1.0, -0.2, -0.4,
            -1.0, 0.2, -0.4,
            1.0, 0.2, -0.4,
            1.0, -0.2, -0.4,

            // Top face
            -1.0, 0.2, -0.4,
            -1.0, 0.2, 0.4,
            1.0, 0.2, 0.4,
            1.0, 0.2, -0.4,

            // Bottom face
            -1.0, -0.2, -0.4,
            1.0, -0.2, -0.4,
            1.0, -0.2, 0.4,
            -1.0, -0.2, 0.4,

            // Right face
            1.0, -0.2, -0.4,
            1.0, 0.2, -0.4,
            1.0, 0.2, 0.4,
            1.0, -0.2, 0.4,

            // Left face
            -1.0, -0.2, -0.4,
            -1.0, -0.2, 0.4,
            -1.0, 0.2, 0.4,
            -1.0, 0.2, -0.4,
        ];

        // Coloring of 3D Model
        const BodyFaceColors = [
            [0.0, 0.0, 0.2, 1.0],    // Front face: white
            [1.0, 0.0, 0.0, 1.0],    // Back face: red
            [0.0, 1.0, 0.0, 1.0],    // Top face: green
            [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
            [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
            [1.0, 0.0, 1.0, 1.0],    // Left face: purple
        ];

        // Indices for individual vectors
        const BodyIndices = [
            0, 1, 2, 0, 2, 3,    // front
            4, 5, 6, 4, 6, 7,    // back
            8, 9, 10, 8, 10, 11,   // top
            12, 13, 14, 12, 14, 15,   // bottom
            16, 17, 18, 16, 18, 19,   // right
            20, 21, 22, 20, 22, 23,   // left
        ];

        // Rotation and Transition data
        const BodyPosInfo = {
            xRotation: -0.45,
            yRotation: 0,
            zRotation: 1.5,

            xTranslation: 0.35,
            yTranslation: -0.6,
            zTranslation: -6.0,
        };

        const BodyBuffers = initBuffer(gl, BodyPositions, BodyFaceColors, BodyIndices);

        // Draw ArmOne
        drawScene(gl, BodyProgramInfo, BodyBuffers, BodyPosInfo);
    }

    /*
            Head MODEL
    */
    {
        // Vertex Shader Program
        const vHeadShaderProgram = `
        attribute vec4 aHeadVertexPosition;
        attribute vec4 aHeadVertexColor;

        uniform mat4 uHeadModelViewMatrix;
        uniform mat4 uHeadProjectionMatrix;

        varying lowp vec4 vHeadTwoColor;

        void main() {
            gl_Position = uHeadProjectionMatrix * uHeadModelViewMatrix * aHeadVertexPosition;
            vHeadTwoColor = aHeadVertexColor;
        }
        `;

        // Fragment Shader program
        const fHeadShaderProgram = `
        varying lowp vec4 vHeadTwoColor; 
        void main() {
            gl_FragColor = vHeadTwoColor;
        }
        `;

        // Initialize the shader program
        const HeadShaderProgram = initShaderProgram(gl, vHeadShaderProgram, fHeadShaderProgram);

        //Lookup attributes and uniform locations
        const HeadProgramInfo = {
            program: HeadShaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(HeadShaderProgram, 'aHeadVertexPosition'),
                vertexColor: gl.getAttribLocation(HeadShaderProgram, 'aHeadVertexColor'),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(HeadShaderProgram, 'uHeadProjectionMatrix'),
                modelViewMatrix: gl.getUniformLocation(HeadShaderProgram, 'uHeadModelViewMatrix'),
            },
        };
        // Object Details

        // Positioning of vectors
        const HeadPositions = [
            // Front face
            -0.40, -0.40, 0.40,
            0.40, -0.40, 0.40,
            0.40, 0.40, 0.40,
            -0.40, 0.40, 0.40,

            // Back face
            -0.40, -0.40, -0.40,
            -0.40, 0.40, -0.40,
            0.40, 0.40, -0.40,
            0.40, -0.40, -0.40,

            // Top face
            -0.40, 0.40, -0.40,
            -0.40, 0.40, 0.40,
            0.40, 0.40, 0.40,
            0.40, 0.40, -0.40,

            // Bottom face
            -0.40, -0.40, -0.40,
            0.40, -0.40, -0.40,
            0.40, -0.40, 0.40,
            -0.40, -0.40, 0.40,

            // Right face
            0.40, -0.40, -0.40,
            0.40, 0.40, -0.40,
            0.40, 0.40, 0.40,
            0.40, -0.40, 0.40,

            // Left face
            -0.40, -0.40, -0.40,
            -0.40, -0.40, 0.40,
            -0.40, 0.40, 0.40,
            -0.40, 0.40, -0.40,
        ];

        // Coloring of 3D Model
        const HeadFaceColors = [
            [0.4, 0.0, 0.4, 1.0],    // Front face: white
            [1.0, 0.0, 1.0, 1.0],    // Back face: red
            [1.0, 0.0, 1.0, 1.0],    // Top face: green
            [1.0, 0.0, 1.0, 1.0],    // Bottom face: blue
            [1.0, 0.0, 1.0, 1.0],    // Right face: yellow
            [1.0, 0.0, 1.0, 1.0],    // Left face: purple
        ];

        // Indices for individual vectors
        const HeadIndices = [
            0, 1, 2, 0, 2, 3,    // front
            4, 5, 6, 4, 6, 7,    // back
            8, 9, 10, 8, 10, 11,   // top
            12, 13, 14, 12, 14, 15,   // bottom
            16, 17, 18, 16, 18, 19,   // right
            20, 21, 22, 20, 22, 23,   // left
        ];

        // Rotation and Transition data
        const HeadPosInfo = {
            xRotation: -0.45,
            yRotation: 0,
            zRotation: 1.5,

            xTranslation: 0.35,
            yTranslation: 0.3,
            zTranslation: -6.0,
        };

        const HeadBuffers = initBuffer(gl, HeadPositions, HeadFaceColors, HeadIndices);

        // Draw ArmOne
        drawScene(gl, HeadProgramInfo, HeadBuffers, HeadPosInfo);
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
function drawScene(gl, ProgramInfo, buffers, PosInfo){
    gl.enable(gl.DEPTH_TEST);   // Enables depth tester
    gl.depthFunc(gl.LEQUAL);    // Closer objects overlap the further away objects

    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Sets canvas to white
    gl.clearDepth(1);           // Clears everything

    // Clear canvas
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
    mat4.translate(modelViewMatrix, modelViewMatrix, [PosInfo.xTranslation, PosInfo.yTranslation, PosInfo.zTranslation]);

    mat4.rotate(modelViewMatrix, modelViewMatrix, PosInfo.zRotation, [0, 0, 1]); // Z Rotation
    mat4.rotate(modelViewMatrix, modelViewMatrix, PosInfo.yRotation, [0, 1, 0]); // Y Rotation
    mat4.rotate(modelViewMatrix, modelViewMatrix, PosInfo.xRotation, [1, 0, 0]); // X Rotation

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
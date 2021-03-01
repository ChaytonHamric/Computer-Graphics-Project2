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
    const VertexShader = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionmatrix;

    void main(){
        gl_position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
    `;

    // Fragment Shader program
    const FragShader = `
    void main(){
        gl_FragColor = vec4(0, 0, 0, 1);
    }
    `;
    
}
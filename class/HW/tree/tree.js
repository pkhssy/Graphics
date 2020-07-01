
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    var leafs = new Float32Array([
        // Triangle 1 vertices:
      -0.4, 0.4,
       0.4, 0.4,
       0.0, 0.8,

        // Triangle 2 vertices:
        -0.4, 0.0,
       0.4, 0.0,
       0.0, 0.4,

      // Triangle 3 vertices:
        -0.4, -0.4,
       0.4, -0.4,
       0.0, 0.0,
    ]);
      
   var base = new Float32Array([
       // Triangle 1 vertices:
      -0.1, -0.8,
       0.1, -0.8,
       0.1, -0.4,

       // Triangle 2 vertices:
      -0.1, -0.8,
       0.1, -0.4,
      -0.1, -0.4,
    ]);


    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, leafs, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();




	//  Load shaders and initialize attribute buffers
   var program2 = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program2 );
    
   // Load the data into the GPU
    
    var bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER, base, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition2 = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );

    render2();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 9 );
}

function render2() {
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 6 );
}
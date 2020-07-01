var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" );
	}

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	
	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var fColor = gl.getUniformLocation(program, "fColor");

	// draw 50 random rectangles in random colors
	for(var ii = 0; ii < 50; ii++){

		// setup a random rectangle
		setRectangle(
			gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300)
		);

		// set a random color
		gl.uniform4f(fColor, Math.random(), Math.random(), Math.random(), 1);

		// Draw the rectangle
		var primitiveType = gl.TRIANGLES;
		var offset = 0;
		var count = 6;
		gl.drawArrays(primitiveType, offset, count);
	}
};

// 0과 -1사이의 정수를 반환
function randomInt(range) {
	return Math.floor(Math.random() * range);
}

function setRectangle(gl, x, y, width, height) {
	var x1 = x;
	var x2 = x + width;
	var y1 = y;
	var y2 = y + height;
 
	 // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
	 // whatever buffer is bound to the `ARRAY_BUFFER` bind point
	 // but so far we only have one buffer. If we had more than one
	// buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.
 
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		x1, y1,
		x2, y1,
		x1, y2,
		x1, y2,
		x2, y1,
		x2, y2
	]), 
		gl.STATIC_DRAW);
}
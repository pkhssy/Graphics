var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );    
	if ( !gl ) { alert( "WebGL isn't available" ); }   


	var sky = [
		vec2(-1.0, 1.0),
		vec2(-1.0, 0.1),
		vec2(1.0, 1.0),	
		vec2(1.0, 0.1)
		];

	var sky_color = [
		vec4(0.0, 0.0, 1.0, 0.5),
		vec4(0.0, 0.0, 1.0, 0.1),
		vec4(0.0, 0.0, 1.0, 0.5),
		vec4(0.0, 0.0, 1.0, 0.1)
	];

	var sun = [
		vec2(-0.4, 0.6),
		vec2(-0.5, 0.8),
		vec2(-0.7, 0.8),
		vec2(-0.8, 0.6),
		vec2(-0.7, 0.4),
		vec2(-0.5, 0.4),
		vec2(-0.4, 0.6)
	];

	var sun_color = [
		vec4(1.0, 0.0, 0.0, 1.0),
		vec4(1.0, 0.0, 0.0, 1.0),
		vec4(1.0, 0.0, 0.0, 0.9),
		vec4(1.0, 0.0, 0.0, 1.0),
		vec4(1.0, 0.0, 0.0, 1.0),
		vec4(1.0, 0.0, 0.0, 1.0)
	];

	var cloud1 = [
		vec2(0.6, 0.6),
		vec2(0.65, 0.7),
		vec2(0.75, 0.7),
		vec2(0.8, 0.6),
		vec2(0.75, 0.5),
		vec2(0.65, 0.5),
		vec2(0.6, 0.6)
	];
	
	var cloud2 = [
		vec2(0.45, 0.6),
		vec2(0.5, 0.7),
		vec2(0.6, 0.7),
		vec2(0.65, 0.6),
		vec2(0.6, 0.5),
		vec2(0.5, 0.5),
		vec2(0.45, 0.6)
	];

	var cloud3 = [
		vec2(0.3, 0.6),
		vec2(0.35, 0.7),
		vec2(0.45, 0.7),
		vec2(0.5, 0.6),
		vec2(0.45, 0.5),
		vec2(0.35, 0.5),
		vec2(0.3, 0.6)
	];

	var cloud_color1 = [
		vec4(0.4, 0.7, 0.87, 0.5),
		vec4(0.4, 0.7, 0.87, 1.0),
		vec4(0.4, 0.7, 0.87, 0.5),
		vec4(0.4, 0.7, 0.87, 0.5),
		vec4(0.4, 0.7, 0.87, 1.0),
		vec4(0.4, 0.7, 0.87, 0.5)
	];

	var cloud_color2 = [
		vec4(0.4, 0.7, 0.87, 1.0),
		vec4(0.4, 0.7, 0.87, 0.5),
		vec4(0.4, 0.7, 0.87, 0.5),
		vec4(0.4, 0.7, 0.87, 1.0),
		vec4(0.4, 0.7, 0.87, 0.5),
		vec4(0.4, 0.7, 0.87, 1.0)
	];

	var cloud_color3 = [
		vec4(0.4, 0.7, 0.87, 0.5),
		vec4(0.4, 0.7, 0.87, 1.0),
		vec4(0.4, 0.7, 0.87, 1.0),
		vec4(0.4, 0.7, 0.87, 0.5),
		vec4(0.4, 0.7, 0.87, 0.8),
		vec4(0.4, 0.7, 0.87, 0.5),
	];

	var butterfly = [
		vec2(0.0, 0.5),
		vec2(0.1, 0.4),
		vec2(0.1, 0.6),

		vec2(0.0, 0.5),
		vec2(-0.1, 0.4),
		vec2(-0.1, 0.6)
	];

	var butterfly_color = [
		vec4(1.0, 0.8, 0.0, 1.0),
		vec4(1.0, 0.8, 0.0, 0.5),
		vec4(1.0, 0.8, 0.0, 1.0),

		vec4(1.0, 0.8, 0.0, 1.0),
		vec4(1.0, 0.8, 0.0, 0.5),
		vec4(1.0, 0.8, 0.0, 1.0)
	];

	var feelers = [
		vec2(-0.07, 0.63),
		vec2(-0.02, 0.60),
		vec2(0.0, 0.5),
		vec2(0.02, 0.60),
		vec2(0.07, 0.63),
		
	];

	


	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load Shaders and initialize
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	

	/*-------------------------------------------------------------------------------------------------- */
	/* sky---------------------------------------------------------------------------------------- */
	/*-------------------------------------------------------------------------------------------------- */

	// sky
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(sky), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	// sky color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(sky_color), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);


	/*-------------------------------------------------------------------------------------------------- */
	/* sun---------------------------------------------------------------------------------------- */
	/*-------------------------------------------------------------------------------------------------- */

	// sun
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(sun), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	// sun color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(sun_color), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);

	/*-------------------------------------------------------------------------------------------------- */
	/* cloud---------------------------------------------------------------------------------------- */
	/*-------------------------------------------------------------------------------------------------- */

	// cloud1
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cloud1), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	// cloud color1
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cloud_color1), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);

	// cloud2
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cloud2), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	// cloud color2
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cloud_color2), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);

	// cloud3
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cloud3), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	// cloud color3
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cloud_color3), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);


	/*-------------------------------------------------------------------------------------------------- */
	/* butterfly---------------------------------------------------------------------------------------- */
	/*-------------------------------------------------------------------------------------------------- */

	// butterfly
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(butterfly), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	// butterfly color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(butterfly_color), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	gl.drawArrays(gl.TRIANGLES, 0, 6);


	/*-------------------------------------------------------------------------------------------------- */
	/* feelers---------------------------------------------------------------------------------------- */
	/*-------------------------------------------------------------------------------------------------- */

	// feelers
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(feelers), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var colorLoc = gl.getUniformLocation(program,"color");
	gl.uniform4f(colorLoc, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays( gl.LINE_STRIP, 0, 5 ); 

	/*// butterfly color
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(butterfly_color), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	gl.drawArrays(gl.TRIANGLES, 0, 6);*/




}
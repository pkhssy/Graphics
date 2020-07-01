var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );    
	if ( !gl ) { alert( "WebGL isn't available" ); }   

	//vertices
	var vWater = [
		vec2(-1,-0.3),
		vec2(-1,-1),
		vec2(1,-0.3),	
		vec2(1,-1)];
	var vStoneBridge1 = [
		vec2(-0.2,-0.3),
		vec2(-0.25,-0.4),
		vec2(0.2,-0.3),
		vec2(0.25,-0.4)];
	var vStoneBridge2 = [
		vec2(0.3,-0.5),
		vec2(-0.3,-0.5),
		vec2(0.35,-0.6),
		vec2(-0.35,-0.6)];
	var vStoneBridge3 = [
		vec2(0.4,-0.7),
		vec2(-0.4,-0.7),
		vec2(0.45,-0.8),
		vec2(-0.45,-0.8)];
	var vStoneBridge4 = [
		vec2(0.5,-0.9),
		vec2(-0.5,-0.9),
		vec2(0.55,-1.0),
		vec2(-0.55,-1.0)];
	var vPaperShipHead = [
		vec2(-0.65,-0.4),
		vec2(-0.7,-0.5),
		vec2(-0.6,-0.5)];
	var vPaperShipBody = [
		vec2(-0.85,-0.5),
		vec2(-0.75,-0.6),
		vec2(-0.45,-0.5),	
		vec2(-0.55,-0.6)];
	var vFishTail =[
		vec2(0.7,-0.55),
		vec2(0.8,-0.5),
		vec2(0.75,-0.55),	
		vec2(0.8,-0.6)];
	var vFishBody =[
		vec2(0.5,-0.55),
		vec2(0.7,-0.55),
		vec2(0.65,-0.5),	
		vec2(0.5,-0.5),
		vec2(0.45,-0.525),
		vec2(0.45,-0.575),
		vec2(0.5,-0.6),	
		vec2(0.65,-0.6),
		vec2(0.7,-0.55)];
	var vFishMouth = [
		vec2(0.45,-0.525),
		vec2(0.45,-0.575),
		vec2(0.5,-0.55)];
	var cStone = [
		vec4(0.5,0.5,0.5,0.5),
		vec4(0.5,0.5,0.5,1.0),
		vec4(0.5,0.5,0.5,0.5),
		vec4(0.5,0.5,0.5,1.0)];
	var cWater = [
		vec4(0.0,0.0,1.0,0.5),
		vec4(0.0,0.0,1.0,1.0),
		vec4(0.0,0.0,1.0,0.5),
		vec4(0.0,0.0,1.0,1.0)];
	var cPaper = [
		vec4(1.0,1.0,1.0,0.5),
		vec4(1.0,1.0,1.0,1.0),
		vec4(1.0,1.0,1.0,0.5),
		vec4(1.0,1.0,1.0,1.0)];
	var cFishTail = [
		vec4(0.0,1.0,1.0,0.5),
		vec4(1.0,0.0,1.0,0.5),
		vec4(1.0,1.0,0.0,0.5),
		vec4(1.0,1.0,0.0,0.5)];
	var cFishBody =[
		vec4(0.0,1.0,1.0,0.5),
		vec4(1.0,0.0,1.0,0.5),
		vec4(1.0,1.0,0.0,0.5),
		vec4(1.0,1.0,0.0,0.5),
		vec4(0.0,1.0,1.0,0.5),
		vec4(1.0,0.0,1.0,0.5),
		vec4(1.0,1.0,0.0,0.5),
		vec4(1.0,1.0,0.0,0.5),
		vec4(0.0,1.0,1.0,0.5)];
	var	cFishMouth =[
		vec4(1.0,0.0,0.0,0.5),
		vec4(1.0,0.0,0.0,0.5),
		vec4(1.0,0.0,0.0,0.5)];

	
	var grass = [
		vec2(-0.6,-0.35),
		vec2(-0.55,-0.3),
		vec2(-0.5,-0.35)
	];


	var SmallTree_leaf = [ // -0.8 이 좌측
		 // 첫번째 삼각형
		vec2(-0.55, 0.3), // 꼭대기
		vec2(-0.65,0.15), // 좌측
		vec2(-0.45,0.15), // 우측
		// 두번째 삼각형
		vec2(-0.55, 0.15), // 꼭대기
		vec2(-0.65, 0.0), // 좌측
		vec2(-0.45,0.0), // 우측
		// 세번째 삼각형
		vec2(-0.55, 0.0), // 꼭대기
		vec2(-0.65,-0.15), // 좌측
		vec2(-0.45,-0.15) // 우측
	];

	var SmallTree_wood = [
		vec2(-0.58, -0.15),
		vec2(-0.58,-0.27),
		vec2(-0.52,-0.15),
		vec2(-0.52,-0.27)
	];


	// 큰 나무의 잎
	var BigTree_leaf = [
		 // 첫번째 삼각형
		vec2(-0.8, 0.4), // 꼭대기
		vec2(-1.0,0.2), // 좌측
		vec2(-0.6,0.2), // 우측
		// 두번째 삼각형
		vec2(-0.8, 0.2), // 꼭대기
		vec2(-1.0,0.0), // 좌측
		vec2(-0.6,0.0), // 우측
		// 세번째 삼각형
		vec2(-0.8, 0.0), // 꼭대기
		vec2(-1.0,-0.2), // 좌측
		vec2(-0.6,-0.2) // 우측
	]; // 잎

	// 큰 나무의 밑둥
	var BigTree_wood = [
		vec2(-0.85, -0.2),
		vec2(-0.85,-0.4),
		vec2(-0.75,-0.2),
		vec2(-0.75,-0.4)
	]; // 나무 밑둥
 
	var house = [
		// 집 몸체
		vec2(-0.4,0.2), // 좌측 위
 		vec2(-0.4, -0.2), // 좌측 아래
		vec2(0.4,0.2), // 우측 위
		vec2(0.4, -0.2), // 우측 아래 

		// 집 지붕
		vec2(0.0, 0.45), // 꼭대기
 		vec2(-0.4, 0.2), // 좌측
		vec2(0.4, 0.2), // 우측

		// 집 문
		vec2(0.1, 0.1), // 좌측 위
		vec2(0.1, -0.2), // 좌측 아래
		vec2(0.3, 0.1), // 우측 위
		vec2(0.3, -0.2), // 우측 아래

		// 집 창문
		vec2(-0.3, 0.15), // 좌측 위
		vec2(-0.3, -0.05), // 좌측 아래
		vec2(-0.1, 0.15), // 우측 위
		vec2(-0.1, -0.05) //  우측 아래
	];


	// 땅
	var ground = [
		 // Vertex
		vec2(-1.0, 0.1), // 좌측 위
		vec2(-1.0, -0.4), // 좌측 아래
		vec2(1.0, 0.1), // 우측 위
		vec2(1.0, -0.4), // 우측 아래
	];

	// 땅 색
	var ground_color = [
		vec4(0.18,0.55,0.34,1.0), // v0
		vec4(0.56,0.9,0.56,1.0), // v1
		vec4(0.18,0.55,0.34,1.0), // v2
		vec4(0.56,0.9,0.56,1.0), // v3
	];

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
		vec2(-0.4, 0.7),
		vec2(-0.5, 0.9),
		vec2(-0.7, 0.9),
		vec2(-0.8, 0.7),
		vec2(-0.7, 0.5),
		vec2(-0.5, 0.5),
		vec2(-0.4, 0.7)
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
		vec2(0.0, 0.57),
		vec2(0.1, 0.47),
		vec2(0.1, 0.67),

		vec2(0.0, 0.57),
		vec2(-0.1, 0.47),
		vec2(-0.1, 0.67)
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
		vec2(-0.07, 0.7),
		vec2(-0.02, 0.67),
		vec2(0.0, 0.57),
		vec2(0.02, 0.67),
		vec2(0.07, 0.7),
		
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



	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vWater), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cWater), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintRectangle();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vStoneBridge1), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cStone), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintRectangle();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vStoneBridge1), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cStone), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintRectangle();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vStoneBridge2), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cStone), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintRectangle();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vStoneBridge3), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cStone), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintRectangle();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vStoneBridge4), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cStone), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintRectangle();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vPaperShipBody), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cPaper), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintRectangle();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vPaperShipHead), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cPaper), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintTriangle();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vFishTail), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cFishTail), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintTriangleFan();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vFishBody), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cFishBody), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintTriangleFan9();

	var vertexPositionBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vFishMouth), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	var vertexColorBufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cFishMouth), gl.STATIC_DRAW );
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	paintTriangle();


// Load shaders and initialize attribute buffers
var program_ground = initShaders( gl, "Lvertex_ground-shader", "Lfragment_ground-shader" );
gl.useProgram( program_ground );


// * Ground *

// Ground Vertex
// Load the data into the GPU
var vertexPositionBufferId = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
gl.bufferData( gl.ARRAY_BUFFER, flatten(ground), gl.STATIC_DRAW );

// Associate out shader variables with our data buffer
var vPosition_ground = gl.getAttribLocation( program_ground, "vPosition_ground" );
gl.vertexAttribPointer( vPosition_ground, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition_ground );

// Ground Color

var vGroundColorBufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vGroundColorBufferId);
gl.bufferData(gl.ARRAY_BUFFER, flatten(ground_color),gl.STATIC_DRAW);

var vColor_ground = gl.getAttribLocation(program_ground,"vColor_ground");
gl.vertexAttribPointer(vColor_ground,4,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(vColor_ground);


gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); // 0, 1, 2, 2, 1, 3
// * End Ground *


// Load shaders and initialize attribute buffers
var program = initShaders( gl, "Lvertex-shader", "Lfragment-shader" );
gl.useProgram( program );


// * Grass *
gl.bufferData( gl.ARRAY_BUFFER, flatten(grass), gl.STATIC_DRAW );
var vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );

var colorLoc = gl.getUniformLocation(program,"color");
var vOffset = gl.getUniformLocation(program,"vOffset");

gl.uniform4f(colorLoc,0.0,0.4,0.0,1.0); // 107 142 35
gl.drawArrays( gl.LINE_STRIP, 0, 3 ); 

gl.uniform4fv(vOffset,[0.4,0,0,0]);
gl.drawArrays( gl.LINE_STRIP, 0, 3 ); 

gl.uniform4fv(vOffset,[0.6,0.05,0,0]);
gl.drawArrays( gl.LINE_STRIP, 0, 3 ); 

gl.uniform4fv(vOffset,[0.8,0,0,0]);
gl.drawArrays( gl.LINE_STRIP, 0, 3 ); 

gl.uniform4fv(vOffset,[0.3,0.03,0,0]);
gl.drawArrays( gl.LINE_STRIP, 0, 3 ); 


gl.uniform4fv(vOffset,[0.0,0,0,0]);


// * End Grass * 


// * Small Tree *
// Small Tree Leaf
gl.bufferData( gl.ARRAY_BUFFER, flatten(SmallTree_leaf), gl.STATIC_DRAW );
gl.uniform4f(colorLoc,0.33,0.42,0.18,1.0); // 85 107 47
gl.drawArrays(gl.TRIANGLES, 0 ,9);

// * 우측 더 그리기
gl.uniform4fv(vOffset,[1.1,0,0,0]);
gl.drawArrays(gl.TRIANGLES, 0 ,9);
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로

gl.uniform4fv(vOffset,[1.5,0.1,0,0]);
gl.drawArrays(gl.TRIANGLES, 0 ,9);
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로

gl.uniform4fv(vOffset,[1.26,0.07,0,0]);
gl.drawArrays(gl.TRIANGLES, 0 ,9);
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로

// * 좌측 더 그리기
gl.uniform4fv(vOffset,[-0.4,0.1,0,0]);
gl.drawArrays(gl.TRIANGLES, 0 ,9);
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로

gl.uniform4fv(vOffset,[-0.16,0.07,0,0]);
gl.drawArrays(gl.TRIANGLES, 0 ,9);
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로


// Small Tree Wood
gl.bufferData( gl.ARRAY_BUFFER, flatten(SmallTree_wood), gl.STATIC_DRAW );
gl.uniform4f(colorLoc,0.60,0.45,0.12,1.0);
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); 

// * 우측 더 그리기
gl.uniform4fv(vOffset,[1.1,0,0,0]);
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); 
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로

gl.uniform4fv(vOffset,[1.5,0.1,0,0]);
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); 
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로

gl.uniform4fv(vOffset,[1.26,0.07,0,0]);
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); 
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로


// * 좌측 더 그리기
gl.uniform4fv(vOffset,[-0.4,0.1,0,0]);
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로
 
gl.uniform4fv(vOffset,[-0.16,0.07,0,0]);
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
gl.uniform4fv(vOffset,[0.0,0,0,0]); // 원래대로

// * End Small Tree *

// * Big Tree  *

// Load the data into the GPU

gl.bufferData( gl.ARRAY_BUFFER, flatten(BigTree_leaf), gl.STATIC_DRAW );


gl.uniform4f(colorLoc,0.0,1.0,0.0,1.0);
gl.drawArrays(gl.TRIANGLES, 0 ,9);


// 잎들 하나 더 그리기 
// 왜 좌표계가 반대로 갈까
gl.uniform4fv(vOffset,[1.6,0,0,0]);
gl.drawArrays(gl.TRIANGLES, 0 ,9);



// 밑둥 좌표
gl.bufferData( gl.ARRAY_BUFFER, flatten(BigTree_wood), gl.STATIC_DRAW );


// 밑둥 색 변경
gl.uniform4f(colorLoc,0.60,0.45,0.12,1.0);
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); // 0, 1, 2, 2, 1, 3


// 밑둥 하나 더 그리기 
var vOffset = gl.getUniformLocation(program,"vOffset");
gl.uniform4fv(vOffset,[0,0,0,0]);
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); // 0, 1, 2, 2, 1, 3

// * End Tree *

// * House *

// * House Body
gl.bufferData( gl.ARRAY_BUFFER, flatten(house), gl.STATIC_DRAW );
gl.uniform4f(colorLoc,0.7,0.13,0.13,1.0);
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); // 0, 1, 2, 2, 1, 3


// * House Roof
gl.uniform4f(colorLoc,1.0,0.27,0.0,1.0);
gl.drawArrays( gl.TRIANGLES, 4, 3 ); // 0, 1, 2, 2, 1, 3

// * House Door
gl.uniform4f(colorLoc,1.0,0.64,0.0,1.0);
gl.drawArrays( gl.TRIANGLE_STRIP, 7, 4 ); // 0, 1, 2, 2, 1, 3

// * House Window
gl.uniform4f(colorLoc,0.68,0.85,0.9,1.0);
gl.drawArrays( gl.TRIANGLE_STRIP, 11, 4 ); // 0, 1, 2, 2, 1, 3
// * End House *




}

function paintRectangle(){
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}

function paintTriangle(){
	gl.drawArrays(gl.TRIANGLES,0,3);
}

function paintTriangleFan(){
	gl.drawArrays(gl.TRIANGLE_FAN,0,4);
}

function paintTriangleFan9(){
	gl.drawArrays(gl.TRIANGLE_FAN,0,9);
}
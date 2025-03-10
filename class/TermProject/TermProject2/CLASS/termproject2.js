"use strict";

var canvas;
var gl;

// * °ü¶÷Â÷ ¼±¾ð * //
// °ü¶÷Â÷ point, color array ¼±¾ð
var points = []; // °ü¶÷Â÷ ºÎºÐ
var colors = []; 
var points2 = []; // °ü¶÷Â÷ ±âµÕ ºÎºÐ
var colors2 = []; 

var thetaLoc; // location of theta in program
var theta = [ 0, 0, 0 ]; // initial theta
var xAxis = 0; // index for xAxis
var yAxis = 1; // index for yAxis
var zAxis = 2; // index for zAxis

var program2,program;
var cBuffer, vBuffer, cBuffer2, vBuffer2;
var vColor, vPosition, vColor2, vPosition2;
var rotation = 1.0;

// °ü¶÷Â÷ & °ü¶÷Â÷ ±âµÕ »ö ¼³Á¤
var sideColor = [0.0, 0.0, 0.0, 1.0]; 
var topColor = [0.0, 0.0, 0.0, 1.0]; 
var bottomColor = [0.4, 0.0, 0.6, 1.0];
var sideColor2 = [0.59, 0.3, 0.0, 1.0];
var sideColor3 = [0.16, 0.0, 0.4, 1.0];
// * End °ü¶÷Â÷ ¼±¾ð * //


//가로등(Power off)
var y_street_lamp_power=false;
var y_street_lamp_top;
var y_street_lamp_mid;
var y_street_lamp_bottom;

//가로등(Power On)
var y_street_lamp_powerOn1;
var y_street_lamp_powerOn2;
var y_street_lamp_light1;
var y_street_lamp_light2;

//벤치
var y_bench_back;
var y_bench_seat;
var y_bench_leg1;
var y_bench_leg2;

var y_street_lamp_powerOff_pointLength;
var y_street_lamp_powerOn_pointLength;

var y_render_startPoint=0;
var y_render_endPoint;


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor = vec4(0.0, 0.0, 0.0, 1.0);

	gl.enable(gl.DEPTH_TEST);

	
	
	// * °ü¶÷Â÷ * //
	ferrisWheel_button(); // °ü¶÷Â÷ - Á¶ÀÛ ¹öÆ°
	ferrisWheel_pillar(); // °ü¶÷Â÷ - ±âµÕ
	ferrisWheel_load(); // °ü¶÷Â÷ - ¸·´ë
	ferrisWheel_body(); // °ü¶÷Â÷ - ¸öÅë
	ferrisWheel_center(); // °ü¶÷Â÷ - Áß°£ ÁöÁö´ë
	Y_bench();
	Y_street_lamp();
	Y_street_lamp_powerOn();

	ferrisWheel_shader(); // °ü¶÷Â÷¸¦ À§ÇÑ shader ¼±¾ð
	ferrisWheel_shader2(); // °ü¶÷Â÷ ±âµÕÀ» À§ÇÑ shader ¼±¾ð

    
	// * End °ü¶÷Â÷ * //


    render();
}

function render()
{
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// * °ü¶÷Â÷ Rendering * //
	ferrisWheel_useShader1(); // °ü¶÷Â÷ ºÎºÐ
	ferrisWheel_useShader2(); // °ü¶÷Â÷ ±âµÕ ºÎºÐ 
	// * End °ü¶÷Â÷ Rendering * //

	requestAnimFrame( render ); // render repeatly
}

function ferrisWheel_button(){ // °ü¶÷Â÷¸¦ À§ÇÑ Á¶ÀÛ ¹öÆ°

	document.getElementById( "faster" ).onclick = function () { // set axis to x-axis
        rotation = 10.0;
    };
    document.getElementById( "original" ).onclick = function () { // set axis to y-axis
        rotation = 1.0;
    };
    document.getElementById( "slower" ).onclick = function () { // set axis to z-axis
        rotation = 0.1;
    };
	document.getElementById( "back" ).onclick = function () {
        rotation = -1.0;
    };
    document.getElementById( "power" ).onclick = function () {
        y_street_lamp_power = !y_street_lamp_power;
    };
}

function ferrisWheel_pillar(){ // °ü¶÷Â÷ - ±âµÕ

	var pillar = cylinder(72,3,true,sideColor,topColor,bottomColor);
	pillar.scale(0.1,0.8,0.0); // scale for defined cylinder
	pillar.translate(0,-0.5,0.5);
	points2 = points2.concat(pillar.TriangleVertices); // use different shader
	colors2 = colors2.concat(pillar.TriangleVertexColors);

}

function ferrisWheel_load() { // °ü¶÷Â÷ - ¸·´ë

	// ÁÂÃø»ó´Ü ¸·´ë
	var load1 = cylinder(72,3,true,sideColor3,topColor,bottomColor);
	load1.scale(0.1,0.4,0.3); // scale for defined cylinder
	load1.translate(0.1,0.3,0.2); // translate for defined cylinder
	load1.rotate(45.0,[0,0,1]);
	load1.rotate(10.0,[1,0,0]);
	load1.rotate(20.0,[0,0,1]);
	points = points.concat(load1.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(load1.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// ÁÂÃøÇÏ´Ü ¸·´ë
	var load2 = cylinder(72,3,true,sideColor3,topColor,bottomColor);
	load2.scale(0.1,0.4,0.3); // scale for defined cylinder
	load2.translate(0.0,0.2,0.2); // translate for defined cylinder
	load2.rotate(45.0,[0,0,1]);
	load2.rotate(10.0,[1,0,0]);
	load2.rotate(60.0,[0,0,1]);
	points = points.concat(load2.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(load2.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// ¿ìÃø»ó´Ü ¸·´ë
	var load3 = cylinder(72,3,true,sideColor3,topColor,bottomColor);
	load3.scale(0.1,0.4,0.3); // scale for defined cylinder
	load3.translate(-0.05,0.25,0.2); // translate for defined cylinder
	load3.rotate(45.0,[0,0,1]);
	//load3.rotate(10.0,[1,0,0]);
	load3.rotate(-110.0,[0,0,1]);
	points = points.concat(load3.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(load3.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// ¿ìÃøÇÏ´Ü ¸·´ë
	var load4 = cylinder(72,3,true,sideColor3,topColor,bottomColor);
	load4.scale(0.1,0.4,0.3); // scale for defined cylinder
	load4.translate(0.0,0.2,0.2); // translate for defined cylinder
	load4.rotate(45.0,[0,0,1]);
	load4.rotate(10.0,[1,0,0]);
	load4.rotate(-160.0,[0,0,1]);
	points = points.concat(load4.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(load4.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// Áß°£ ÇÏ´Ü ¸·´ë
	var load5 = cylinder(72,3,true,sideColor3,topColor,bottomColor);
	load5.scale(0.1,0.4,0.3); // scale for defined cylinder
	load5.translate(0.0,-0.2,0.2); // translate for defined cylinder
	load5.rotate(45.0,[0,0,1]);
	load5.rotate(10.0,[1,0,0]);
	load5.rotate(-40.0,[0,0,1]);
	points = points.concat(load5.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(load5.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// Áß°£ »ó´Ü ¸·´ë
	var load5 = cylinder(72,3,true,sideColor3,topColor,bottomColor);
	load5.scale(0.1,0.4,0.3); // scale for defined cylinder
	load5.translate(0.0,0.3,0.2); // translate for defined cylinder
	load5.rotate(45.0,[0,0,1]);
	load5.rotate(10.0,[1,0,0]);
	load5.rotate(-50.0,[0,0,1]);
	points = points.concat(load5.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(load5.TriangleVertexColors); // initialize colors by using defined cyliner's vertices
}

function ferrisWheel_body() { // °ü¶÷Â÷ - ¸öÅë
	
	// ÁÂÃø »ó´Ü Å¸¿ø
	var ellipse1 = cylinder(72,3,true,sideColor,topColor,bottomColor); // Å¸¿ø
	ellipse1.rotate(90.0,[1,0,0]); // bottom-ÆÄ¶ûÀÌ Á¤¸éÀ¸·Î µü º¸ÀÓ
	ellipse1.rotate(5.0,[0,1,0]);
	ellipse1.scale(0.4, 0.3, 0.3);
	ellipse1.translate(-0.5,0.3,-0.7); // translate for defined cylinder
	points = points.concat(ellipse1.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(ellipse1.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// ¿ìÃø »ó´Ü Å¸¿ø
	var ellipse2 = cylinder(72,3,true,sideColor,topColor,bottomColor); // Å¸¿ø
	ellipse2.rotate(90.0,[1,0,0]); // bottom-ÆÄ¶ûÀÌ Á¤¸éÀ¸·Î µü º¸ÀÓ
	ellipse2.rotate(5.0,[0,1,0]);
	ellipse2.scale(0.4, 0.3, 0.3);
	ellipse2.translate(0.5,0.3,-0.7); // translate for defined cylinder
	points = points.concat(ellipse2.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(ellipse2.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// ÁÂÃø ÇÏ´Ü Å¸¿ø
	var ellipse3 = cylinder(72,3,true,sideColor,topColor,bottomColor); // Å¸¿ø
	ellipse3.rotate(90.0,[1,0,0]); // bottom-ÆÄ¶ûÀÌ Á¤¸éÀ¸·Î µü º¸ÀÓ
	ellipse3.rotate(5.0,[0,1,0]);
	ellipse3.scale(0.4, 0.3, 0.3);
	ellipse3.translate(-0.5,-0.2,-0.7); // translate for defined cylinder
	points = points.concat(ellipse3.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(ellipse3.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// ¿ìÃø ÇÏ´Ü Å¸¿ø
	var ellipse4 = cylinder(72,3,true,sideColor,topColor,bottomColor); // Å¸¿ø
	ellipse4.rotate(90.0,[1,0,0]); // bottom-ÆÄ¶ûÀÌ Á¤¸éÀ¸·Î µü º¸ÀÓ
	ellipse4.rotate(5.0,[0,1,0]);
	ellipse4.scale(0.4, 0.3, 0.3);
	ellipse4.translate(0.5,-0.2,-0.7); // translate for defined cylinder
	points = points.concat(ellipse4.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(ellipse4.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// Áß°£ »ó´Ü Å¸¿ø
	var ellipse5 = cylinder(72,3,true,sideColor,topColor,bottomColor); // Å¸¿ø
	ellipse5.rotate(90.0,[1,0,0]); // bottom-ÆÄ¶ûÀÌ Á¤¸éÀ¸·Î µü º¸ÀÓ
	ellipse5.rotate(5.0,[0,1,0]);
	ellipse5.scale(0.4, 0.3, 0.3);
	ellipse5.translate(0.0,0.45,-0.7); // translate for defined cylinder
	points = points.concat(ellipse5.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(ellipse5.TriangleVertexColors); // initialize colors by using defined cyliner's vertices

	// Áß°£ ÇÏ´Ü Å¸¿ø
	var ellipse6 = cylinder(72,3,true,sideColor,topColor,bottomColor); // Å¸¿ø
	ellipse6.rotate(90.0,[1,0,0]); // bottom-ÆÄ¶ûÀÌ Á¤¸éÀ¸·Î µü º¸ÀÓ
	ellipse6.rotate(5.0,[0,1,0]);
	ellipse6.scale(0.4, 0.3, 0.3);
	ellipse6.translate(0.0,-0.4,-0.7); // translate for defined cylinder
	points = points.concat(ellipse6.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(ellipse6.TriangleVertexColors); // initialize colors by using defined cyliner's vertices
}

function ferrisWheel_center(){ // °ü¶÷Â÷ - Áß°£ ÁöÁö´ë
	
	var center = cylinder(72,3,true,sideColor,topColor,bottomColor); // Å¸¿ø
	center.rotate(90.0,[1,0,0]); 
	center.rotate(5.0,[0,1,0]);
	center.scale(0.3, 0.3, 0.3);
	center.translate(0,0.0,0);
	points = points.concat(center.TriangleVertices); // initialize points by using defined cyliner's vertices
	colors = colors.concat(center.TriangleVertexColors); // initialize colors by using defined cyliner's vertices
}

function ferrisWheel_shader() { // °ü¶÷Â÷¸¦ À§ÇÑ program
		
    program = initShaders( gl, "vertex-shader", "fragment-shader" );


    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    vColor = gl.getAttribLocation( program, "vColor" );
    gl.enableVertexAttribArray( vColor );

    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation(program, "theta");
}

function ferrisWheel_shader2() { // °ü¶÷Â÷ ±âµÕÀ» À§ÇÑ program 
		
	program2 = initShaders( gl, "vertex-shader2", "fragment-shader2" );

	cBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors2), gl.STATIC_DRAW );

    vColor2 = gl.getAttribLocation( program2, "vColor" );
    gl.enableVertexAttribArray( vColor2 );
	
    vBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points2), gl.STATIC_DRAW );

    vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.enableVertexAttribArray( vPosition2 );
}

function ferrisWheel_useShader1(){ // °ü¶÷Â÷ ºÎºÐ Rendering

    gl.useProgram( program );
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	

    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    theta[zAxis] += rotation; // rotation by 2
    gl.uniform3fv(thetaLoc, theta); // send theta to vertex shader
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
}

function ferrisWheel_useShader2(){ // °ü¶÷Â÷ ±âµÕ ºÎºÐ Rendering
	gl.useProgram(program2);
 
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer2 );
    gl.vertexAttribPointer( vColor2, 4, gl.FLOAT, false, 0, 0 );
	
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer2 );
    gl.vertexAttribPointer( vPosition2, 4, gl.FLOAT, false, 0, 0 );
	gl.drawArrays( gl.TRIANGLES, 0, y_street_lamp_powerOff_pointLength);
	if(y_street_lamp_power==true){
        gl.drawArrays( gl.TRIANGLES, 0, y_street_lamp_powerOn_pointLength);
    }
}

function Y_bench(){
    y_bench_back = cube(42);
    y_bench_back.scale(0.6,0.3,0.1);
    y_bench_back.translate(0.5,-0.3,0.4);
    points2 = points2.concat(y_bench_back.TriangleVertices);
    colors2 = colors2.concat(y_bench_back.TriangleFaceColors);

    y_bench_seat = cube(42);
    y_bench_seat.scale(0.6,0.3,0.1);
    y_bench_seat.translate(0.5,-0.5,0.5);
    points2 = points2.concat(y_bench_seat.TriangleVertices);
    colors2 = colors2.concat(y_bench_seat.TriangleFaceColors);

    y_bench_leg1 = cylinder(41);
    y_bench_leg1.scale(0.1,0.25,0.1);
    y_bench_leg1.translate(0.6,-0.6,0.5);
    points2 = points2.concat(y_bench_leg1.TriangleVertices);
    colors2 = colors2.concat(y_bench_leg1.TriangleVertexColors);

    y_bench_leg2 = cylinder(41);
    y_bench_leg2.scale(0.1,0.25,0.1);
    y_bench_leg2.translate(0.4,-0.6,0.5);
    points2 = points2.concat(y_bench_leg2.TriangleVertices);
    colors2 = colors2.concat(y_bench_leg2.TriangleVertexColors);
}

function Y_street_lamp(){
    //파라미터가 40~49면 customYoon을 따름.
    y_street_lamp_top = cube(40);
    y_street_lamp_top.scale(0.5,0.06,0.11);
    y_street_lamp_top.translate(0.6,0.75,1.0);
    
    y_street_lamp_mid = cylinder(40);//40 - Geometry.js의 function(customYoon참조)
    y_street_lamp_mid.scale(0.08,1,0.08);
    y_street_lamp_mid.translate(0.6,0.2,1.0);
    
    points2 = points2.concat(y_street_lamp_top.TriangleVertices);
    colors2 = colors2.concat(y_street_lamp_top.TriangleFaceColors);
    points2 = points2.concat(y_street_lamp_mid.TriangleVertices);
    colors2 = colors2.concat(y_street_lamp_mid.TriangleVertexColors);
    y_street_lamp_powerOff_pointLength = points2.length;
}

function Y_street_lamp_powerOn(){
    y_street_lamp_powerOn1 = cube(41);
    y_street_lamp_powerOn1.scale(0.1,0.1,0.3);
    y_street_lamp_powerOn1.translate(0.75,0.67,0.0);
    points2 = points2.concat(y_street_lamp_powerOn1.TriangleVertices);
    colors2 = colors2.concat(y_street_lamp_powerOn1.TriangleFaceColors);
    
    y_street_lamp_powerOn2 = cube(41);
    y_street_lamp_powerOn2.scale(0.1,0.1,0.3);
    y_street_lamp_powerOn2.translate(0.45,0.67,0.0);
    points2 = points2.concat(y_street_lamp_powerOn2.TriangleVertices);
    colors2 = colors2.concat(y_street_lamp_powerOn2.TriangleFaceColors);
    
    y_street_lamp_light1 = cylinder(42);
    y_street_lamp_light1.scale(0.075,1.0,0.3);
    y_street_lamp_light1.translate(0.45,0.2,0.0);
    points2 = points2.concat(y_street_lamp_light1.TriangleVertices);
    colors2 = colors2.concat(y_street_lamp_light1.TriangleVertexColors);
    
    y_street_lamp_light2 = cylinder(42);
    y_street_lamp_light2.scale(0.075,1.0,0.3);
    y_street_lamp_light2.translate(0.75,0.2,0.0);
    points2 = points2.concat(y_street_lamp_light2.TriangleVertices);
    colors2 = colors2.concat(y_street_lamp_light2.TriangleVertexColors);
    
    y_street_lamp_powerOn_pointLength = points2.length;
}

// 그라데이션을 사용하여 태양 rendering
function initRainbow() {
    rainbow = getRandomArbitrary(0.355, 0.005);
    drawRainbow();
};

// 원을 이용하여 햇빛 rendering
function drawRainbow() {
    drawCircle_GR(gl, rainbow, vec2(-0.7, 0.7), vec4(0, 0, 0, 0), vec4(1, 0, 0, 0.07), 1, 0, dots, renderNumber, colors);
    drawCircle_GR(gl, rainbow + 0.09, vec2(-0.7, 0.7), vec4(0, 0, 0, 0), vec4(1, 50 / 255, 0, 0.07), 1, 0, dots, renderNumber, colors);
    drawCircle_GR(gl, rainbow + 0.18, vec2(-0.7, 0.7), vec4(0, 0, 0, 0), vec4(1, 1, 0, 0.07), 1, 0, dots, renderNumber, colors);
    drawCircle_GR(gl, rainbow + 0.27, vec2(-0.7, 0.7), vec4(0, 0, 0, 0), vec4(0, 1, 0, 0.07), 1, 0, dots, renderNumber, colors);
    drawCircle_GR(gl, rainbow + 0.36, vec2(-0.7, 0.7), vec4(0, 0, 0, 0), vec4(0, 0, 1, 0.07), 1, 0, dots, renderNumber, colors);
    drawCircle_GR(gl, rainbow + 0.45, vec2(-0.7, 0.7), vec4(0, 0, 0, 0), vec4(0, 5 / 255, 1, 0.07), 1, 0, dots, renderNumber, colors);
    drawCircle_GR(gl, rainbow + 0.54, vec2(-0.7, 0.7), vec4(0, 0, 0, 0), vec4(100 / 255, 0, 1, 0.1), 1, 0, dots, renderNumber, colors);
};

// 구름 기본값 설정
function initCloud() {
    cloudValue.forEach(function (value, index, _) {
        if (value[0] + cloud[index] > 1.3) {
            cloudValue[index][0] = -1 * (value[0] + cloud[index]);
            cloudValue[index][1] = getRandomArbitrary(0.1, 0.9);
        }
        else {
            cloudValue[index][0] = value[0] + cloud[index];
        }
        drawCloud(value[0], value[1], value[2]);
    });
};

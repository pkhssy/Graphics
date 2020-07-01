
"use strict";

var canvas;
var gl;

var NumVertices;

var pointsArray = [];
var colorsArray = [];

var points = [];
var colors = [];

var vertices = [
    vec4(-0.5, -0.5,  1.5, 1.0),
    vec4(-0.5,  0.5,  1.5, 1.0),
    vec4(0.5,  0.5,  1.5, 1.0),
    vec4(0.5, -0.5,  1.5, 1.0),
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5,  0.5, 0.5, 1.0),
    vec4(0.5,  0.5, 0.5, 1.0),
    vec4( 0.5, -0.5, 0.5, 1.0)
];

var vertexColors = [
    vec4( 63 / 255, 22 / 255, 0.0, 1.0 ),  // deep brown
    vec4( 63 / 255, 22 / 255, 0.0, 1.0  ),  // deep brown
    vec4( 63 / 255, 22 / 255, 0.0, 1.0  ),  // deep brown
    vec4( 63 / 255, 22 / 255, 0.0, 1.0 ),  // deep brown
    vec4( 63 / 255, 22 / 255, 0.0, 1.0 ),  // deep brown
    vec4( 63 / 255, 22 / 255, 0.0, 1.0 ),  // deep brown
    vec4( 99 / 255, 58 / 255, 0, 1.0 ),  // brown
    vec4( 63 / 255, 22 / 255, 0.0, 1.0 ),  // deep brown
];

var near = 0.001;
var far = 30.0;
var radius = 6.65;
var theta  = 0.174;
var phi    = 0.523;
var dr = 5.0 * Math.PI/180.0;

var fovy = 30.0;  // Field-of-view in Y direction angle (in degrees)
var aspect = 1.0;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);


function quad(a, b, c, d) {
     pointsArray.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[b]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[d]);
     colorsArray.push(vertexColors[a]);
}

/*function quad(a, b, c, d) {
     pointsArray.concat(vertices[a]);
     colorsArray.concat(vertexColors[a]);
     pointsArray.concat(vertices[b]);
     colorsArray.concat(vertexColors[a]);
     pointsArray.concat(vertices[c]);
     colorsArray.concat(vertexColors[a]);
     pointsArray.concat(vertices[a]);
     colorsArray.concat(vertexColors[a]);
     pointsArray.concat(vertices[c]);
     colorsArray.concat(vertexColors[a]);
     pointsArray.concat(vertices[d]);
     colorsArray.concat(vertexColors[a]);
}*/


function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    aspect =  canvas.width/canvas.height;

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	NumVertices = 36;

    colorCube();

	// ground
	var ground = cube();
	ground.scale(0.2, 0.2, 0.2);
	ground.rotate(45.0, [1,1,1]);
	ground.translate(-0.1, 1, 2.0);

	pointsArray = points.concat(ground.TriangleVertices);
	colorsArray = colors.concat(ground.TriangleVertexColors);

	NumVertices = pointsArray.length;

	// Sun
	var Sun = sphere();
	Sun.scale(0.2, 0.2, 0.2);
	Sun.rotate(45.0, [1,1,1]);
	Sun.translate(-0.1, 1, 2.0);

	pointsArray = points.concat(Sun.TriangleVertices);
	colorsArray = colors.concat(Sun.TriangleVertexColors);

	NumVertices = pointsArray.length;

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

// sliders for viewing parameters

    document.getElementById("radiusSlider").onchange = function(event) {
       radius = event.target.value;
    };
    document.getElementById("thetaSlider").onchange = function(event) {
        theta = event.target.value* Math.PI/180.0;
    };
    document.getElementById("phiSlider").onchange = function(event) {
        phi = event.target.value* Math.PI/180.0;
    };
    render();
}


var render = function(){

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
        radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    requestAnimFrame(render);

	 gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    requestAnimFrame(render);
}
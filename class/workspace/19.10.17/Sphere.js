"use strict";

var canvas;
var gl;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;

var flag = false;

var points = [];
var colors = [];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	var mySphere = sphere();
	mySphere.scale(0.6, 0.6, 0.6);
	mySphere.rotate(45.0, [1,1,1]);
	mySphere.translate(-0.1, -0.1, 0.0);

	points = points.concat(mySphere.TriangleVertices);
	colors = colors.concat(mySphere.TriangleVertexColors);

}

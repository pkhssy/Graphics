var gl;
var points;
window.onload = function init(){
var canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" );
}

/*
// Four Vertices
 var vertices1 = [
    vec2(0,0.5),
    vec2(-0.5,0.25),
    vec2(0.5,0.25),
    vec2(0,0.25),
    vec2(-0.5,0),
    vec2(0.5,0),
    vec2(0,0),
    vec2(-0.5,-0.25),
    vec2(0.5,-0.25)
 ];*/

 var vertices = [
    vec2(0, 0.5),
    vec2(-0.5, -0.5),
    vec2(0.5,-0.5)
 ];

 var colors = [
    vec4(1.0,0.0,0.0,1.0),    
    vec4(0.0,1.0,0.0,1.0),   
    vec4(0.0,0.0,1.0,1.0)
 ];


/*
 var vertices2 = [
    vec2(-0.15, -0.25),
    vec2(-0.15,-0.5),
    vec2(0.15,-0.25),
    vec2(0.15,-0.5)
    ]; // 唱公 关嫡

  var vertices3 = [
    vec2(0.25, 0.15),
    vec2(0.25,0.05),
    vec2(0.15,0.15),
    ]; // 唱公 关嫡
*/


// Configure WebGL
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );

// Load the data into the GPU
var vertexPositionBufferId = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, vertexPositionBufferId );
gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

// Associate out shader variables with our data buffer
var vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );

// Vertex Color

var vertexColorBufferId = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );
gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

var vColor = gl.getAttribLocation( program, "vColor" );
gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vColor );

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0 ,3)


//render(); // 唱公 蕾



/*
// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader2" );
gl.useProgram( program );

// Load the data into the GPU
var bufferId = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW );

// Associate out shader variables with our data buffer
var vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );

render2(); // 唱公 关嫡

// Load the data into the GPU
var bufferId = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices3), gl.STATIC_DRAW );

// Associate out shader variables with our data buffer
var vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );

render3(); // 唱公 凯概
*/

};

function render() {
gl.clear( gl.COLOR_BUFFER_BIT );
gl.drawArrays( gl.TRIANGLES, 0, 3 ); // 0, 1, 2, 2, 1, 3
}

/*
function render2() {
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 ); // 0, 1, 2, 2, 1, 3
}

function render3() {

gl.drawArrays( gl.TRIANGLES, 0, 3); // 0, 1, 2, 2, 1, 3
}
*/
var data=new Array();
var angle=0;
/* Every data point should have a color */
var colors = [
	"#F79F81",
	"#F5FBEF",
	"#F79F81",
	"#F5FBEF",
	"#F79F81",
	"#F5FBEF",
	"#F79F81",
	"#F5FBEF",
	"#F79F81",
	"#F5FBEF"
];
/* Include global variables file */
function initCircle() {
	//data.push([45, "Pizza", 316]);
	//data.push([45, "S2", 271]);
	//data.push([45, "S3", 226]);
	//data.push([45, "S4", 181]);
	//data.push([45, "S5", 136]);
	//data.push([45, "S6", 90]);
	//data.push([45, "S7", 46]);
	//data.push([45, "S8", 0]);

	/* Array Structure
	 *
	 * Note: All members first element must = 360.
	 *       Generally the first argument = 360/number of arguments
	 * Element 1 : Degrees
	 * Element 2 : Segement Text to display on the ring
	 * Element 3 : Start of segment arc + 1
	 *
	 * The last segment arch must start at 0
	 *
	 */

	data.push([36, "Pizza", 325]);
	data.push([36, "Burger", 289]);
	data.push([36, "Chinese", 253]);
	data.push([36, "Thai", 217]);
	data.push([36, "Spin Again", 181]);
	data.push([36, "Caribbean", 145]);
	data.push([36, "Indian", 109]);
	data.push([36, "Skip Lunch", 73]); // ...
	data.push([36, "Salad", 37]); // this arc is from 37 to 72 degrees
	data.push([36, "Spin Again", 0]); // This arc is from 0 to 36 degrees

	angle=360/data.length;

	canvas = document.getElementById("piechart");
	var context = canvas.getContext("2d");
	for (var i = 0; i < data.length; i++) {
		drawSegment(canvas, context, i);
	}
}

/* Draw the circle segment by segment because we need to label it */
function drawSegment(canvas, context, i) {
	/* Save the Context */
    context.save();

	/* Find the center (x,y) coordinates of the canvas */
	var centerX = Math.floor(canvas.width / 2);
	var centerY = Math.floor(canvas.height / 2);

	/* Set the radius to 1/2 the length of the canvas width */
	radius = Math.floor(canvas.width / 2);

	/* The arc() function uses Radians to calculate the arc.  For each segment, calculate the Radian value as the starting angle.*/
	var startingAngle = degreesToRadians(sumTo(data, i));

	/* Set how big the arc should be */
	var arcSize = degreesToRadians(data[i][0]);

	/* The ending angle is the starting angle in radians plus the arcSize in radians */
	var endingAngle = startingAngle + arcSize;

	/* Start a path where we start drawing on the canvas */
	context.beginPath();

	/* Move the path to the starting point */
	context.moveTo(centerX, centerY);

	/* draw and arc */
	context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);

	/* Close the path */
	context.closePath();

	/* and fill it with a color from the colors array */
	context.fillStyle = colors[i];
	context.fill();

	/* Restore the context to it's prior state */
	context.restore();

	drawSegmentLabel(canvas, context, i);
}

/* Standard equation to convert degrees to radians */
function degreesToRadians(degrees) {
	return (degrees * Math.PI)/180;
}

/* Sums up the degree angle up to a given data point in the data array */
function sumTo(a, i) {
	var sum = 0;
	for (var j = 0; j < i; j++) {
		sum += a[j][0];
	}
	return sum;
}

function drawSegmentLabel(canvas, context, i) {
	context.save();

	var x = Math.floor(canvas.width / 2);
	var y = Math.floor(canvas.height / 2);
	var angle = degreesToRadians(sumTo(data, i));

	context.translate(x, y);
	context.rotate(angle);

	var dx = Math.floor(canvas.width * 0.5) - 10;
	var dy = Math.floor(canvas.height * 0.05);

	context.textAlign = "right";
	var fontSize = Math.floor(canvas.height / 25);
	context.font = fontSize + "pt Helvetica";

	context.fillText(data[i][1], dx, dy);

	context.restore();
}


/* Spin the circle */
function bgTurn(element) {
	MAX=780	// Maximum number of turns
	MIN=0;	// Minimum number of turns
	TIMEOUT=10;	// Time out in milliseconds

		var audio = document.getElementById("audio");
       audio.play()
	/* Keep Track of Spins */
	start=0;

	/* Increase Degrees of turn */
	turn=10;

	// Randomize how many turns
	var i=Math.floor(Math.random()*(MAX-MIN));
	var j=0;
	var k=0;
	var l=0;
	// Set interval at TIMEOUT milliseconds
	var id = setInterval(frame, TIMEOUT);

	// Function to do the spinning
	function frame() {


	// The turns are between i and MAX
		if((j++)==i){
			clearInterval(id);
			audio.pause()
			audio.currentTime =0;
		} else {
		// This sets the rotation degrees
		var func="rotate("+(start)+"deg)";

			// Code for Safari
			document.getElementById(element).style.WebkitTransform = func;

			// Code for IE9
			document.getElementById(element).style.msTransform = func;

			// Standard syntax
			document.getElementById(element).style.transform = func;

			// Increment the number of degrees and the number of turns made so far
			start = ((start+turn) > 360) ? 0 : (start+turn) ;
			k=j/37;
			l=Math.floor((k-Math.floor(k))*360);
		}
		// Display the segment chosen
		for(z=0;z<data.length;z++) {
			if (l>data[z][2]) {
				document.getElementById("choice").innerHTML=data[z][1];
				break;
			}

		}

		//if (z == (data.length -1)){
		//		audio.pause()
		//		audio.currentTime =0;
		//	}
		//
	}
}





// Get details based on latitude (decimal), longitude (decimal)
$(document).ready(function(){
    $(".fetch-by-current-location").click(function(){

     var term = "pizza";

    // CA Lat/Long
    var latitude =  '37.786882';
  	var longitude =  '-122.399972';

    // Detect User's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }


 var _flag = 0;

   // Show Position and make AJAX request to API Proxy
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    var api_url = 'https://surabhi.0x10.info/yelp.php?url=' + encodeURIComponent("https://api.yelp.com/v3/businesses/search?term=" + term + "&latitude=" + latitude + "&longitude=" + longitude);

    if(_flag == 1)
    	return;
    else
    	_flag = 1;

         $.ajax({
                  beforeSend: function(request) {
                      request.setRequestHeader("Authorization", "Bearer dummy");
                  },
                  dataType: "json",
                  url: api_url,
                  success: function(data) {
                      //Your code
                      // alert(JSON.stringify(data));
                      // console.log(JSON.stringify(data));
                      // alert(data.total);
                      var p = data.businesses;
											for (var key in p) {
												if (p.hasOwnProperty(key)) {
													console.log(key + " -> " + p[key].name);
													if(key<10)
														$("#tb" + key).val(p[key].name);

												}
											}
											// AutoLoad Wheel
											Load2();
                  }
              });
						}
    });
});




// Fetch details based on term (str), location (str), radius (int)
$(document).ready(function(){
    $(".fetch-by-address").click(function(){


		var location = $("#address").val();
		var term 		= $("#term").val();
		var radius	= $("#radius").val();
		var _flag = 0;

		if(radius == "") radius = 5;
		if(term == "") term = "restaurant";
		if(location == "") location = "Columbus, Indianapolis";

    var api_url = 'https://surabhi.0x10.info/yelp.php?url=' + encodeURIComponent("https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + location + "&radius=" + radius);

    if(_flag == 1)
    	return;
    else
    	_flag = 1;

         $.ajax({
                  beforeSend: function(request) {
                      request.setRequestHeader("Authorization", "Bearer dummy");
                  },
                  dataType: "json",
                  url: api_url,
                  success: function(data) {
                      //Your code
                      // alert(JSON.stringify(data));
                      // console.log(JSON.stringify(data));
                      // alert(data.total);
                      var p = data.businesses;
											for (var key in p) {
												if (p.hasOwnProperty(key)) {
													console.log(key + " -> " + p[key].name);
													if(key<10)
														$("#tb" + key).val(p[key].name);
												}
											}
											// AutoLoad Wheel
											Load2();
                  }
        });
    });
});

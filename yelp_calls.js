// yelp calls

// Get details based on latitude (decimal), longitude (decimal)
$(document).ready(function(){
  // Hide ajax loading GIF animation by default once the entire page loads.
  $(".loading").hide();

    // Execute AJAX call when there's a click action on "Location" button.
    $(".fetch-by-current-location").unbind("click").click(function(){

    // Show loader GIF
    $(".loading").show();


    var term 		= $("#term").val();
		var radius	= $("#radius").val();

    // CA Lat/Long
    var latitude =  '37.786882';
  	var longitude =  '-122.399972';
		if(radius == "") radius = 7;
		if(term == "") term = "restaurant";


    // Detect User's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }


   // Show Position and make AJAX request to API Proxy
function showPosition(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    var api_url = 'https://surabhi.0x10.info/yelp.php?url=' + encodeURIComponent("https://api.yelp.com/v3/businesses/search?term=" + term + "&latitude=" + latitude + "&longitude=" + longitude);

         $.ajax({
                  beforeSend: function(request) {
                      request.setRequestHeader("Authorization", "Bearer dummy");
                  },
                  dataType: "json",
                  url: api_url,
                  success: function(data) {
                      // Test Code
                      // alert(JSON.stringify(data));
                      // console.log(JSON.stringify(data));
                      // alert(data.total);
                      var p = data.businesses;
                      // Process each of the fetched entries in object
											for (var key in p) {
												if (p.hasOwnProperty(key)) {
													console.log(key + " -> " + p[key].name);
													if(key<10)
														$("#tb" + key).val(p[key].name);
												}
											}
											// AutoLoad Wheel
											Load2();
                      // Hide Loading GIF
                      $(".loading").hide();
                  }
              });
						}
    });
});




// Fetch details based on term (str), location (str), radius (int)
$(document).ready(function(){


  // iPad/iPhone/Android Hack, as we're not pro in getting a responsive design in less time
  var isiPad = navigator.userAgent.match(/iPad/i) != null;
  var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
  var isAndroid = navigator.userAgent.match(/Android/i) != null;

   if(isiPad || isiPhone || isAndroid)
   {
    document.getElementById("mannualLoad").style.right = "-40px";

    document.getElementById("piechart").style.height = "270px";
    document.getElementById("piechart").style.width = "270px";

    document.getElementById("yelpform").style.left = "8px";

    document.getElementById("pointer").style.height = "49px";
    document.getElementById("pointer").style.right = "-150px";
    document.getElementById("pointer").style.top = "-143px";


    document.getElementById("choice").style.font = "34px Montserrat, sans-serif";
    document.getElementById("choice").style.width = "300px";
    document.getElementById("spinit").style.font = "34px Montserrat, sans-serif";
    document.getElementById("spinit").style.width = "300px";
  }
    // Click action on  Custom Address and Term (Load Wheel Button)
    $(".fetch-by-address").unbind("click").click(function(){

      $(".loading").show();

		var location = $("#autocomplete").val();
		var term 		= $("#term").val();
		var radius	= $("#radius").val();
		var _flag = 0;

		if(radius == "") radius = 2;
		if(term == "") term = "restaurant";
		if(location == "") location = "Indianapolis, IN";

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
											if(data.total == 0) alert("Sorry, no results found, please refine a search for better result.");

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
                      $(".loading").hide();
                  }
        });
    });
});

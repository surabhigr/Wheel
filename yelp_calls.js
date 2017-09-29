// yelp calls

// Get details based on latitude (decimal), longitude (decimal)
$(document).ready(function(){
    $(".fetch-by-current-location").click(function(){

    var term 		= $("#term").val();
		var radius	= $("#radius").val();

    // CA Lat/Long
    var latitude =  '37.786882';
  	var longitude =  '-122.399972';
		if(radius == "") radius = 7;
		if(term == "") term = "pizza";


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
    $(".fetch-by-address").unbind("click").click(function(){

		var location = $("#autocomplete").val();
		var term 		= $("#term").val();
		var radius	= $("#radius").val();
		var _flag = 0;

		if(radius == "") radius = 2;
		if(term == "") term = "pizza";
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
                  }
        });
    });
});

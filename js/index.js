
function toCelsius(temp) {
  return ((parseFloat(temp)-32) * 0.55555).toFixed(1);
}

function toFahrenheit(temp) {
  return ((parseFloat(temp) * 1.8) +32).toFixed(1);
}

function kelvinToCelsius(temp) {
  return (parseFloat(temp)-273.15).toFixed(1);
}
$(document).ready(function() {

	$.get("http://ipinfo.io", function(response) {
  		
  		
  		var lat = response.loc.split(',')[0];
  		var long = response.loc.split(',')[1];
  		var city = response.city;
  		var countryCode = response.country;
  		$("#location").text( countryCode + " " + city);
  		var location = {
  			latitude: lat,
  			longitude: long
  		};
  		
  		$.get("http://api.openweathermap.org/data/2.5/weather?lat=" + location.latitude+ "&lon=" + location.longitude +
            "&appid=" + "9de42e1a6534f8b9cbea69529a180c19",
  				function(response) {
  					console.log(response);
            var tempFahr = response.main.temp;
            var weather = response.weather[0].main;
            var icon = response.weather[0].icon;
            console.log(tempFahr, weather, icon);
            $("#degrees").text(kelvinToCelsius(tempFahr) + "   ");
            $("#unit").html('<a href="#" id="linkChange">C</a>');
            $("#linkChange").on("click", function(event) {
                                      event.preventDefault();
                                      if($("#linkChange").text() === 'C') {
                                          $("#degrees").text(toFahrenheit($("#degrees").text()));
                                          $("#linkChange").text("F");
                                      }
                                      else {
                                          $("#degrees").text(toCelsius($("#degrees").text()));
                                          $("#linkChange").text("C");
                                      }
                                      } );

            $("#weather").text(weather);
            $("#icon-weather").attr('src','http://openweathermap.org/img/w/' + icon + '.png');

  				}, "json");

      //http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a1
      //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
  		
  	}, "jsonp");

});

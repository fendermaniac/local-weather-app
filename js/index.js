var unitSymbol = "&#8457"; // html symbol for imperial or metric
var unit;

function getGeo(){
    if (navigator.geolocation) {
//Get latitude and longitude
  navigator.geolocation.getCurrentPosition(function(position) {   
           
        weatherRequest(position);
    });
  } else {
    alert("Location required."); //In future add feature to enter in 
  }
}

function weatherRequest(position){
  var apiKey = "e496ed55562320af4d0cd39d80d1d734";//API Key for OpenWeatherMap
  var unit = "imperial"; // Imperial or metric  
  
          $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" +
        position.coords.longitude +"&units=" + unit +"&appid=" + apiKey, function(data){
          
          loc = data.name; // Location by city
          weather = data.weather[0].main; // Weather type i.e. "Cloudy"
          temp = data.main.temp; // Current temperature.  Farenheight by default
          weatherID = data.weather[0].id; // https://openweathermap.org/weather-conditions        
          // print out values
            printWeather();
          //Assign values to variables.
            weatherIcon();
        });
}

function printWeather(){
  $("#city").html(loc);
        $("#location").html("Current Location: "+ loc); 
        $("#weather").html("Current Weather: "+ weather); 
        $("#temperature").html("Temperature: " + temp + unitSymbol);   
}

function weatherIcon(){
  if (weatherID < 300){$("#icon").html("<h1 class=\"wi wi-thunderstorm\"></h1>");}
  else if (weatherID < 600){$("#icon").html("<h1 class=\"wi wi-rain\"></h1>");/*Rain*/}
  else if (weatherID < 700){$("#icon").html("<h1 class=\"wi wi-snow\"></h1>");}  
  else if (weatherID < 800){$("#icon").html("<h1 class=\"wi wi-fog\"></h1>");} 
  else if (weatherID == 800){$("#icon").html("<h1 class=\"wi wi-night-clear\"></h1>");} 
  else {$("#icon").html("<h1 class=\"wi wi-alien\"></h1>");}
}

function changeUnit(){  
  function toCelsius(f) {
    return ((5/9) * (f-32)).toFixed(2);
}  
    if (unit == "imperial") {
    unit = "metric";
    unitSymbol = "&#8451";
    $("#temperature").html("Temperature: " + toCelsius(temp) + unitSymbol);
  } else {
    unit = "imperial";
    unitSymbol = "&#8457";
    $("#temperature").html("Temperature: "  + temp + unitSymbol);
  }
}

function init(){
  getGeo();
}

$( document ).ready(init);

$("#units").on("click", changeUnit);
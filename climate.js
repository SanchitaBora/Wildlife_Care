var navLink = document.getElementById('navLink');
      function showMenu(){
        navLink.style.right="0";
}
      function hideMenu(){
        navLink.style.right="-200px";
}

Api_key="6d9337cbfb948aeca61b371de574349d";

function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        let{latitude,longitude}=success.coords;
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${Api_key}").then(res=>res.json()).then(data=>{
            console.log(data)
        }) 
    })
}

var x=document.getElementById('deviceOutput');

function useDeviceLocation() {
  document.getElementById("deviceLocation").style.display = "block";
  document.getElementById("manualLocation").style.display = "none";
}

function enterLocationManually() {
  document.getElementById("manualLocation").style.display = "block";
  document.getElementById("deviceLocation").style.display = "none";
}

function getLocation() {
  if (navigator.geolocation) {
      x.innerHTML = "Getting location...";
      navigator.geolocation.getCurrentPosition(showposition);
  } else {
      console.log("Browser doesn't support this feature. Please update your browser");
  }
}

function showposition(position) {
  var x = document.getElementById('deviceOutput');
  var loc = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=6d9337cbfb948aeca61b371de574349d"
  var aqi = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=6d9337cbfb948aeca61b371de574349d"
  $.get({
      url: loc,
      success: function (data) {
          console.log(data);
          x.innerHTML = data[0].name + ", " + data[0].state + ", " + data[0].country + "<br>";
      }
  })
  $.get({
      url: aqi,
      success: function (data1) {
          console.log(data1);
          x.innerHTML += "AQI: " + data1.list[0].main.aqi + "<br>Air Quality: ";
          if (data1.list[0].main.aqi == 1) x.innerHTML += "Good";
          else if (data1.list[0].main.aqi == 2) x.innerHTML += "Fair";
          else if (data1.list[0].main.aqi == 3) x.innerHTML += "Moderate";
          else if (data1.list[0].main.aqi == 4) x.innerHTML += "Poor";
          else x.innerHTML += "Very Poor";
      }
  })
}

function getWeather() {
  var location = document.getElementById("locationInput").value;
  // You can use the entered location to fetch weather information from an API
  // For example:
  // fetchWeatherInfoByLocation(location);

  // For demonstration purposes, we'll just display the location
  document.getElementById("manualOutput").innerHTML = "Weather information for: " + location;
}
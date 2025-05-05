function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
  
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        const weather = data[city];
        document.getElementById("result").innerHTML = weather
          ? `Temperature: ${weather.temp}°C<br>Humidity: ${weather.humidity}%<br>Condition: ${weather.condition}`
          : "City not found!";
        });     
}
  
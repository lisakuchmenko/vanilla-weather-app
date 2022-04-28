let apiKey = 'b28509bf2e3b7243f21402b7bfc8dac4';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

let descriptionEl = document.querySelector('#description');
let tempEl = document.querySelector('#temperature');
let cityEl = document.querySelector('#city');
let humidityEl = document.querySelector('#humidity');
let windEl = document.querySelector('#wind');

function displayTemperature(response) {
	descriptionEl.innerHTML = response.data.weather[0].description;
	tempEl.innerHTML = Math.round(response.data.main.temp);
	cityEl.innerHTML = response.data.name;
	humidityEl.innerHTML = response.data.main.humidity;
	windEl.innerHTML = Math.round(response.data.wind.speed);
}

axios.get(apiUrl).then(displayTemperature);

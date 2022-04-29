let apiKey = 'b28509bf2e3b7243f21402b7bfc8dac4';
let city = 'London';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

let dateEl = document.querySelector('#date');
let descriptionEl = document.querySelector('#description');
let tempEl = document.querySelector('#temperature');
let cityEl = document.querySelector('#city');
let humidityEl = document.querySelector('#humidity');
let windEl = document.querySelector('#wind');
let iconEl = document.querySelector('#icon');

function formatDate(timestamp) {
	let week = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let day = week[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
	descriptionEl.innerHTML = response.data.weather[0].description;
	tempEl.innerHTML = Math.round(response.data.main.temp);
	cityEl.innerHTML = response.data.name;
	humidityEl.innerHTML = response.data.main.humidity;
	windEl.innerHTML = Math.round(response.data.wind.speed);
	dateEl.innerHTML = formatDate(response.data.dt * 1000);
	iconEl.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
	iconEl.alt = response.data.weather[0].description;
}

axios.get(apiUrl).then(displayTemperature);

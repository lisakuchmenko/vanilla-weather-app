//variables for page elements
let dateEl = document.querySelector('#date');
let descriptionEl = document.querySelector('#description');
let tempEl = document.querySelector('#temperature');
let cityEl = document.querySelector('#city');
let humidityEl = document.querySelector('#humidity');
let windEl = document.querySelector('#wind');
let iconEl = document.querySelector('#icon');
let farenhEl = document.querySelector('#farenheit');
let celcEL = document.querySelector('#celcius');
let celcTemp = null;

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
	celcTemp = Math.round(response.data.main.temp);
}

function search(city) {
	let apiKey = 'b28509bf2e3b7243f21402b7bfc8dac4';
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputEl = document.querySelector('#city-input').value;
	search(cityInputEl);
}

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

//change temperature to farenheit
farenhEl.addEventListener('click', function (event) {
	event.preventDefault();
	tempEl.innerHTML = Math.round(celcTemp * 1.8 + 32);
	farenhEl.classList.add('active');
	celcEL.classList.remove('active');
});

//change temperature to celcius
celcEL.addEventListener('click', function (event) {
	event.preventDefault();
	tempEl.innerHTML = celcTemp;
	celcEL.classList.add('active');
	farenhEl.classList.remove('active');
});

search('London');

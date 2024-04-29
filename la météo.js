const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const weatherDiv = document.getElementById("weather");
var map = L.map('map');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = input.value.trim();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9776bfdde46c1e71ce0446dfc252dcd8&units=metric`)
    .then(response => response.json())
    .then(data => {
        const weather = {
            city: data.name,
            description: data.weather[0].description,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            icon: data.weather[0].icon,
        };
        displayWeather(weather);

        map.setView([data.coord.lat, data.coord.lon], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    })
    .catch(error => console.error(error));

})

function displayWeather(weather){
    weatherDiv.innerHTML = '';
    const card = document.createElement('div');
    card.classList.add('weather-card');

    const title = document.createElement('h2');
    title.textContent = weather.city;
    card.appendChild(title);

    const icon = document.createElement('img');
    icon.src = `http://openweathermap.org/img/wn/${weather.icon}.png`;
    card.appendChild(icon);

    const description = document.createElement('p');
    description.textContent = weather.description;
    card.appendChild(description);

    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${weather.temperature} °C`;
    card.appendChild(temperature);

    const humidity = document.createElement('p');
    humidity.textContent = `Humidite: ${weather.humidity}%`;
    card.appendChild(humidity);

    weatherDiv.appendChild(card);
    weatherDiv.style.display = 'block';
       
}
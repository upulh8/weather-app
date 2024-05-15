const countrySelect = document.getElementById('countrySelect');
const citySelect = document.getElementById('citySelect');
const weatherDiv = document.getElementById('weather');

const countries = {
    "USA": ["New York", "Los Angeles", "Chicago"],
    "Canada": ["Toronto", "Vancouver", "Montreal"],
    "UK": ["London", "Manchester", "Birmingham"]
};

function populateCountries() {
    for (let country in countries) {
        let option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }
}

function filterCities() {
    citySelect.innerHTML = '<option value="">Select City</option>';
    let selectedCountry = countrySelect.value;
    if (selectedCountry) {
        let cities = countries[selectedCountry];
        cities.forEach(city => {
            let option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

async function getWeather() {
    let country = countrySelect.value;
    let city = citySelect.value;

    if (country && city) {
        let apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

        try {
            let response = await fetch(url);
            let data = await response.json();
            displayWeather(data

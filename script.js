const keyAPI = "5294781cdeeafe5d3f20bf0ca4205738";

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${keyAPI}`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getWeather(location) {
    const resp = await fetch(url(location), {
        origin: "cors"
    });

    const respData = await resp.json();
    
    addWeather(respData);
}

function addWeather(data) {
    const temp = kelvinToCelsius(data.main.temp);

    const weatherHTML = `
    <div class="display">
            <h1 id="location">${data.name}</h1>
            <div id="image-and-temp">
                <div id="img-placeholder">
                    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="" id="avatar">
                </div>
                <h1 id="temp">${temp} °C</h1>
            </div>
            <h3 id="weather-type">${data.weather[0].main}</h3>
        </div>
    `;

    main.innerHTML = weatherHTML;
}

function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(0);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const city = search.value;

    if(city) {
        getWeather(city);
        search.value = "";
    }
});
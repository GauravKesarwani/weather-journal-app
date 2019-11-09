/* Global Variables */

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather/';
const apiKey = '57fdb6608943cfe4cbbd4895c332a0d3';
const zipEl = document.getElementById('zip');
const feelingsEl = document.getElementById('feelings');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const contentEl = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

async function fetchDataFromWeatherApi (baseUrl, zip, apiKey) {
    const resp = await fetch(`${baseUrl}?zip=${zip}&apiKey=${apiKey}`);
    return resp.json();
}

async function fetchData() {
    const resp = await fetch('/weather', { method: 'GET' });
    const respJson = await resp.json();
    const entry = respJson[zipEl.value];
    tempEl.innerHTML = entry.temperature;
    contentEl.innerHTML = entry.userResponse;
    dateEl.innerHTML = entry.date;
}

async function saveData(path, data) {
    const resp = await fetch(path,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    return resp;
}

function handleClick(event) {
    const zipCode = zipEl.value;
    const feelings = feelingsEl.value; 
    fetchDataFromWeatherApi(baseUrl, zipCode, apiKey)
        .then((jsonRes) => {
            const temperature = jsonRes.main.temp;
            return saveData('/weather', { temperature, zipCode, feelings, date: newDate })
        })
        .then(fetchData)
}

const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', handleClick);
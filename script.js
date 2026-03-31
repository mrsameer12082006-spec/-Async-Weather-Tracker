// Use the existing API key
const API_KEY = "2411fc0f77bfcbdfd5c2a4b33222989c";

// DOM Elements
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const weatherContainer = document.getElementById("weather-data");
const historyContainer = document.getElementById("Search-history");

// 4. Local Storage - Search History
let searchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory")) || [];

// Function to render search history
function renderHistory() {
    historyContainer.innerHTML = "";
    if (searchHistory.length === 0) {
        historyContainer.innerHTML = "<p style='font-size:0.9rem; opacity:0.7;'>No recent searches.</p>";
        return;
    }
    
    searchHistory.forEach(city => {
        let btn = document.createElement("button");
        btn.textContent = city;
        btn.className = "history-btn";
        // Allow users to click a previous city to re-fetch weather data
        btn.addEventListener("click", () => {
            console.log(`History button clicked for: ${city}`);
            fetchWeather(city);
        });
        historyContainer.appendChild(btn);
    });
}

// Function to add city to history
function addToHistory(city) {
    // Check to avoid duplicates
    if (!searchHistory.includes(city)) {
        searchHistory.unshift(city); // Add to beginning
        
        // Keep only last 5 searches to avoid UI clutter
        if (searchHistory.length > 5) {
            searchHistory.pop(); 
        }
        
        // Store in Local Storage
        localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));
        renderHistory();
    }
}

// 2 & 3. Asynchronous API Handling & Error Handling
async function fetchWeather(cityName) {
    // 5. Event Loop & Execution Order Analysis
    console.log("-----------------------------------------");
    console.log("[Execution Order 1] fetchWeather() started. Synchronous code executing.");
    
    weatherContainer.innerHTML = "<p>Fetching data...</p>";
    
    try {
        console.log("[Execution Order 2] About to call fetch() - initiating asynchronous HTTP request.");
        
        // Fetch call returning a promise
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        
        console.log("[Execution Order 3] fetch() promise resolved. Awaiting JSON parsing.");
        
        let data = await response.json();
        
        console.log("[Execution Order 4] JSON parsing complete. Data ready.");

        // Handle valid response but API returned an error (e.g., 404 City Not Found)
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch weather data");
        }
       
        // Build robust UI
        let card = document.createElement("div");
        card.className = "weather-card";
        
        // Extract relevant fields
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main;
        const desc = data.weather[0].description;
        const humidity = data.main.humidity;
        const speed = data.wind.speed;
        
        card.innerHTML = `
            <div class="weather-row"><span class="label">City</span> <span class="value">${data.name}, ${data.sys.country}</span></div>
            <div class="weather-row"><span class="label">Temp</span> <span class="value">${temp} &deg;C</span></div>
            <div class="weather-row"><span class="label">Weather</span> <span class="value">${condition}</span></div>
            <div class="weather-row"><span class="label">Humidity</span> <span class="value">${humidity}%</span></div>
            <div class="weather-row"><span class="label">Wind</span> <span class="value">${speed} m/s</span></div>
        `;
                          
        weatherContainer.innerHTML = "";
        weatherContainer.append(card);
        
        // Save to history on successful fetch
        addToHistory(data.name);
        
    } catch (error) {
        // Handle Network Errors & Invalid Responses
        console.error("[Error Handling] Caught an error during fetch sequence:", error);
        let errorMessage = error.message;
        if (!errorMessage || errorMessage === "[object Object]") {
            errorMessage = "Network error. Please try again later.";
        }
        weatherContainer.innerHTML = `
            <div class="error-message">
                <strong>Oops!</strong><br>
                ${errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}
            </div>
        `;
    }
    
    console.log("[Execution Order 5] fetchWeather() function completed its final synchronous/asynchronous steps.");
    console.log("-----------------------------------------");
}

// 1. Weather Search Interface handling
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh
    let city = cityInput.value.trim();
    
    if (city !== "") {
        console.log("User submitted the form. Calling fetchWeather()...");
        fetchWeather(city);
        cityInput.value = ""; // Clear input field after submit
    }
});

// Initialize App by loading History
renderHistory();

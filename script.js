 let API_KEY = "2411fc0f77bfcbdfd5c2a4b33222989c";

        let form = document.querySelector("form")
        let city = document.getElementById("city")
        let wheather = document.querySelector("#weather-data")
        let historyContainer = document.getElementById("Search-history")



        // ===== Fetch Weather =====
        async function fetchweather(cityName){
            try{
                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)

                if(!response.ok){
                    throw new Error("City not found")
                }

                let data = await response.json()

                let card = document.createElement("div")

                card.innerHTML =`
    <div class="weather-row"><span>City</span><span>${data.name}, ${data.sys.country}</span></div>
    <div class="weather-row"><span>Temp</span><span>${data.main.temp} °C</span></div>
    <div class="weather-row"><span>Weather</span><span>${data.weather[0].main}</span></div>
    <div class="weather-row"><span>Humidity</span><span>${data.main.humidity}%</span></div>
    <div class="weather-row"><span>Wind</span><span>${data.wind.speed} m/s</span></div>
`

                wheather.innerHTML = ""
                wheather.append(card)

                saveToHistory(cityName)

            }catch(error){
                wheather.innerHTML = `<h4 style="color:red;">${error.message}</h4>`
            }
        }

        // ===== Save History =====
        function saveToHistory(cityName){
            let cities = JSON.parse(localStorage.getItem("cities")) || []

            if(!cities.includes(cityName)){
                cities.push(cityName)
                localStorage.setItem("cities", JSON.stringify(cities))
            }

            displayHistory()
        }

        // ===== Display History =====
        function displayHistory(){
            let cities = JSON.parse(localStorage.getItem("cities")) || []

            historyContainer.innerHTML = ""

            cities.forEach(city => {
                let btn = document.createElement("button")
                btn.className = "history-btn"
                btn.innerText = city

                btn.addEventListener("click", ()=>{
                    fetchweather(city)
                })

                historyContainer.appendChild(btn)
            })
        }

        // ===== Form Submit =====
        form.addEventListener("submit",(event)=>{
            event.preventDefault()

            if(city.value.trim() === ""){
                alert("Please enter a city name")
                return
            }

            fetchweather(city.value)
        })

        // ===== Load History =====
        window.addEventListener("load", ()=>{
            displayHistory()
        })
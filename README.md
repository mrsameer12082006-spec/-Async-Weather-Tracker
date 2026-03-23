# Async Weather Tracker

A vanilla JavaScript weather application that fetches and displays real-time weather data using the OpenWeatherMap API. Built as part of **Lab Assignment 2** for Web Dev II (Advanced JS & React).

## 📸 Output Preview
1. ![Output Preview](<Screenshot (64).png>)
2. ![Output Preview](<Screenshot (65).png>)

## 🚀 Features
- **Weather Search Interface**: Beautifully designed UI with a dark navy theme, matching the exact provided mockup.
- **Asynchronous API Handling**: Uses modern ES6 `async/await` and the `fetch()` API to seamlessly request weather data.
- **Robust Error Handling**: Gracefully catches invalid city inputs and network errors, displaying styled alerts directly in the UI instead of breaking.
- **Local Storage Search History**: Automatically remembers your last 5 successful city queries and generates clickable pill-shaped buttons to instantly re-fetch their weather data.
- **Event Loop Observability**: Includes internal `console.log()` statements that track function execution order to help analyze the Call Stack, Task Queue, and synchronous vs. asynchronous behavior in JavaScript.

## 🛠️ Technology Stack
- **HTML5** - Clean, semantic markup structure.
- **CSS3** - Completely custom styling, utilizing Flexbox, card layouts, pill buttons, and robust layout design **without** the use of any external UI libraries (e.g. Bootstrap or Tailwind). 
- **Vanilla JavaScript** - DOM manipulation, Event handling, and Web Storage API integration.

## 📦 Running Locally
Because this project purely uses Vanilla HTML/CSS/JS, running it is incredibly simple:
1. Clone the repository: `git clone https://github.com/mrsameer12082006-spec/-Async-Weather-Tracker.git`
2. Open `index.html` in your favorite web browser! No local server or build pipeline required.

## 📋 Assignment Requirements Fulfilled
- ✅ **No UI libraries**
- ✅ **Weather Search Interface**
- ✅ **Asynchronous API handling (`fetch` & `async/await`)**
- ✅ **Promise state & Error handling (`try...catch`)**
- ✅ **Local Storage - Search History integration**
- ✅ **Event Loop & Execution Order Analysis (`console.log`)**

---
*Happy Coding! 🎯*

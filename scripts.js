
// 👋 Hi, I’m @AliAr78
// 👀 I’m interested in Front end development
// 🌱 I’m currently learning Js and React
// 💞️ I’m looking to collaborate on Web applications and Front end development
// 📫 How to reach me: ali.a.r.frontdev@gmail.com



document.addEventListener("DOMContentLoaded", function () {
  // Detect browser type
  const userAgent = navigator.userAgent;
  const browserMap = {
    Firefox: "Firefox",
    Chrome: userAgent.indexOf("OPR") > -1 ? "Opera GX" : "Chrome",
    Safari: "Safari",
    Edge: "Edge",
    Trident: "Explorer",
  };
  let browserName = Object.keys(browserMap).find(
    (browser) => userAgent.indexOf(browser) > -1
  ) || "Unknown Browser";
  document.title = browserName;

  // Create snowflakes
  const numberOfSnowflakes = 50;
  function createSnowflake() {
    const snowflake = document.createElement("span");
    snowflake.className = "snowflake";
    document.body.appendChild(snowflake);
    resetSnowflake(snowflake);
    snowflake.addEventListener("animationiteration", () =>
      resetSnowflake(snowflake)
    );
  }
  function resetSnowflake(snowflake) {
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.top = `${Math.random() * -100}px`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
  }
  for (let i = 0; i < numberOfSnowflakes; i++) createSnowflake();

  // Set up time display
  const yearElem = document.getElementById("year");
  const dayElem = document.getElementById("day");
  const hourElem = document.getElementById("hour");
  const minuteElem = document.getElementById("minute");
  const secondElem = document.getElementById("second");
  const PM_AMElem = document.getElementById("PM_AM");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getTime() {
    const date = new Date();
    let hour = date.getHours();
    const min = ("0" + date.getMinutes()).slice(-2);
    const sec = ("0" + date.getSeconds()).slice(-2);
    const meridiem = hour >= 12 ? "PM" : "AM";
    if (hour > 12) hour -= 12;
    yearElem.innerHTML = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    dayElem.innerHTML = days[date.getDay()];
    hourElem.innerHTML = ("0" + hour).slice(-2);
    minuteElem.innerHTML = min;
    secondElem.innerHTML = sec;
    PM_AMElem.innerHTML = meridiem;
  }
  getTime();
  setInterval(getTime, 1000);

  // Add tab
  const addTabButton = document.getElementById("add-tab");
  const popup = document.getElementById("popup-form");
  const closePopupButton = document.getElementById("close-popup-btn");
  const addTabBtn = document.getElementById("add-tab-btn");
  const tabNameInput = document.getElementById("tab-name");
  const tabUrlInput = document.getElementById("tab-url");
  const leftTabs = document.getElementById("left-tabs");

  addTabButton.addEventListener("click", () =>
    popup.classList.remove("hidden")
  );
  closePopupButton.addEventListener("click", () =>
    popup.classList.add("hidden")
  );

  addTabBtn.addEventListener("click", () => {
    const name = tabNameInput.value;
    let url = tabUrlInput.value;
    if (name && url) {
      if (!/^https?:\/\//i.test(url)) url = "http://" + url;
      addTab(name, url);
      saveTab(name, url);
      popup.classList.add("hidden");
      tabNameInput.value = "";
      tabUrlInput.value = "";
    }
  });

  function addTab(name, url) {
    const tab = document.createElement("a");
    tab.href = url;
    tab.className = "tab";
    tab.innerHTML = `<div>${name}</div><img src="assets/images/Flat_cross_icon.svg" class="delete-tab" />`;
    tab.querySelector(".delete-tab").addEventListener("click", (event) => {
      event.preventDefault();
      removeTab(name);
      tab.remove();
    });
    leftTabs.insertBefore(tab, addTabButton);
    if (document.body.classList.contains("dark")) tab.classList.add("dark");
  }

  function saveTab(name, url) {
    const tabs = JSON.parse(localStorage.getItem("tabs")) || [];
    tabs.push({ name, url });
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }

  function removeTab(name) {
    const tabs = JSON.parse(localStorage.getItem("tabs")) || [];
    localStorage.setItem(
      "tabs",
      JSON.stringify(tabs.filter((tab) => tab.name !== name))
    );
  }

  function loadTabs() {
    (JSON.parse(localStorage.getItem("tabs")) || []).forEach((tab) =>
      addTab(tab.name, tab.url)
    );
  }

  loadTabs();

  const timers = document.querySelectorAll(".timers");
  const tabs = document.querySelectorAll(".tab");
  const themeBtn = document.querySelector(".top-right-button span img");
  const spanImg = document.querySelector(".spanImg");
  const addTabs = document.getElementById("addTabImg");
  const searchBarInput = document.getElementById("bar");

  if (localStorage.getItem("darkMode") === "true") toggleDarkMode(true);

  spanImg.addEventListener("click", () => toggleDarkMode());

  function toggleDarkMode(setDark) {
    const isDarkMode =
      setDark !== undefined
        ? setDark
        : !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
    themeBtn.setAttribute(
      "src",
      isDarkMode ? "assets/images/icon-sun.svg" : "assets/images/icon-moon.svg"
    );
    addTabs.setAttribute(
      "src",
      isDarkMode ? "assets/images/plus-Red.png" : "assets/images/plus-Black.png"
    );
    document.getElementById("TEXT").classList.toggle("dark", isDarkMode);
    searchBarInput.classList.toggle("dark", isDarkMode);
    tabs.forEach((tab) => tab.classList.toggle("dark", isDarkMode));
    timers.forEach((timer) => timer.classList.toggle("dark", isDarkMode));
  }

  // Weather information
  const weatherDiv = document.getElementById("weather");
  function fetchWeather(city) {
    const apiKey = "3045dd712ffe6e702e3245525ac7fa38";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    weatherDiv.innerHTML = "Loading weather...";
    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const { temp } = data.main;
        const { description } = data.weather[0];
        weatherDiv.innerHTML = `<img src="${getWeatherIcon(
          description
        )}" alt="${description}" style="width: 50px; height: 50px;"/> ${temp}°C`;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        weatherDiv.innerHTML = "Error fetching weather data.";
      });
  }

  function getWeatherIcon(description) {
    if (description.includes("clear")) return "assets/icons/sun.png";
    if (description.includes("rain")) return "assets/icons/rain.png";
    if (description.includes("cloud")) return "assets/icons/cloud.png";
    return "assets/icons/sun.png";
  }

  function fetchLocationAndWeather() {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const city = data.city;
        fetchWeather(city);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        weatherDiv.innerHTML = "Error fetching location data.";
      });
  }

  fetchLocationAndWeather();

  // Background settings
  const bgInput = document.getElementById("bg-custom");
  const removeBgBtn = document.getElementById("remove-bg-btn");

  // Check and set background based on localStorage
  if (localStorage.getItem("customBgEnabled") === "true") {
    document.body.classList.add("custom-bg");
    document.body.style.backgroundImage = `url(${localStorage.getItem("customBgImage")})`;
  }

  // File input change event to set background
  bgInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        localStorage.setItem("customBgEnabled", "true");
        localStorage.setItem("customBgImage", imageUrl);
        document.body.classList.add("custom-bg");
        document.body.style.backgroundImage = `url(${imageUrl})`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Click event to remove background
  removeBgBtn.addEventListener("click", function () {
    localStorage.removeItem("customBgEnabled");
    localStorage.removeItem("customBgImage");
    document.body.classList.remove("custom-bg");
    document.body.style.backgroundImage = "";
  });

  // Season settings
  function getSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "fall";
    return "winter";
  }

  function applySeasonalStyles() {
    const season = getSeason();
    const stylesheet = document.getElementById("season-stylesheet");
    stylesheet.href = `${season}.css`;
  }

  applySeasonalStyles();

  // Manage snowfall
  const snowToggle = document.getElementById("snow-toggle");

  function enableSnowfall(enable) {
    if (enable) {
      for (let i = 0; i < numberOfSnowflakes; i++) createSnowflake();
    } else {
      document.querySelectorAll(".snowflake").forEach((snowflake) => snowflake.remove());
    }
  }

  snowToggle.addEventListener("change", function () {
    const enable = snowToggle.checked;
    enableSnowfall(enable);
    localStorage.setItem("snowfallEnabled", enable);
  });

  const snowfallEnabled = localStorage.getItem("snowfallEnabled") === "true";
  snowToggle.checked = snowfallEnabled;
  enableSnowfall(snowfallEnabled);

  // Settings popup management
  const settingBtn = document.querySelector(".settingBtn");
  const settingsPopup = document.getElementById("settings-popup");
  const closeSettingsBtn = document.getElementById("close-settings-btn");

  settingBtn.addEventListener("click", () => settingsPopup.classList.remove("hidden"));
  closeSettingsBtn.addEventListener("click", () => settingsPopup.classList.add("hidden"));

});






// 👋 Hi, I’m @AliAr78
// 👀 I’m interested in Front end development
// 🌱 I’m currently learning Js and React
// 💞️ I’m looking to collaborate on Web applications and Front end development
// 📫 How to reach me: ali.a.r.frontdev@gmail.com

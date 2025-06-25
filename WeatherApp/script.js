const temp = document.querySelector(".temp");
const weather_location = document.querySelector(".time_location p");
const location_time = document.querySelector(".time_location span");
const condition = document.querySelector(".weather_condition span");
const emoji = document.querySelector(".weather_condition img");

const searchfield = document.querySelector(".searchField");
const form = document.querySelector("form");
let target = "pune";
function searchFun(e) {
  // preventDefault here we are preventing the page from auto reload
  e.preventDefault();
  target = searchfield.value;
  getDataFromApi(target);
}

form.addEventListener("submit", searchFun);

async function getDataFromApi(target) {
  try {
    let url = https://api.weatherapi.com/v1/current.json?key=0be1228a43274a17aef153753250606&q=${target}&aqi=no;

    const response = await fetch(url);
    // .json will fetch the json data from the response

    const data = await response.json();
    console.log("data-->", data);
    if (data) {
      const currentTemperature = data.current.temp_c;
      const currentCondition = data.current.condition.text;
      const locationName = data.location.name;
      const locationTime = data.location.locationTime;
      const conditionEmoji = data.current.condition.icon;

      updateDom(
        currentTemperature,
        currentCondition,
        locationName,
        locationTime,
        conditionEmoji
      );
    } else {
      console.log("Failed to fetch data from API!");
    }
  } catch (error) {
    console.log(error);
  }
}

function updateDom(
  currentTemperature,
  currentCondition,
  locationName,
  locationTime,
  conditionEmoji
) {
  temp.textContent = currentTemperature;
  weather_location.textContent = locationName;
  location_time.textContent = locationTime;
  condition.textContent = currentCondition;
  emoji.src = conditionEmoji;
}
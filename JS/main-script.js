let dayIconsByDescription = {
"clear sky": "wi wi-day-sunny",
"few clouds": "wi wi-day-cloudy",
"scattered clouds":"wi wi-cloud",
"overcast clouds":"wi wi-cloud",
"broken clouds":"wi wi-cloudy",
"shower rain":"wi wi-day-showers",
"light rain": "wi wi-day-showers",
"moderate rain": "wi wi-rain",
"rain":"wi wi-rain",
"thunderstorm":"wi wi-thunderstorm",
"snow":" wi wi-snowflake-cold",
"mist":"wi wi-fog"
};

let nightIconsByDescription = {
    "clear sky": "wi wi-night-clear",
    "few clouds": "wi wi-night-alt-cloudy",
    "scattered clouds":"wi wi-cloud",
    "overcast clouds":"wi wi-cloud",
    "broken clouds":"wi wi-cloudy",
    "shower rain":"wi wi-night-alt-showers",
    "light rain": "wi wi-night-alt-showers",
    "rain":"wi wi-rain",
    "moderate rain": "wi wi-rain",
    "thunderstorm":"wi wi-thunderstorm",
    "snow":" wi wi-snowflake-cold",
    "mist":"wi wi-fog"
};

let isDaytime=true;

function changeCity(){
let searchCity = document.getElementById("text-city");
let finallyCity = document.getElementById("city");

finallyCity.innerHTML = searchCity.value;

requestCurrentWeather(searchCity.value);
requestNextWeather(searchCity.value);

}

function changeBackground (newDate){
    let date;   
    if(newDate){
        date = newDate;
    }else{
        date = new Date();
    }
    
    let dateString = date.toLocaleString("es-ES");
    document.getElementById("hour-date").innerText = dateString.toString();
    let hour = date.getHours();
    let bgImage = document.getElementsByClassName("bg-image");
    
    if(hour >= 20 || hour <= 7){
        isDaytime = false;
        bgImage[0].style.backgroundImage="url('/CSS/photos/night.jpg')";
    }else{
        isDaytime =true;
        bgImage[0].style.backgroundImage="url('/CSS/photos/day.jpg')";
    }
}

function requestCurrentWeather(city){
    let request =  axios.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=8d781767154f107e17200773567bfdc0");    
    
    function onSuccessRequestCurrentWeather(response){
        console.log(response);     
        
        let elementTemperature = document.getElementById("temperature");
        let elementMin = document.getElementById("min");
        let elementMax = document.getElementById("max");
        let elementFeels = document.getElementById("feels-like");
        let elementHumidity = document.getElementById("humidity");
        
        elementTemperature.innerText= Math.round(response.data.main.temp);
        elementMin.innerText= Math.round(response.data.main.temp_min)+"º";
        elementMax.innerText=Math.round(response.data.main.temp_max)+"º";
        elementFeels.innerText=Math.round(response.data.main.feels_like)+"º";
        elementHumidity.innerText=Math.round(response.data.main.humidity)+"%";

        let elementSymbol = document.getElementById("symbol");
        let descriptionSymbol = document.getElementById("description-symbol");
        descriptionSymbol.innerText= response.data.weather[0].description;

        let currentDay = new Date();
        let localTime = currentDay.getTime();
        let localOffset = currentDay.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let timezone = response.data.timezone;
        let newCountry = utc + (1000 * timezone);
        let contryDate = new Date(newCountry);
        
        changeBackground(contryDate);
        
        if (isDaytime){
            elementSymbol.className = dayIconsByDescription[response.data.weather[0].description];
        }else{
            elementSymbol.className = nightIconsByDescription[response.data.weather[0].description];
        }
         
    }

    function onErrorRequestCurrentWeather(error){
        console.log(error);       
    }

    request.then(onSuccessRequestCurrentWeather,onErrorRequestCurrentWeather);
}

function requestNextWeather(city){
    let request = axios.get("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&appid=8d781767154f107e17200773567bfdc0");

    function onSuccessRequestNextWeather(response){
        console.log(response); 

        let tempertureTomorrow = document.getElementById("temperture-tomorrow");
        let tempertureAfterTomorrow = document.getElementById("temperture-after-tomorrow");
        let tempertureOtherTomorrow = document.getElementById("temperture-other-tomorrow");
        let symbolTomorrow = document.getElementById("symbol-tomorrow");
        let symbolAfterTomorrow = document.getElementById("symbol-after-tomorrow");
        let symbolOtherTomorrow = document.getElementById("symbol-other-tomorrow");
        
        tempertureTomorrow.innerText= Math.round(response.data.list[1].main.temp)+"º";
        tempertureAfterTomorrow.innerText = Math.round(response.data.list[2].main.temp)+"º";
        tempertureOtherTomorrow.innerText = Math.round(response.data.list[3].main.temp)+"º";
        
        symbolTomorrow.className += " "+dayIconsByDescription[response.data.list[1].weather[0].description];
        symbolAfterTomorrow.className += " "+dayIconsByDescription[response.data.list[2].weather[0].description];
        symbolOtherTomorrow.className += " "+dayIconsByDescription[response.data.list[3].weather[0].description];
    }
    function onErrorRequestNextWeather(error){
        console.log(error);       
    }

    request.then(onSuccessRequestNextWeather,onErrorRequestNextWeather);
}

function customOnload(){
    changeBackground();
    requestCurrentWeather("madrid");
    requestNextWeather("madrid");
}
window.onload=customOnload;
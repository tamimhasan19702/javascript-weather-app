const wrapper = document.querySelector('.wrapper'),
      inputPart = document.querySelector('.input-part'),
      infoText = document.querySelector('.info-txt'),
      inputField = document.querySelector('input'),
      locationBtn = document.querySelector('button');
      weatherIcon = document.querySelector('.weather-part img'),
      arrowBack = wrapper.querySelector("header i");

let api;      

const apiKey = '9ca26e4d8f1c41111c555269728216c2';    

inputField.addEventListener('keyup' , e => {
    if(e.key === "Enter" && inputField.value !== ''){
      requestApi(inputField.value);
    }
});      


locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser donot support geolocation api!!")
    }
})


function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}

function onError(error){
    infoText.innerText = error.message;
    infoText.classList.add('error');
}



function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}

function fetchData(){
    infoText.innerText = "Getting weather details...";
    infoText.classList.add('pending');

    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    
    if(info.cod === "404"){
        infoText.innerText = `${inputField.value} isn't a valid city name`;
        infoText.classList.add("error");
    }   
    else{
    const city = info.name;
    const country = info.sys.country;
    const {description,id} = info.weather[0];
    const {feels_like,humidity,temp} = info.main;


    // custom icon according to the weather api return
    if(id === 800){
        weatherIcon.src = "./weather-app-icons/clear.svg";
    }else if(id >= 200 && id <= 232){
        weatherIcon.src = "./weather-app-icons/storm.svg";
    }else if(id >= 600 && id <= 622){
        weatherIcon.src = "./weather-app-icons/snow.svg";
    }else if(id >= 701 && id <= 781){
        weatherIcon.src = "./weather-app-icons/haze.svg";
    }else if(id >= 801 && id <= 804){
        weatherIcon.src = "./weather-app-icons/cloud.svg";
    }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
        weatherIcon.src = "./weather-app-icons/rain.svg";
    }

    // render values into the display
    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city},${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText =`${humidity}%`;



    infoText.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
    }
 
}

arrowBack.addEventListener('click' , ()=> {
    wrapper.classList.remove('active');
})
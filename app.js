const wrapper = document.querySelector('.wrapper'),
      inputPart = document.querySelector('.input-part'),
      infoText = document.querySelector('.info-txt'),
      inputField = document.querySelector('input'),
      locationBtn = document.querySelector('button');

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
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetchData();
}

function onError(error){
    infoText.innerText = error.message;
    infoText.classList.add('error');
}



function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
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

    wrapper.querySelector(".temp .numb").innerText = temp;
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city},${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = feels_like;
    wrapper.querySelector(".humidity span").innerText = humidity;



    infoText.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
    }
 
}
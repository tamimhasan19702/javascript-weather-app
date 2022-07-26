const wrapper = document.querySelector('.wrapper'),
      inputPart = document.querySelector('.input-part'),
      infoText = document.querySelector('.info-txt'),
      inputField = document.querySelector('input');

inputField.addEventListener('keyup' , e => {
    if(e.key === "Enter" && inputField.value !== ''){
        requestApi(inputField.value);
    }
})      
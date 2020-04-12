console.log('client side javascript loaded');

const weatherForm=document.querySelector('form')
const searchedLocation=document.querySelector('input')
const messageOne=document.querySelector('#message-1');
const messagetwo=document.querySelector('#message-2');


//adding eventListener
weatherForm.addEventListener('submit',(eventObject)=>{
    eventObject.preventDefault();
    messageOne.textContent='Loading Weather information...'
    messagetwo.textContent=''
    const location=searchedLocation.value;
    console.log(location);
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent=data.error
            }
            else {
                messageOne.textContent=data.location
                messagetwo.textContent=data.forecast
                console.log(data.location);
                console.log(data.forecast);
            }
        }
        )
    })
        

})

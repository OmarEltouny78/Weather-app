/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = '661daa7377189bfe425b6af1f07ac279';

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e){
    const postCode=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    console.log(newDate);
    getTemperature(baseURL,postCode,key)
    .then(function (data){
        // Add data to POST request
        postData('http://localhost:8080/addWeatherData', {temperature: data.main.temp, date: newDate, user_response: feelings } )
        // Function which updates UI
        .then(function() {
            updateUI()
        })
    })
}

const getTemperature=async (baseURL,code,key)=>{
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + key)
    console.log(response);
    try{
        const data=await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.log(error);
    }
}


const postData = async (url = '', data = {}) =>{
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData=await postRequest.json();
        return newData;
    }catch(error){
        console.log(error);
    }
}

const updateUI = async() =>{
    const request = await fetch('http://localhost:3000/all');
    try{
        const allData= await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }catch(error){
        console.log(error);
    }

}
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5beb43e13dc3fa8be428191e6e50a00c';


document.getElementById('generate').addEventListener('click',perform);

function perform(){
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getWthr(baseURL,newZip,apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('http://localhost:3000/all', { date: newDate, temp: userData.main.temp, content })
    }).then(function () {
        UI_Update()
    })

}

const getWthr = async(baseURL,newZip,apiKey)=>{
    const res=await(baseURL+newZip+apiKey);
    try {
        const userData=await res.join();
        return userData;
    }catch(e){
        console.log(e);
    }
}

const postData= async(url='',data={})=>{
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          date: data.date,
          temp: data.temp,
          content: data.content
        })
      })
      try{
          const data=await req.join();
          return data;
      }catch(e){
          console.log(e);
      }
};
const UI_Update=async()=>{
    const request=await fetch('http://localhost:3000/all');
    try{
        const data= await request.join()

        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.content;
    }catch(e){
        console.log(e);
    }
}
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYzk0N2Y0YmQ0NzAwMTU4NWIyMWQiLCJpYXQiOjE3NjI1MTExODgsImV4cCI6MTc2MzcyMDc4OH0.kIZhJcExd4IpVSftlcwPPndhx1Uc_KstqLn06HUg01U"; 

const container = document.getElementById("products");

const getEvents = function(){
    fetch(API_URL, {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYzk0N2Y0YmQ0NzAwMTU4NWIyMWQiLCJpYXQiOjE3NjI1MTExODgsImV4cCI6MTc2MzcyMDc4OH0.kIZhJcExd4IpVSftlcwPPndhx1Uc_KstqLn06HUg01U"
        }
    })
    .then((res) => {
        console.log("RESPONSE", res)
        if (res.ok) {
            return res.json()
        } else {
            throw new Error(`Errore nella risposta ricevuta dal server: ${res.status}`)
        }
    })
    .then((arrayOfEvents) => {
        console.log("ARRAYOFEVENTS", arrayOfEvents);
        
    })
    .catch((err) => {
        console.log("PROBLEMA", err);
        
    })
}

getEvents()
const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
import { countryList } from "./codes.js";
const dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for(let select of dropdown)
{
    for(let currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD")
        {
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);   
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
    
}

const updateExchangeRate = async()=>{
    let ammount = document.querySelector(".amount input");
    let amtVal = ammount.value;
    if(amtVal ==="" ||amtVal<1)
    {
        amtVal=1;
        ammount.value=1;
    }
    const URLfrom =  `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URLfrom);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()]?.[toCurr.value.toLowerCase()];
    let finalAmount = rate*amtVal; 
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount}  ${toCurr.value}`;   
}

const updateFlag= (element) =>{
    
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;

};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault(); 
    updateExchangeRate();
    
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})


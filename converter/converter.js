/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const meter2Feet = 3.28084;
const litre2Gallon = 0.264172;
const kilo2Pound = 2.204623;

const inputEl = document.getElementById("input-el");
const convertBtn = document.getElementById("convert-btn");
const clearBtn = document.querySelector("#clear-btn");

const lengthEl = document.querySelector("#length-el");
const volumeEl = document.querySelector("#volume-el");
const massEl = document.getElementById("mass-el");

convertBtn.addEventListener("click", function () {
  let value = inputEl.value;
  render(value);
});

function render(n) {
  lengthEl.innerHTML = `
    <p id="length-el">${n} meters = ${roundIt(n * meter2Feet)} feet | ${n} feet = ${roundIt(n / meter2Feet)} meters</p>
    `;

  volumeEl.innerHTML = `
    <p id="volume-el">${n} liters = ${roundIt(n * litre2Gallon)} gallons | ${n} gallons = 
    ${roundIt(n / litre2Gallon)} liters</p>
    `;

  massEl.innerHTML = `
    <p id="mass-el">${n} kilos = ${roundIt(n * kilo2Pound)} pounds | ${n} pounds = ${roundIt(n / kilo2Pound)} kilos</p>
    `;
}

function roundIt(n) {
  // Math.floor converts the decimal to integer
  // And / 1000 converts it to decimal again
  return Math.floor(n * 1000) / 1000;
  //   return n.toFixed(3);
  // return Math.round(n * 1000) / 1000;
}

clearBtn.addEventListener("click", function () {
  inputEl.value = "";
  render(1);
});

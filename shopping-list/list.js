import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  set,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const inputEl = document.getElementById("input-el");
const clearInputBtn = document.querySelector(".clear-input-btn");
const addBtn = document.querySelector("#add-btn");
const listUlEl = document.getElementById("ul-el");
const clearBtn = document.querySelector("#clear-btn");

const appSettings = {
  databaseURL: "https://tasker-scrimba-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listInDB = ref(database, "list");

onValue(listInDB, function (snapshot) {
  if (snapshot.exists()) {
    let listArray = Object.entries(snapshot.val());

    render(listArray);
  } else {
    listUlEl.innerHTML = "";
  }
});

addBtn.addEventListener("click", function () {
  let currentItem = {
    name: inputEl.value,
    isCompleted: false,
  };

  push(listInDB, currentItem);

  //   listUlEl.innerHTML += `
  //         <li>${currentItem}</li>
  //     `;
  inputEl.value = "";
});

clearInputBtn.addEventListener("click", () => (inputEl.value = ""));

function render(listArray) {
  listUlEl.innerHTML = "";

  // structure of elements inside listArray
  // [id, {name: value, isCompleted: value}]

  for (let i = 0; i < listArray.length; i++) {
    let currentID = listArray[i][0];
    let currentName = listArray[i][1].name;
    let isCompleted = listArray[i][1].isCompleted;

    let newLi = document.createElement("li");

    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "item-div");
    newDiv.addEventListener("click", function () {
      let valuePathInDB = ref(database, `list/${listArray[i][0]}/isCompleted`);
      set(valuePathInDB, !isCompleted);
    });

    let newSpan = document.createElement("span");
    newSpan.setAttribute("class", "item-span");
    newSpan.textContent = currentName;

    if (isCompleted === true) {
      newSpan.classList.add("check");
    } else {
      newSpan.classList.remove("check");
    }

    newDiv.append(newSpan);
    newLi.append(newDiv);

    let newBtn = document.createElement("button");
    newBtn.setAttribute("class", "delete-btn");
    // newBtn.setAttribute("class", "material-symbols-outlined");
    newBtn.textContent = "x";
    newBtn.addEventListener("click", function () {
      let itemPathInDB = ref(database, `list/${currentID}`);
      remove(itemPathInDB);
    });
    newLi.append(newBtn);

    listUlEl.append(newLi);

    // let newLi = `
    //               <li>
    //                 <div class="item-div" id="div-${currentID}">
    //                   <span class="item-span" id="span-${currentID}">${currentName}</span>
    //                 </div>
    //                 <button id="delete-btn">X</button>
    //               </li>
    // `;

    // listUlEl.innerHTML += newLi;

    // let itemDivEl = document.getElementById(`div-${currentID}`);
    // let itemSpanEl = document.getElementById(`span-${currentID}`);
    // // let newSpanEl = document.createElement("span");
    // // newSpanEl.textContent = currentName;

    // itemDivEl.addEventListener("click", function () {
    //   console.log(currentID + currentName);
    //   let valuePathInDB = ref(database, `list/${currentID}/isCompleted`);
    //   set(valuePathInDB, !isCompleted);
    // });

    // if (isCompleted === true) {
    //   itemSpanEl.classList.add("check");
    // } else {
    //   itemSpanEl.classList.remove("check");
    // }

    // console.log(itemSpanEl);

    // itemDivEl.append(newSpanEl);
  }
}

clearBtn.addEventListener("click", function () {
  //   listUlEl.innerHTML = "";
  let pathInDB = ref(database, `list`);
  remove(pathInDB);
});

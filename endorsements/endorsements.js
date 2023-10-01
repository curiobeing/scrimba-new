import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://tasker-scrimba-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const fromEl = document.querySelector("#from-el");
const toEl = document.getElementById("to-el");
const inputEl = document.getElementById("input-el");
const clearInputsBtn = document.querySelector("#clear-input-btn");
const publishBtn = document.getElementById("publish-btn");
const clearAllBtn = document.querySelector("#clear-all-btn");
const messagesEl = document.querySelector("#messages-el");

let likedEndorsements = [];

// function to clear all the 3 input fields
function clearInputs() {
  fromEl.value = "";
  toEl.value = "";
  inputEl.value = "";
}

clearInputsBtn.addEventListener("click", () => clearInputs());

publishBtn.addEventListener("click", function () {
  let currentItem = {
    from: fromEl.value,
    to: toEl.value,
    message: inputEl.value,
    likes: 0,
  };

  push(endorsementsInDB, currentItem);

  clearInputs();
});

onValue(endorsementsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    itemsArray = itemsArray.reverse();
    render(itemsArray);
  } else {
    messagesEl.innerHTML = "";
  }
});

function render(itemsArray) {
  messagesEl.innerHTML = "";
  for (let i = 0; i < itemsArray.length; i++) {
    let currentID = itemsArray[i][0];

    let currentItem = itemsArray[i][1];

    let currentFrom = currentItem.from;
    let currentTo = currentItem.to;
    let currentMessage = currentItem.message;
    let currentLikes = currentItem.likes;

    // let newLi = document.createElement("li");
    // newLi.textContent = currentMessage;
    // messagesEl.append(newLi);
    let newEl = `
        <li>
          <p class="message-address">To ${currentTo}</p>
          <p class="message">
            ${currentMessage}
          </p>
          <div class="message-footer">
            <p class="message-address">From ${currentFrom}</p>
            <div class="action-buttons">           
              <button class="like-${currentID}" id="like-btn">
              <span class="material-icons" id="icon-btn">favorite</span>
                ${currentLikes}
              </button>
              <button class="del-${currentID} material-icons" id="delete-btn">
                delete
              </button>           
            </div>
          </div>
        </li>
    `;
    // messagesEl.innerHTML += newEl;
    messagesEl.insertAdjacentHTML("beforeend", newEl);

    let likeBtn = document.querySelector(`.like-${currentID}`);

    likeBtn.addEventListener("click", function () {
      let localData = JSON.parse(localStorage.getItem("likedEndorsements"));

      if (localData) {
        likedEndorsements = localData;
        if (likedEndorsements.includes(currentID)) {
          currentLikes -= 1;
          likedEndorsements = likedEndorsements.filter((item) => item !== currentID);
          // localStorage.setItem("likedEndorsements", JSON.stringify(likedEndorsements));
        } else {
          currentLikes += 1;
          likedEndorsements.push(currentID);
          // localStorage.setItem("likedEndorsements", JSON.stringify(likedEndorsements));
        }
      } else {
        likedEndorsements = [];
        currentLikes += 1;
        likedEndorsements.push(currentID);
        // localStorage.setItem("likedEndorsements", JSON.stringify(likedEndorsements));
      }
      localStorage.setItem("likedEndorsements", JSON.stringify(likedEndorsements));
      let pathInDB = ref(database, `endorsements/${currentID}/likes`);
      // console.log(pathInDB);
      set(pathInDB, currentLikes);
    });

    let delBtn = document.querySelector(`.del-${currentID}`);
    delBtn.addEventListener("click", function () {
      let pathInDB = ref(database, `endorsements/${currentID}`);
      remove(pathInDB);
    });
  }
}

clearAllBtn.addEventListener("click", function () {
  let pathInDB = ref(database, "endorsements");
  remove(pathInDB);
  likedEndorsements = [];
  localStorage.clear();
});

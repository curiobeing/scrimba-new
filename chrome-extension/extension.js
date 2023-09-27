const inputEl = document.getElementById("input-el");
const saveBtn = document.querySelector("#save-btn");
const saveTabBtn = document.querySelector("#saveTab-btn");
const deleteBtn = document.querySelector("#delete-btn");
const ulEL = document.querySelector("#ul-el");

let myLeads = [];
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// this is run only the first time/on page reloads, not whne the buttons are clicked
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

saveBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  inputEl.value = "";

  render(myLeads);
});

saveTabBtn.addEventListener("click", function () {
  // console.log("Save Tab btn clicked");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    myLeads.push(url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    // let activeTab = tabs[0];
    // let activeTabId = activeTab.id; // or do whatever you need
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">${leads[i]}</a>
            </li>
        `;
  }

  ulEL.innerHTML = listItems;
}

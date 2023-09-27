let messageToSendEl = document.getElementById("message-to-send");

let messageReceivedEL = document.getElementById("message-received");

let message = "";
const messageLength = 8;

function makeMessage(str) {
  if (message.length < messageLength) {
    message += str;
    messageToSendEl.textContent = message;
  }
}

function send() {
  messageToSendEl.textContent = "";
  messageReceivedEL.textContent = message;
  message = "";
}

function reset() {
  message = "";
  messageToSendEl.textContent = "";
  messageReceivedEL.textContent = "";
}

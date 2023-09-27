let homeScore = 0;
let guestScore = 0;

let homeScoreEl = document.getElementById("home-score");
let guestScoreEl = document.getElementById("guest-score");

function plus1Home() {
  homeScore += 1;
  homeScoreEl.textContent = homeScore;
}

function plus2Home() {
  homeScore += 2;
  homeScoreEl.textContent = homeScore;
}

function plus3Home() {
  homeScore += 3;
  homeScoreEl.textContent = homeScore;
}

function plus1Guest() {
  guestScore += 1;
  guestScoreEl.textContent = guestScore;
}

function plus2Guest() {
  guestScore += 2;
  guestScoreEl.textContent = guestScore;
}

function plus3Guest() {
  guestScore += 3;
  guestScoreEl.textContent = guestScore;
}

function reset() {
  homeScore = 0;
  guestScore = 0;

  homeScoreEl.textContent = homeScore;
  guestScoreEl.textContent = guestScore;
}

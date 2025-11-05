const socket = io();
let isHost = false;

const joinScreen = document.getElementById("join-screen");
const waitingScreen = document.getElementById("waiting-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const nameInput = document.getElementById("name");
const joinBtn = document.getElementById("join-btn");
const startBtn = document.getElementById("start-btn");
const waitMsg = document.getElementById("wait-msg");
const playerList = document.getElementById("players");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const leaderboardBody = document.getElementById("leaderboard");
const newQuizBtn = document.getElementById("new-quiz-btn");

joinBtn.onclick = () => {
  const name = nameInput.value.trim();
  if (!name) return alert("Please enter your name!");
  socket.emit("join", name);
};

socket.on("joined", (data) => {
  isHost = data.isHost;
  joinScreen.classList.add("hidden");
  waitingScreen.classList.remove("hidden");
  if (isHost) {
    startBtn.classList.remove("hidden");
    waitMsg.textContent = "You are the Host! Start the quiz when ready.";
  } else {
    waitMsg.textContent = "Waiting for host to start the quiz...";
  }
});

socket.on("playerList", (players) => {
  playerList.innerHTML = "";
  Object.values(players).forEach((p) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${p.name} ${p.isHost ? "(Host)" : ""} - Score: ${p.score}`;
    playerList.appendChild(li);
  });

  leaderboardBody.innerHTML = Object.values(players)
    .map(p => `<tr><td>${p.name}${p.isHost ? " 🏠" : ""}</td><td>${p.score}</td></tr>`)
    .join("");
});

startBtn.onclick = () => {
  if (isHost) socket.emit("startQuiz");
};

socket.on("quizStarted", (data) => {
  waitingScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion(data);
});

socket.on("nextQuestion", (data) => showQuestion(data));

socket.on("quizEnd", (data) => {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultEl.textContent = `Your Score: ${data.score} / ${data.total}`;
  if (isHost) newQuizBtn.classList.remove("hidden");
});

socket.on("resetQuiz", () => {
  resultScreen.classList.add("hidden");
  waitingScreen.classList.remove("hidden");
  if (isHost) {
    startBtn.classList.remove("hidden");
    waitMsg.textContent = "You are the Host! Start the quiz when ready.";
  } else {
    waitMsg.textContent = "Waiting for host to start the quiz...";
  }
});

socket.on("hostLeft", () => {
  alert("Host left. Quiz ended.");
  location.reload();
});

newQuizBtn.onclick = () => {
  socket.emit("newQuiz");
};

function showQuestion(data) {
  questionEl.textContent = `Q${data.qIndex + 1}/${data.total}: ${data.question}`;
  optionsEl.innerHTML = "";
  data.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary m-2";
    btn.textContent = opt;
    btn.onclick = () => socket.emit("answer", { qIndex: data.qIndex, answer: opt });
    optionsEl.appendChild(btn);
  });
}

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const PORT = 3000;

// Hardcoded quiz questions
const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
  { question: "Capital of France?", options: ["Paris", "London", "Berlin"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter"], answer: "Mars" },
];

let players = {}; // { id: { name, score, isHost } }
let hostId = null;
let quizStarted = false;
let currentQuestionIndex = null;

io.on("connection", (socket) => {
  console.log(`✅ ${socket.id} connected`);

  socket.on("join", (name) => {
    const isHost = hostId === null;
    if (isHost) hostId = socket.id;

    players[socket.id] = { name, score: 0, isHost };
    socket.emit("joined", { isHost, name });
    io.emit("playerList", players);

    // If quiz already started, send current question to the new player
    if (quizStarted && currentQuestionIndex !== null) {
      const q = questions[currentQuestionIndex];
      socket.emit("quizStarted", {
        question: q.question,
        options: q.options,
        qIndex: currentQuestionIndex,
        total: questions.length,
      });
    }
  });

  socket.on("startQuiz", () => {
    if (socket.id !== hostId) return;
    quizStarted = true;
    currentQuestionIndex = 0;

    // Reset all scores
    Object.values(players).forEach((p) => (p.score = 0));

    const q = questions[0];
    io.emit("quizStarted", {
      question: q.question,
      options: q.options,
      qIndex: 0,
      total: questions.length,
    });
  });

  socket.on("answer", ({ qIndex, answer }) => {
    const player = players[socket.id];
    if (!player) return;

    // Check answer
    if (questions[qIndex].answer === answer) player.score++;

    const nextIndex = qIndex + 1;
    if (nextIndex < questions.length) {
      const nextQ = questions[nextIndex];
      socket.emit("nextQuestion", {
        question: nextQ.question,
        options: nextQ.options,
        qIndex: nextIndex,
        total: questions.length,
      });
    } else {
      socket.emit("quizEnd", { score: player.score, total: questions.length });
      io.emit("playerList", players);
    }
  });

  socket.on("newQuiz", () => {
    if (socket.id !== hostId) return;
    quizStarted = false;
    currentQuestionIndex = null;
    io.emit("resetQuiz");
  });

  socket.on("disconnect", () => {
    console.log(`❌ ${socket.id} disconnected`);
    const wasHost = socket.id === hostId;
    delete players[socket.id];

    if (wasHost) {
      hostId = null;
      quizStarted = false;
      currentQuestionIndex = null;
      io.emit("hostLeft");
    }

    io.emit("playerList", players);
  });
});

server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

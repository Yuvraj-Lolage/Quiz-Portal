# 🧠 Distributed Quiz App

A **real-time multiplayer quiz** built using **Node.js**, **Express**, **Socket.IO**, and **Bootstrap 5**.

<img width="2940" height="1767" alt="image" src="https://github.com/user-attachments/assets/3564582a-f604-45c2-837b-936a8bc56d65" />

---

## 🚀 Features

- 🎮 First player becomes **Host** automatically  
- 👥 Other players wait in a **lobby** until the host starts  
- 🧠 All players get the same question simultaneously  
- 🏆 Live **leaderboard** updates automatically  
- 🔁 Host can **restart quiz** anytime after it ends  
- 💻 Clean, responsive **Bootstrap UI**

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | HTML, CSS, JavaScript, Bootstrap 5 |
| Backend | Node.js, Express.js |
| Real-time | Socket.IO |

---

## 📂 Folder Structure

distributed-quiz/
├── server.js # Node.js + Socket.IO backend
├── public/
│ ├── index.html # Frontend interface (Bootstrap UI)
│ └── client.js # Client-side Socket.IO logic
└── README.md

---

## ⚙️ Setup & Run

### 1️⃣ Install dependencies
In terminal
```bash
cd distributed-quiz
npm install express socket.io
```

### 2️⃣ Start the server
In terminal
```bash
node server.js
```

### 3️⃣ Open the app
In your browser, go to:
```bash
http://localhost:3000
```

---

🎮 How It Works

| Step             | Description                                           |
| ---------------- | ----------------------------------------------------- |
| 👤 Player 1      | Becomes **Host** automatically and can start the quiz |
| 👥 Other Players | Join and wait for the host to start                   |
| 🧠 Host Starts   | All players receive the same questions                |
| ✅ Players Answer | Each player’s score updates independently             |
| 🏁 End of Quiz   | Leaderboard shows all player scores                   |
| 🔁 Restart       | Host can start a **new quiz** anytime                 |

---

🧪 Testing Instructions

1) Open multiple tabs or browsers at http://localhost:3000.

2) The first tab becomes Host automatically.

3) Other tabs will wait in the lobby.

4) When the host clicks Start Quiz, all players see the same question.

5) Each player answers independently.

6) After the last question, all players see their score and the leaderboard.

7) The host can click Start New Quiz to restart.

## 💡 Future Enhancements

⏱️ Add question timer per round

💾 Store player results in a database (MongoDB)

🎨 Add animations or sound effects

📱 Mobile-friendly redesign

---

🧔 Author

Developed by: Yuvraj Lolage
Version: 1.0.0
Stack: Node.js + Socket.IO + Bootstrap


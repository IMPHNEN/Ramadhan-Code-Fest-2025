const apiUrl = "https://kuis-islami-api.vercel.app/api/random";

let quizData = null;
let userAnswer = null;
let score = 0;
let gameState = "submit";

document.addEventListener("DOMContentLoaded", () => {
  fetchQuiz();
  document.getElementById("actionBtn").addEventListener("click", handleButtonClick);
});

async function fetchQuiz() {
  try {
    setButtonState(true, "Memuat...");
    
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Gagal mengambil data");
    quizData = await response.json();
    displayQuestion();
  } catch (error) {
    console.error("Gagal mengambil data kuis:", error);
    document.getElementById("questionText").innerText = "Gagal memuat soal.";
    document.getElementById("options").innerHTML = `<p class="text-danger text-center">Silakan coba lagi.</p>`;
    gameState = "restart";
  } finally {
    setButtonState(false);
    updateButtonState();
  }
}

function displayQuestion() {
  if (!quizData) return;

  document.getElementById("questionText").innerText = quizData.question;
  document.getElementById("questionId").innerText = "ID Soal: " + quizData.id;
  document.getElementById("reportIssue").addEventListener("click", function() {
    window.location.href = `https://github.com/ztrdiamond/kuis-islami/issues/new?title=%F0%9F%9B%91+Kesalahan+Pada+Soal+Kuis&body=%F0%9F%9B%91+Kesalahan+pada+Soal+Kuis%0A**%F0%9F%93%8C+ID+Soal:**+${quizData.id}%0A**%E2%9D%8C+Masalah:**+%5BJelaskan+kesalahan,+misalnya+jawaban+salah,+typo,+atau+pertanyaan+tidak+jelas%5D%0A**%E2%9C%85+Saran+Perbaikan:**+%5BBerikan+saran+jawaban+atau+revisi+soal+jika+memungkinkan%5D`;
  });

  document.getElementById("options").innerHTML = quizData.choices
    .map((choice, index) => {
      const optionId = String.fromCharCode(65 + index);
      return `
        <div class="form-check d-flex align-items-center option-box choice" data-option="${optionId}">
          <input class="form-check-input d-none" type="radio" name="answer" id="option${optionId}" value="${optionId}">
          <label class="form-check-label flex-grow-1 ms-2" for="option${optionId}">${choice}</label>
          <span class="status-icon"></span>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".choice").forEach(choice => {
    choice.addEventListener("click", () => {
      document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
      choice.classList.add("selected");
    });
  });

  gameState = "submit";
  updateButtonState();
}

function handleButtonClick() {
  if (gameState === "submit") submitQuiz();
  else if (gameState === "next") fetchQuiz();
  else if (gameState === "restart") restartQuiz();
}

function submitQuiz() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) return alert("Silakan pilih jawaban!");

  userAnswer = selectedOption.value;
  const isCorrect = userAnswer === quizData.correct;
  const selectedChoice = selectedOption.closest(".choice");
  const icon = selectedChoice.querySelector(".status-icon");

  icon.innerHTML = isCorrect
    ? '<i class="fas fa-check-circle fa-xl correct"></i>'
    : '<i class="fas fa-times-circle fa-xl wrong"></i>';

  score = isCorrect ? score + 10 : 0;
  document.getElementById("score").innerText = isCorrect
    ? `Skor kamu ${score} poin!`
    : `Jawaban salah! Yang benar adalah ${quizData.correct.toUpperCase()}. Skor kamu direset!`;

  gameState = isCorrect ? "next" : "restart";
  updateButtonState();
}

function restartQuiz() {
  score = 0;
  document.getElementById("score").innerText = "Skor kamu 0 poin!";
  fetchQuiz();
}

function updateButtonState() {
  const actionBtn = document.getElementById("actionBtn");
  actionBtn.innerText =
    gameState === "submit" ? "Submit" :
    gameState === "next" ? "Lanjut" : "Mulai Ulang";
}

function setButtonState(disabled, text = "Submit") {
  const actionBtn = document.getElementById("actionBtn");
  actionBtn.disabled = disabled;
  actionBtn.innerText = text;
}
// Xử lý chấm điểm bài tập
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("exerciseForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let score = 0;

      if (parseInt(form.q1.value) === 12) score++;
      if (parseInt(form.q2.value) === 5) score++;
      if (parseInt(form.q3.value) === 18) score++;

      document.getElementById("result").innerText =
        "Bạn làm đúng " + score + "/3 câu.";
    });
  }
});

// Trò chơi Quiz
const questions = [
  { q: "7 + 5 = ?", a: "12" },
  { q: "6 × 4 = ?", a: "24" },
  { q: "15 - 9 = ?", a: "6" },
];
let current = 0;

function showQuiz() {
  if (document.getElementById("quiz-question")) {
    document.getElementById("quiz-question").innerText = questions[current].q;
  }
}
function checkQuiz() {
  const ans = document.getElementById("quiz-answer").value.trim();
  if (ans === questions[current].a) {
    document.getElementById("quiz-result").innerText = "Đúng rồi 🎉";
  } else {
    document.getElementById("quiz-result").innerText = "Sai rồi, thử lại nhé!";
  }
  current = (current + 1) % questions.length;
  setTimeout(showQuiz, 2000);
}
showQuiz();

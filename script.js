async function fetchLessons() {
  const res = await fetch("lessons.json");
  return await res.json();
}

// Load danh sách bài học
async function loadLessons(lop) {
  const data = await fetchLessons();
  const container = document.getElementById("lesson-container");
  container.innerHTML = "";
  data[lop].forEach(bai => {
    const link = document.createElement("a");
    link.href = `lesson-detail.html?lop=${lop}&bai=${bai.bai}`;
    link.textContent = `${bai.bai}. ${bai.ten}`;
    container.appendChild(link);
  });
}

// Load chi tiết bài học
async function loadLessonDetail() {
  const params = new URLSearchParams(window.location.search);
  const lop = params.get("lop");
  const bai = parseInt(params.get("bai"));
  if (!lop || !bai) return;

  const data = await fetchLessons();
  const lesson = data[lop].find(x => x.bai === bai);

  document.getElementById("lesson-title").textContent = lesson.ten;
  document.getElementById("lesson-lythuyet").textContent = lesson.lythuyet;
  document.getElementById("lesson-vidu").textContent = lesson.vidu;
}
document.addEventListener("DOMContentLoaded", loadLessonDetail);

// Bài tập đơn giản
const exercises = [
  {q: "2 + 3 = ?", a: "5"},
  {q: "6 - 2 = ?", a: "4"},
  {q: "4 × 2 = ?", a: "8"},
  {q: "12 : 3 = ?", a: "4"}
];

function renderExercises() {
  const container = document.getElementById("exercise-container");
  if (!container) return;
  exercises.forEach((ex, i) => {
    container.innerHTML += `<p>${ex.q} <input id="ex${i}"></p>`;
  });
}
function checkExercises() {
  let score = 0;
  exercises.forEach((ex, i) => {
    const ans = document.getElementById(`ex${i}`).value;
    if (ans == ex.a) score++;
  });
  document.getElementById("result").textContent = `Bạn làm đúng ${score}/${exercises.length} câu.`;
}
renderExercises();

// Quiz trắc nghiệm
const quiz = [
  {q: "Số nào lớn nhất?", options: ["5", "9", "7"], a: "9"},
  {q: "Phép nhân: 3 × 4 = ?", options: ["12", "7", "10"], a: "12"}
];

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  if (!container) return;
  quiz.forEach((q, i) => {
    let html = `<p>${q.q}</p>`;
    q.options.forEach(opt => {
      html += `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`;
    });
    container.innerHTML += html;
  });
}
function checkQuiz() {
  let score = 0;
  quiz.forEach((q, i) => {
    const ans = document.querySelector(`input[name=q${i}]:checked`);
    if (ans && ans.value === q.a) score++;
  });
  document.getElementById("quiz-result").textContent = `Kết quả: ${score}/${quiz.length}`;
}
renderQuiz();


// 要素取得
const input = document.getElementById("answer");
const sendBtn = document.getElementById("sendBtn");
const resetBtn = document.getElementById("resetBtn");

const answerSection = document.getElementById("answerSection");
const successSection = document.getElementById("successSection");
const errorMessage = document.getElementById("errorMessage");

// 正解
const CORRECT_ANSWER = "UNPOT";

// 送信ボタン
sendBtn.addEventListener("click", checkAnswer);

// Enterキー対応
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// 取り消し
resetBtn.addEventListener("click", () => {
  input.value = "";
  errorMessage.textContent = "";
});

// 今のステージ番号
const stageIndex = 3;

// 判定処理
function checkAnswer() {

  const userAnswer = input.value.trim().toUpperCase();

  if (userAnswer === CORRECT_ANSWER) {
    // クリア状態保存
    sessionStorage.setItem(`clear_${stageIndex}`, "true");

    // 入力部分を隠す
    answerSection.style.display = "none";

    // 正解表示
    successSection.classList.remove("hidden");

  } else {

    // 不正解表示
    errorMessage.textContent = "違うみたい…";
  }
}
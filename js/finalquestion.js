// 要素取得
const input = document.getElementById("answer");
const sendBtn = document.getElementById("sendBtn");
const resetBtn = document.getElementById("resetBtn");

const answerSection = document.getElementById("answerSection");
const errorMessage = document.getElementById("errorMessage");

// 正解
const CORRECT_ANSWER = "西堀ローサ";

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
const stageIndex = 1;

// 判定処理
function checkAnswer() {

  const userAnswer = input.value.trim();

  // 表記ゆれ対策（ひらがな・カタカナ・大文字小文字）
  const normalizedAnswer = userAnswer
    .replace(/\s+/g, "")
    .toUpperCase();

  const correct = CORRECT_ANSWER.toUpperCase();

  if (normalizedAnswer === correct) {

    // クリア状態保存
    sessionStorage.setItem(`clear_${stageIndex}`, "true");

    // 軽い演出（0.5秒後に遷移）
    setTimeout(() => {
      window.location.href = "end.html";
    }, 200);

  } else {
    errorMessage.textContent = "違うみたい…";
  }
}
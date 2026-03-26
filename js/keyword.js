// ========================================
// クイズ共通スクリプト（quiz1-4統合）
// ========================================

// クイズの正解マッピング
const quizAnswers = {
  quiz1: "NEXT21",
  quiz2: "古町ルフル広場",
  quiz3: "古町5番町",
  quiz4: "UNPOT"
};

// 現在のページから正解を判定する関数
function getCurrentQuizAnswer() {
  const page = window.location.pathname.split('/').pop().replace('.html', '');
  return quizAnswers[page] || null;
}

// ========================================
// クイズ関連の初期化
// ========================================

// ページ読み込み時にクイズ要素が存在するか確認
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById("answer");
  
  // クイズページの場合のみ実行
  if (input) {
    initializeQuiz();
  }
  
  // アクセントラインの回転機能の初期化
  initializeAccentLine();
});

// クイズ機能の初期化
function initializeQuiz() {
  const input = document.getElementById("answer");
  const sendBtn = document.getElementById("sendBtn");
  const resetBtn = document.getElementById("resetBtn");
  const answerSection = document.getElementById("answerSection");
  const successSection = document.getElementById("successSection");
  const errorMessage = document.getElementById("errorMessage");
  
  const CORRECT_ANSWER = getCurrentQuizAnswer();
  
  if (!CORRECT_ANSWER) {
    console.warn("正解が設定されていません");
    return;
  }

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

  // 判定処理
  function checkAnswer() {
    const userAnswer = input.value.trim().toUpperCase();

    if (userAnswer === CORRECT_ANSWER) {
      // クイズインデックス取得
      const page = window.location.pathname.split('/').pop().replace('.html', '');
      const quizIndex = parseInt(page.replace('quiz', '')) - 1;

      // クリア状態保存
      sessionStorage.setItem(`clear_${quizIndex}`, "true");

      // 入力部分を隠す
      answerSection.style.display = "none";

      // 正解表示
      successSection.classList.remove("hidden");
    } else {
      // 不正解表示
      errorMessage.textContent = "違うみたい…";
    }
  }
}

// ========================================
// アクセントライン（チェックマーク）回転機能
// ========================================

function initializeAccentLine() {
  const accentLine = document.querySelector('.accent-line');
  
  if (!accentLine) return;
  
  let isSpinning = false;
  
  accentLine.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!isSpinning) {
      // 回転開始
      accentLine.classList.add('spinning');
      isSpinning = true;
    } else {
      // 回転停止
      accentLine.classList.remove('spinning');
      isSpinning = false;
    }
  });
}

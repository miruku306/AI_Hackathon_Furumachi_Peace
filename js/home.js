// 要素取得
const stages = document.querySelectorAll(".stage");
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const keywordList = document.getElementById("keywordList");
const finalStage = document.getElementById("final-quiz");
const GAME_VERSION = "1.0";

// 🍔 ハンバーガー
hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// データ仕様が変わるとき自動リセット（初期化処理）
const initGame = () => {
    const savedVersion = sessionStorage.getItem("game_version");

    if (savedVersion !== GAME_VERSION) {
        sessionStorage.clear();
        sessionStorage.setItem("game_version", GAME_VERSION);
    }
};

initGame();

// 🔥 状態読み込み
const loadState = () => {
    stages.forEach((stage, index) => {
        const isClear = sessionStorage.getItem(`clear_${index}`);

        if (isClear === "true") {
            stage.classList.add("clear");
            stage.querySelector(".status").textContent = "クリア";
        } else {
            stage.classList.remove("clear");
            stage.querySelector(".status").textContent = "🔒";
        }
    });
};

// 🔑 キーワード読み込み
const loadKeywords = () => {
    keywordList.innerHTML = "";

    stages.forEach((_, index) => {
        const keyword = sessionStorage.getItem(`keyword_${index}`);

        if (keyword) {
            const li = document.createElement("li");
            li.textContent = keyword;
            keywordList.appendChild(li);
        }
    });
};

// 🧩 ステージクリック（全ステージ押せる）
stages.forEach((stage, index) => {
    stage.addEventListener("click", () => {
        location.href = `quiz${index + 1}.html`;
    });
});

const checkFinalStage = () => {
    let allClear = true;

    // 謎1～4をチェック
    for (let i = 0; i < 4; i++) {
        const isClear = sessionStorage.getItem(`clear_${i}`);
        if (isClear !== "true") {
            aallClear = false;
            break;
        }
    }

    if (allClear) {
        finalStage.style.display = "flex"; // 表示
        // 最終問題クリック処理
        finalStage.addEventListener("click", () => {
            location.href = "quiz5.html";
        });
    } else {
        finalStage.style.display = "none"; //非表示
    }
}


// 初期化
initGame();
// 状態読み込み
loadState();
loadKeywords();
checkFinalStage();
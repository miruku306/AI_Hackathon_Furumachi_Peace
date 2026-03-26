// 要素取得
const stages = document.querySelectorAll(".stage");
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const keywordList = document.getElementById("keywordList");
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

// 初期化
initGame();
// 状態読み込み
loadState();
loadKeywords();
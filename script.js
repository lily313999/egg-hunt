const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const prevSceneButton = document.getElementById("prev-scene");
const nextSceneButton = document.getElementById("next-scene");

let score = 0;
let currentScene = 0;
const foundEggs = [[], [], []]; // 記錄已找到的彩蛋
const totalEggs = 15; // 總共有 15 顆彩蛋（普通+特殊）
let gameOver = false; // 紀錄遊戲是否已結束

// 彩蛋資料（包含特殊彩蛋）
const sceneEggData = [
    [
        { x: 10, y: 5, img: ["images/egg1.png"] },
        { x: 60, y: 15, img: ["images/egg2.png"] },
        { x: 20, y: 30, img: ["images/special1-1.png", "images/special1-2.png", "images/special1-3.png"] }, // 特殊彩蛋
        { x: 70, y: 40, img: ["images/egg4.png"] },
        { x: 30, y: 55, img: ["images/egg5.png"] }
    ],
    [
        { x: 15, y: 10, img: ["images/egg6.png"] },
        { x: 40, y: 25, img: ["images/special2-1.png", "images/special2-2.png", "images/special2-3.png"] }, // 特殊彩蛋
        { x: 70, y: 50, img: ["images/egg8.png"] },
        { x: 50, y: 65, img: ["images/egg9.png"] },
        { x: 85, y: 75, img: ["images/egg10.png"] }
    ],
    [
        { x: 5, y: 20, img: ["images/special3-1.png", "images/special3-2.png", "images/special3-3.png"] }, // 特殊彩蛋
        { x: 55, y: 35, img: ["images/egg12.png"] },
        { x: 35, y: 50, img: ["images/egg13.png"] },
        { x: 75, y: 60, img: ["images/egg14.png"] },
        { x: 25, y: 80, img: ["images/egg15.png"] }
    ]
];

// **重新載入場景（移除已找到的彩蛋）**
function loadScene(sceneIndex) {
    if (gameOver) return; // 遊戲結束時不再顯示彩蛋

    gameArea.innerHTML = ""; 

    sceneEggData[sceneIndex].forEach((eggData, index) => {
        if (!foundEggs[sceneIndex].includes(index)) {
            createEgg(eggData, sceneIndex, index);
        }
    });
}

// **創建彩蛋（普通 & 特殊）**
function createEgg(eggData, sceneIndex, eggIndex) {
    const egg = document.createElement("div");
    egg.classList.add("egg");

    const eggImg = document.createElement("img");
    eggImg.src = eggData.img[0]; 
    eggImg.alt = "彩蛋";

    egg.appendChild(eggImg);
    egg.style.left = `${eggData.x}%`;
    egg.style.top = `${eggData.y}%`;

    let clickCount = 0;

    egg.addEventListener("click", () => {
        if (eggData.img.length === 1) {
            // **普通彩蛋**
            egg.remove();
            score++;
            foundEggs[sceneIndex].push(eggIndex);
        } else {
            // **特殊彩蛋（點 3 次）**
            clickCount++;
            if (clickCount < 3) {
                eggImg.src = eggData.img[clickCount];
            } else {
                egg.remove();
                score++;
                foundEggs[sceneIndex].push(eggIndex);
            }
        }

        scoreDisplay.textContent = score;
        checkGameOver();
    });

    gameArea.appendChild(egg);
}

// **檢查遊戲是否結束**
function checkGameOver() {
    if (score >= totalEggs) {
        showGameOverScreen();
    }
}

// **顯示遊戲結束畫面**
function showGameOverScreen() {
    gameOver = true;
    gameArea.innerHTML = ""; // 清除所有彩蛋

    const gameOverDiv = document.createElement("div");
    gameOverDiv.classList.add("game-over");

    const gameOverImg = document.createElement("img");
    gameOverImg.src = "images/game-over.png"; 
    gameOverImg.alt = "遊戲結束";

    gameOverDiv.appendChild(gameOverImg);
    gameArea.appendChild(gameOverDiv);

    // 點擊遊戲結束畫面，重置遊戲
    gameOverDiv.addEventListener("click", resetGame);
}

// **重置遊戲**
function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    currentScene = 0;
    gameOver = false;

    foundEggs[0] = [];
    foundEggs[1] = [];
    foundEggs[2] = [];

    loadScene(currentScene);
}

// **場景切換**
prevSceneButton.addEventListener("click", () => {
    if (!gameOver) {
        currentScene = (currentScene > 0) ? currentScene - 1 : sceneEggData.length - 1;
        loadScene(currentScene);
    }
});

nextSceneButton.addEventListener("click", () => {
    if (!gameOver) {
        currentScene = (currentScene < sceneEggData.length - 1) ? currentScene + 1 : 0;
        loadScene(currentScene);
    }
});

// **初始化遊戲**
window.onload = function() {
    loadScene(currentScene);
};

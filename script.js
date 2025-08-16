let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let gameActive = true;
let scores = { x: 0, o: 0, draws: 0 };

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Create turn indicator
const turnIndicator = document.createElement('div');
turnIndicator.className = 'turn-indicator';
turnIndicator.innerHTML = `Current Turn: <span class="turn-x">Player X</span>`;
document.body.appendChild(turnIndicator);

// Create scoreboard
const scoreboard = document.createElement('div');
scoreboard.className = 'scoreboard';
scoreboard.innerHTML = `
    <div class="score-item">
        <span class="score-x">Player X:</span>
        <span id="score-x">0</span>
    </div>
    <div class="score-item">
        <span class="score-o">Player O:</span>
        <span id="score-o">0</span>
    </div>
    <div class="score-item">
        <span class="score-draw">Draws:</span>
        <span id="score-draws">0</span>
    </div>
`;
document.body.appendChild(scoreboard);

// Sound effects (using Web Audio API for better browser compatibility)
const playSound = (frequency, duration = 200) => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        // Fallback for browsers that don't support Web Audio API
        console.log('Audio not supported');
    }
};

// Update turn indicator
const updateTurnIndicator = () => {
    const currentPlayer = turnX ? 'X' : 'O';
    const className = turnX ? 'turn-x' : 'turn-o';
    turnIndicator.innerHTML = `Current Turn: <span class="${className}">Player ${currentPlayer}</span>`;
};

// Update scoreboard
const updateScoreboard = () => {
    document.getElementById('score-x').textContent = scores.x;
    document.getElementById('score-o').textContent = scores.o;
    document.getElementById('score-draws').textContent = scores.draws;
};

// Add click animation
const addClickAnimation = (box) => {
    box.classList.add('clicked');
    setTimeout(() => {
        box.classList.remove('clicked');
    }, 300);
};

// Create confetti effect
const createConfetti = () => {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#ffd700', '#45b7d1'][Math.floor(Math.random() * 4)];
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
};

// Highlight winning combination
const highlightWinningCombination = (combination) => {
    combination.forEach(index => {
        boxes[index].classList.add('winning-line');
    });
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerHTML === "" && gameActive) {
            // Add click animation and sound
            addClickAnimation(box);
            playSound(turnX ? 800 : 600);
            
            if (turnX) {
                box.innerHTML = "X";
                box.classList.add('x-mark');
            } else {
                box.innerHTML = "O";
                box.classList.add('o-mark');
            }
            
            turnX = !turnX;
            updateTurnIndicator();
            checkWinner();
        }
    });
    
    // Add hover sound effect
    box.addEventListener("mouseenter", () => {
        if (box.innerHTML === "" && gameActive) {
            playSound(400, 100);
        }
    });
});

const resetGame = () => {
    turnX = true;
    gameActive = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnIndicator();
    
    // Remove winning line highlights
    boxes.forEach(box => {
        box.classList.remove('winning-line');
    });
    
    playSound(300, 150);
};

const disableBoxes = () => {
    gameActive = false;
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    gameActive = true;
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
        box.classList.remove('x-mark', 'o-mark');
    }
};

const showWinner = (winner, winningCombination = null) => {
    let player = winner === "X" ? "Player X" : "Player O";
    
    if (winner === "draw") {
        msg.innerHTML = `🤝 It's a Draw! 🤝<br><small>Great game, try again!</small>`;
        scores.draws++;
        playSound(500, 500);
    } else {
        msg.innerHTML = `🎉 ${player} Wins! 🎉<br><small>Congratulations!</small>`;
        scores[winner.toLowerCase()]++;
        
        // Highlight winning combination
        if (winningCombination) {
            highlightWinningCombination(winningCombination);
        }
        
        // Create confetti effect
        createConfetti();
        
        // Play victory sound
        playSound(800, 200);
        setTimeout(() => playSound(1000, 200), 200);
        setTimeout(() => playSound(1200, 300), 400);
    }
    
    updateScoreboard();
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const drawGame = () => {
    let draw = true;
    for (let box of boxes) {
        if (box.innerHTML === "") {
            draw = false;
            break;
        }
    }
    if (draw && gameActive) {
        showWinner("draw");
    }
};

const checkWinner = () => {
    for (let pattern of winningCombinations) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (
            pos1Value !== "" &&
            pos1Value === pos2Value &&
            pos2Value === pos3Value &&
            gameActive
        ) {
            showWinner(pos1Value, pattern);
            return;
        }
    }
    drawGame();
};

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '9' && gameActive) {
        const index = parseInt(e.key) - 1;
        if (boxes[index].innerHTML === "") {
            boxes[index].click();
        }
    }
    
    if (e.key === 'r' || e.key === 'R') {
        resetGame();
    }
});

// Add button click sounds
reset.addEventListener("click", () => {
    playSound(400, 200);
    resetGame();
});

newGameBtn.addEventListener("click", () => {
    playSound(400, 200);
    resetGame();
});

// Initialize the game
updateTurnIndicator();
updateScoreboard();

// Add some initial animation delay to boxes
boxes.forEach((box, index) => {
    box.style.animationDelay = `${index * 0.1}s`;
});

// Add welcome message
setTimeout(() => {
    if (gameActive && Array.from(boxes).every(box => box.innerHTML === "")) {
        console.log("🎮 Welcome to Enhanced Tic Tac Toe!");
        console.log("💡 Tips:");
        console.log("   • Use number keys 1-9 to play");
        console.log("   • Press 'R' to reset the game");
        console.log("   • Hover over boxes for sound effects");
        console.log("   • Enjoy the animations and effects!");
    }
}, 1000);
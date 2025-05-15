let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;   // Variable to track the current turn (true for X, false for O)

const winningCombinations = [   // All possible winning combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {    // Add event listener to each box
    box.addEventListener("click", () => {   // When a box is clicked
        if (box.innerHTML === "") {
            if (turnX) {
                box.innerHTML = "X";
                box.style.color = "#F93D3D";   // X will be blue
            } else {
                box.innerHTML = "O";
                box.style.color = "#3C8BE6";    // O will be red
            }
            turnX = !turnX;
            checkWinner();
        };
    });
});


const resetGame = () => {   // Function to reset the game
    turnX = true;   // Reset the turn to X
    enableBoxes();   // Enable all boxes
    msgContainer.classList.add("hide");   // Hide the message container
};



const disableBoxes = () => {   // Function to disable all boxes
    for (let box of boxes) {   // Loop through each box
        box.disabled = true;   // Disable the box
    };
};



const enableBoxes = () => {         // Function to enable all boxes
    for (let box of boxes) {       // Loop through each box
        box.disabled = false;     // Enable the box
        box.innerHTML = "";      // Clear the inner HTML of the box
    };
};



const showWinner = (winner) => {   // Function to show the winner
    let player = winner === "X" ? "Player 1" : "Player 2";
    msg.innerText = `Congratulations, ${player} wins!`;   // Show which player wins
    msgContainer.classList.remove("hide");   // Remove the hide class from the message container
    disableBoxes();   // Disable all boxes
};



const drawGame = () => {   // Function to check for a draw
    let draw = true;   // Variable to track if the game is a draw
    for (let box of boxes) {   // Loop through each box
        if (box.innerHTML === "") {   // If any box is empty
            draw = false;   // Set draw to false
            break;   // Break the loop
        };
    };
    if (draw) {   // If the game is a draw
        msg.innerText = "Game Draw.. Try Again";   // Set the message to show a draw
        msgContainer.classList.remove("hide");   // Remove the hide class from the message container
        disableBoxes();   // Disable all boxes
    };
};



const checkWinner = () => {   // Function to check for a winner
    for (let pattern of winningCombinations) {   // Loop through each winning combination

        let pos1Value = boxes[pattern[0]].innerText;   // Get the inner HTML of the first box in the combination
        let pos2Value = boxes[pattern[1]].innerText;   // Get the inner HTML of the second box in the combination
        let pos3Value = boxes[pattern[2]].innerText;   // Get the inner HTML of the third box in the combination

        if (
            pos1Value !== "" &&             // Check if the first box is not empty
            pos1Value === pos2Value &&      // Check if the first box has the same value as the second box
            pos2Value === pos3Value         // Check if the second box has the same value as the third box
        ) {
            showWinner(pos1Value);   // Show the winner
        };
        drawGame();   // Check for a draw
    };
};



newGameBtn.addEventListener("click", resetGame);   // Add event listener to the new game button
reset.addEventListener("click", resetGame);   // Add event listener to the reset button
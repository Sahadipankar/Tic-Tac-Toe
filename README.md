# 🎮 Tic Tac Toe Game

A modern, interactive Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript. Experience the classic game with a sleek design and smooth gameplay!

## 🌟 Live Demo

🔗 **Play Now:** [https://tictactoe0406.netlify.app/](https://tictactoe0406.netlify.app/)

## ✨ Features

- 🎯 **Interactive Gameplay** - Click to place X's and O's
- 🏆 **Winner Detection** - Automatically detects wins and draws
- 🎨 **Modern UI** - Clean, responsive design with glowing effects
- 🔄 **Game Reset** - Reset or start new games instantly
- 📱 **Mobile Friendly** - Responsive design works on all devices
- ⚡ **Fast Performance** - Built with vanilla JavaScript for optimal speed

## 🎮 How to Play

1. The game starts with Player X
2. Click on any empty square to place your mark
3. Players alternate turns (X and O)
4. First player to get 3 marks in a row (horizontally, vertically, or diagonally) wins!
5. If all squares are filled with no winner, it's a draw
6. Use the "Reset Game" button to start over or "New Game" after a win/draw

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6+)** - Game logic and interactivity

## 🎨 Design Features

- **Dark Theme** - Modern black background with cyan accents
- **Glowing Effects** - Box shadows and hover states for visual appeal
- **Responsive Layout** - Uses viewport units (vmin) for consistent sizing
- **Typography** - Courier New font for a retro-tech aesthetic
- **Color Coding** - Red X's and Blue O's for easy distinction

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tic-tac-toe
   ```
3. Open `index.html` in your web browser

### Or simply download and run locally:
1. Download all files (`index.html`, `style.css`, `script.js`)
2. Keep them in the same folder
3. Double-click `index.html` to open in your browser

## 📁 Project Structure

```
tic-tac-toe/
│
├── index.html          # Main HTML structure
├── style.css           # CSS styles and animations
├── script.js           # Game logic and functionality
└── README.md           # Project documentation
```

## 🎯 Game Logic

The game implements:

- **Turn Management** - Alternates between X and O players
- **Win Detection** - Checks all 8 possible winning combinations:
  - 3 horizontal rows
  - 3 vertical columns  
  - 2 diagonal lines
- **Draw Detection** - Identifies when all squares are filled
- **Game State Management** - Enables/disables squares appropriately

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
- Game board colors: `.box` background and box-shadow
- Player colors: `script.js` - modify the color styles for X and O
- Background: `body` background-color

### Modifying Game Rules
Edit `script.js`:
- `winningCombinations` array for different win conditions
- Turn logic in the click event listener
- Winner display messages in `showWinner()` function

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available.

## 🙏 Acknowledgments

- Classic Tic Tac Toe game concept
- Modern web development practices
- Responsive design principles

## 📞 Contact

Feel free to reach out if you have any questions or suggestions!

---

⭐ **Star this repository if you enjoyed the game!** ⭐
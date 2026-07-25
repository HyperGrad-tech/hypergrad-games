const fs = require('fs');
const path = require('path');

const gamesDir = '/Users/lingjingwei/Documents/超维梯度/hypergrad-games/games';

const games = {
  '2048': { title: '2048', desc: 'Slide tiles to combine numbers and reach 2048 in this addictive puzzle game.', genre: 'Puzzle' },
  'snake': { title: 'Snake', desc: 'Eat food, grow longer, and avoid crashing in the classic Snake game.', genre: 'Arcade' },
  'tetris': { title: 'Tetris', desc: 'Stack falling blocks, clear lines, and chase the high score in Tetris.', genre: 'Arcade' },
  'minesweeper': { title: 'Minesweeper', desc: 'Use logic and deduction to clear the minefield in Minesweeper.', genre: 'Puzzle' },
  'sudoku': { title: 'Sudoku', desc: 'Fill the 9x9 grid with numbers 1-9 in this classic Sudoku puzzle.', genre: 'Puzzle' },
  'wordle': { title: 'Wordle', desc: 'Guess the hidden 5-letter word in 6 tries with color hints.', genre: 'Puzzle' },
  'memory': { title: 'Memory Match', desc: 'Flip cards and find all matching pairs in Memory Match.', genre: 'Puzzle' },
  'tic-tac-toe': { title: 'Tic-Tac-Toe', desc: 'Play Tic-Tac-Toe against an unbeatable AI using minimax algorithm.', genre: 'Strategy' },
  'connect4': { title: 'Connect Four', desc: 'Drop discs and get four in a row against an AI opponent.', genre: 'Strategy' },
  'sliding-puzzle': { title: 'Sliding Puzzle', desc: 'Arrange tiles in order from 1 to 15 in this classic sliding puzzle.', genre: 'Puzzle' },
  'breakout': { title: 'Breakout', desc: 'Bounce the ball, break all bricks, and clear every level in Breakout.', genre: 'Arcade' },
  'flappy': { title: 'Flappy Bird', desc: 'Tap to fly through pipes and beat your high score in Flappy Bird.', genre: 'Arcade' },
  'simon': { title: 'Simon Says', desc: 'Watch the color sequence and repeat it back in Simon Says memory game.', genre: 'Memory' },
  'whack-a-mole': { title: 'Whack-a-Mole', desc: 'Hit moles before they hide back in their holes in Whack-a-Mole.', genre: 'Reflex' },
  'reaction-test': { title: 'Reaction Time Test', desc: 'Test your reaction speed. Click as fast as you can when the screen turns green.', genre: 'Reflex' }
};

for (const [filename, info] of Object.entries(games)) {
  const filepath = path.join(gamesDir, `${filename}.html`);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Skip if already has JSON-LD
  if (content.includes('application/ld+json')) {
    console.log(`Skipping ${filename} (already has schema)`);
    continue;
  }
  
  const schema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "${info.title}",
    "description": "${info.desc}",
    "url": "https://games.hypergrad.cn/games/${filename}.html",
    "genre": "${info.genre}",
    "gamePlatform": "Web Browser",
    "applicationCategory": "Game",
    "operatingSystem": "Any (Web Browser)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HyperGrad"
    }
  }
  </script>
</head>`;
  
  content = content.replace('</head>', schema);
  fs.writeFileSync(filepath, content);
  console.log(`Added schema to ${filename}`);
}

console.log('Done!');

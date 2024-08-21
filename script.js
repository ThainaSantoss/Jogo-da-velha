// initial data
let square = {
    a1: '' , a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1:'', c2: '', c3: ''
};

let player = '';
// winner variable
let warning = '';
// if the game is running
let playing = false;
// Indicates whether the game is in progress.


reset();

// events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick);
})

// functions

function renderSquare() {
  for(let i in square) {
      let item = document.querySelector(`div[data-item=${i}]`)
     item.innerHTML = square[i];
  }
  checkGame(); // check the game status after each move.

}

function renderInfo() { // Updates information in the user interface, showing whose turn it is.
      document.querySelector('.vez').innerHTML = player;
      document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer(){
 player = (player ==='x') ? 'o' : 'x';
 renderInfo();
}

function checkGame() {
  let winner = checkWinnerFor('x');
  if(winner) {
    warning = 'O "x" venceu';
    playing = false;
    drawLine(winner);
  } else {
    winner = checkWinnerFor('o');
    if(winner) {
      warning = 'O "o" venceu';
      playing = false;
      drawLine(winner);
    } else if(isFull()) {
      warning = 'Deu empate';
      playing = false;
    }
  }
}
function checkWinnerFor(player) { // sequencias
    let pos = [
      'a1,a2,a3',
      'b1,b2,b3',
      'c1,c2,c3',

      'a1,b1,c1',
      'a2,b2,c2',
      'a3,b3,c3',

      'a1,b2,c3',
      'a3,b2,c1'
    ];

    for(let w in pos) {
      let pArray = pos[w].split(','); //a1,a2,a3
      let hasWon = pArray.every(option => square[option] === player);
      if(hasWon) {
        return pArray; // // Returns to winning positions
      } 
    }
    return null; 
}

function drawLine(positions) {
  // class to highlight winning cells
  positions.forEach(pos => {
    document.querySelector(`div[data-item=${pos}]`).classList.add('winner');

  });
}

function isFull() { // Check if all cells on the board are filled.
  for( let i in square) {
    if(square[i]  === '') {
      return false; 
    }
  }

  return true;
}

function itemClick(event) {
    let item = event.target.getAttribute('data-item')
    if(playing && square[item]=== ''){
      square[item] = player;
      renderSquare();
      togglePlayer()

    }

}

function reset() {
    warning = '';

    document.querySelectorAll('.item').forEach(item => {
      item.classList.remove('winner');
  });

    let random = Math.floor(Math.random() * 2); // random number and then it will be rounded
    player = (random === 0 ) ? 'x' : 'o'

  for(let i in square) {
    square[i] = '';
  }


  playing = true;


  renderSquare();
  renderInfo();

 
}



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
  if(checkWinnerFor('x')){
    warning = 'O "x" venceu';
    playing = false;
  } else if(checkWinnerFor('o')){
    warning = 'O "o" venceu';
    playing = false;
  } else if(isFull()) {
    warning = 'Deu empate';
    playing = false;
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
    let hasWon =  pArray.every(option => square[option] === player);
    if(hasWon) {
      return true;
    } 
    
    }
      return false
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

    let random = Math.floor(Math.random() * 2); // numero aleatorio e depois vai arredondar
    player = (random === 0 ) ? 'x' : 'o'

  for(let i in square) {
    square[i] = '';
  }


  playing = true;


  renderSquare();
  renderInfo();

 
}



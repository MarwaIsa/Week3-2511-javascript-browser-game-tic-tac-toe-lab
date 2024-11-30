
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

  ]

  let squareIndex 

/*---------------------------- Variables (state) ----------------------------*/

let board 
let turn 
let winner 
let tie 
let oWin = 0
let xWin = 0
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr"); 
const messageEl = document.querySelector("#message");
const boardEl = document.querySelector(".board");
const bodyElement = document.querySelector("body")
// console.log(squareEls)
// console.log(messageEl)

/*------------------------ create Element ------------------------*/

const plyAgnBtnEl = document.createElement('Button');
plyAgnBtnEl.textContent = "Play Again";
boardEl.appendChild(plyAgnBtnEl)
plyAgnBtnEl.style.color = 'red'

const resetBtnEl = document.createElement('Button');
resetBtnEl.textContent = "Reset";
boardEl.appendChild(resetBtnEl)
resetBtnEl.style.color = 'red'

const oScoreH3El  = document.createElement('h3');
oScoreH3El.textContent = `Player(O) =  ${oWin}`;
boardEl.appendChild(oScoreH3El)
oScoreH3El.style.marginLeft = '20px';

const xScoreH3El  = document.createElement('h3');
xScoreH3El.textContent = `Player(X) =  ${xWin}`;
boardEl.appendChild(xScoreH3El)
xScoreH3El.style.marginLeft = '30px';



/*-------------------------------- Functions --------------------------------*/
board= ['','','','','','','','',''];

const init = ()=> {
    
    turn = 'X';
    winner = false; 
    tie =  false;

    console.log(board)
    console.log(turn)
    console.log(winner)
    console.log(tie)

    render()

}

const render = ()=>{
    updateMessage()
}


console.log(squareEls)

function updateMessage() {
    if (tie === false && winner === false) {
        messageEl.textContent = `It's your turn ${turn}!`
        messageEl.style.color='black'
        oScoreH3El.style.color='black'
        xScoreH3El.style.color='black'

    }
    else if (tie === true && winner === false) {
        messageEl.textContent = `It's your tie!`
        messageEl.style.color='black'
        oScoreH3El.style.color='black'
        xScoreH3El.style.color='black'
    }
    else{
      if (turn == "X") {
        messageEl.textContent = `Congrats, Player O you win!`
        oWin += 1
        oScoreH3El.textContent = `Player(O) = ${oWin}`;
        //console.log (`oWin ${oWin}`)
        messageEl.style.color='green'
        oScoreH3El.style.color='green'
        xScoreH3El.style.color='red'

      }
      else{
        messageEl.textContent = `Congrats, Player X you win!`
        xWin += 1
        xScoreH3El.textContent = `Player(X) = ${xWin}`;
       //console.log (`xWin ${xWin}`)
       messageEl.style.color='green'
       xScoreH3El.style.color='green'
       oScoreH3El.style.color='red'



      }
    }
    
}

function handleClick(event) {
    //  event.target.textContent = board[event.target.id]
     //board[event.target.id] = "X"
     if (winner == true) {
      return; // return nothing or exit the game
    }

    // Switch turns 
     if (board[event.target.id] == '' && turn =='X') {
        board[event.target.id] = "X"
        turn = "O"
     } 
     else if (board[event.target.id] == '' && turn =='O') {
        board[event.target.id] = "O"
        turn = "X"
     }

//console.log(board)
checkForWinner()
checkForTie()
render()
//switchPlayerTurn()
}



function checkForWinner() {
  //console.log(`checkForWinner ${winner}`)
  if (board[0] == board[1] && board[0] == board[2] && board[0] !== '') {
    winner = true 
  //console.log(`checkForWinner ${winner}`)
  }  
  else if (board[3] == board [4] && board[3] == board[5] && board[3] !== '') {
    winner = true 
  }
  else if (board[6] == board [7] && board[6] == board[8] && board[6] !== '') {
    winner = true 
  } 
  else if (board[0] == board [3] && board[0] == board[6] && board[0] != '') {
    winner = true 
  } 
  else if (board[1] == board [4] && board[1] == board[7] && board[1] !== '') {
    winner = true 
  } 
  else if (board[2] == board [5] && board[2]== board[8] && board[2] !== '') {
    winner = true 
  }   
  else if (board[0] == board [4] && board[0]== board[8] && board[0]!== '') {
    winner = true 
  }  
  else if (board[2] == board [4] && board[2]== board[6] && board[2] !=='') {
    winner = true 
  } 
}


function checkForTie() {
  board.forEach(eachBoard => {
    if (eachBoard == "" || winner == true) {
        tie = false
        console.log(`checkForTie ${tie}`)
        console.log(`winner  ${winner}`)


    }
    else {
        tie = true
        console.log(`checkForTie ${tie}`)

    }
  });
}


/*function switchPlayerTurn() {
    if (winner == false && turn == 'X') {
        turn = 'O'
        console.log(`switchPlayerTurn ${turn}`)
    }
    else if (winner == false && turn == 'O') {
        turn = 'X'
        console.log(`switchPlayerTurn ${turn}`)
    }
    
}*/
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((eachSquareEls,index)  => {
    eachSquareEls.textContent = board[index]

    eachSquareEls.addEventListener("click", (event) => {
        handleClick(event)
        console.log(board)
        eachSquareEls.textContent = board[event.target.id]
    })

    if(winner == true)

      eachSquareEls.addEventListener("click", (event) => {
        handleClick(event)
        console.log(board)
        eachSquareEls.textContent = board[event.target.id]
    })
});

plyAgnBtnEl.addEventListener("click",()=>{
  console.log(`Reset`)
  board= ['','','','','','','','',''];
  squareEls.forEach((eachSquareEls)  => {

    eachSquareEls.textContent = ''
  })
  
  init()  
})

resetBtnEl.addEventListener("click",()=>{
  console.log(`Reset`)
  board= ['','','','','','','','',''];
  oWin = 0
  xWin = 0
  squareEls.forEach((eachSquareEls)  => {
    eachSquareEls.textContent = ''
  })
  oScoreH3El.textContent = `Player(O) = ${oWin}`;
  xScoreH3El.textContent = `Player(O) = ${oWin}`;

  init()
})
//console.log(squareIndex)

init()

/*---------------------------- Style  ----------------------------*/
boardEl.prepend(oScoreH3El);
boardEl.prepend(xScoreH3El);


plyAgnBtnEl.style.color = 'white';
plyAgnBtnEl.style.backgroundColor = '#616161'; // Bootstrap-like blue
plyAgnBtnEl.style.padding = '10px 20px';
plyAgnBtnEl.style.borderRadius = '5px';

plyAgnBtnEl.style.margin = '10px 5px 5px 30px'; // Set margins


resetBtnEl.style.color = 'white';
resetBtnEl.style.backgroundColor = '#616161'; // Bootstrap-like red
resetBtnEl.style.padding = '10px 20px';
resetBtnEl.style.margin = '10px 5px 5px 50px'; // Set margins
resetBtnEl.style.borderRadius = '5px';

const start = document.querySelector(".start-game");
const levels = document.querySelectorAll(".options-side_level input");
const colors = document.querySelectorAll(".options-side_colors img");
const tutorial = document.querySelector(".about");
const closeTutorial = document.querySelector(".tutorial .close");

const score = document.querySelector("#score");

let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d");
let box = 32;

let numberLife = 0;
let numberScore = 0;

tutorial.addEventListener('click', ()=> {
  document.querySelector(".tutorial").classList.add('on');
});

closeTutorial.addEventListener('click', ()=> {
  document.querySelector(".tutorial").classList.remove('on');
});

// atualiza o nivel selecionado na pagina
for(let i = 0; i < levels.length; i++) {
  levels[i].addEventListener('click', ()=> {
    document.querySelector('input.level-select').classList.remove('level-select');
    levels[i].classList.add('level-select');
  });
}

// atualiza o icone de cor selecionado na pagina
for(let i = 0; i < colors.length; i++) {
  colors[i].addEventListener('click', ()=> {
    document.querySelector('img.img-select').classList.remove('img-select');
    colors[i].classList.add('img-select');
  });
}

start.addEventListener('click', ()=> {
  const levelSelect = document.querySelector('input.level-select').value;
  const colorSnake = document.querySelector('img.img-select').getAttribute('data-color');

  //cria cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
  let snake = []; 
  snake[0] ={
    x: 8 * box,
    y: 8 * box
  }

  let direction = "right";
  let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
  }

  function createBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas
  }

  function createSnake (colorSnake){
    for(i = 0; i < snake.length; i++){
      context.fillStyle = colorSnake;
      context.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }

  function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
  }

  //quando um evento acontece, detecta e chama uma função
  document.addEventListener('keydown', update);

  function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction  = 'up';
    if(event.keyCode == 39 && direction != 'left') direction  = 'right';
    if(event.keyCode == 40 && direction != 'up') direction    = 'down';
  }

  function startGame(){ 
    const lifes = document.querySelectorAll(".options-side_lifes img");  
     

    if(numberLife == 5) gameOver();

    if(snake[0].x > 15 * box && direction == "right") {
      snake[0].x = 0;

      lifes[numberLife].src = './assets/images/empty-heart.png';
      numberLife++;
    } 
    if(snake[0].x < 0 && direction == 'left') {
      snake[0].x = 16 * box;

      lifes[i].src = './assets/images/empty-heart.png';
      numberLife++;
    }
    if(snake[0].y > 15 * box && direction == "down") {
      snake[0].y = 0;

      lifes[numberLife].src = './assets/images/empty-heart.png';
      numberLife++;
    } 
    if(snake[0].y < 0 && direction == 'up') {
      snake[0].y = 16 * box;

      lifes[numberLife].src = './assets/images/empty-heart.png';
      numberLife++;
    }
    
    for(i = 1; i < snake.length; i++){
      if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        gameOver();
      }
    }

      createBG();
      createSnake(colorSnake);
      drawFood();

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if(direction  == "right") snakeX += box;
      if(direction  == "left") snakeX  -= box;
      if(direction  == "up") snakeY    -= box;
      if(direction  == "down") snakeY  += box;

      if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
      }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        
        numberScore++;
        score.innerHTML = numberScore;
      }
      
      let newHead ={
        x: snakeX,
        y: snakeY
      }

      snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
  }

  function gameOver() {
    clearInterval(game);
    document.querySelector('.game-over').classList.add('on');
  }

  let time = 500;

  if(levelSelect == 1) time = 500;
  if(levelSelect == 2) time = 400;
  if(levelSelect == 3) time = 300;
  if(levelSelect == 4) time = 200;
  if(levelSelect == 5) time = 100;

  let game = setInterval(startGame, time);
});


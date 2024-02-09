let quastions =[
  {
    "quastion": "Wer hat HTML erfunden?",
    "answer_1":"Robbie Williams",
    "answer_2":"Lady Gaga",
    "answer_3":"Tim Berners-Lee",
    "answer_4":"Justin Bieber",
    "right_answer": 3
  },

  {
    "quastion": "Was bedeutet das HTML Tag &lt;a&gt;?",
    "answer_1":"Text Fett",
    "answer_2":"Container",
    "answer_3":"Ein Link",
    "answer_4":"Kursiv",
    "right_answer": 3
  },

  {
    "quastion": "Wie bindet man eine webseite in eine Webseite ein?",
    "answer_1":"&lt;iframe&gt;, &lt;framegt;, and &lt;frameset&gt;",
    "answer_2":"&lt;iframe&gt;",
    "answer_3":"&lt;frame&gt;",
    "answer_4":"&lt;frameset&gt;",
    "right_answer": 2
  },

  {
    "quastion": "Wie stellt man Text am BESTEN fett dar?",
    "answer_1":"&lt;strong&gt;",
    "answer_2":"CSS nutzen",
    "answer_3":"&lt;bold&gt",
    "answer_4":"&lt;b&gt",
    "right_answer": 1
  },

  {
    "quastion": "Welches Atributt kann man NICHT für Textarea verwenden?",
    "answer_1":"readonly",
    "answer_2":"max",
    "answer_3":"from",
    "answer_4":"spellcheck",
    "right_answer": 1
  },

  {
    "quastion": "Wie wählst du alle Elemente vom Typ &lt;a&gt mit dem attribut title aus?",
    "answer_1":"a[title] {...}",
    "answer_2":"a > title {...}",
    "answer_3":"a.title {...}",
    "answer_4":"a=title {...}",
    "right_answer": 1
  },

  {
    "quastion": "Wie definiert man in JS eine Variable?",
    "answer_1":"let 100 = rate;",
    "answer_2":"100 = let rate;",
    "answer_3":"rate =100;",
    "answer_4":"let rate = 100;",
    "right_answer": 4
  }
];

let Audio_Success = new Audio('./sounds/success.mp3');
let Audio_Wrong = new Audio('./sounds/wrong.mp3');

let currentQuastion = 0;
let amountOfRightQuestions = 0;

function init(){
  document.getElementById('all-quastions').innerHTML = quastions.length;
  showQuastions();
}

function showQuastions(){
  if(gameOver()){
    endScreen();
  }else{
    showNextQuestion();
  }
}

function gameOver(){
  return currentQuastion >= quastions.length;
}

function endScreen(){
  document.getElementById('endScreen').style= '';
  document.getElementById('questionBody').style='display: none';
  document.getElementById('amountOfQuestions').innerHTML = quastions.length;
  document.getElementById('amountOfRightQuestions').innerHTML = amountOfRightQuestions;
  document.getElementById('header-image').src= 'img/trophy.png';
}

function updateProgressbar(){
  let percent = (currentQuastion + 1)/ quastions.length;
  percent =Math.round(percent * 100);
  document.getElementById('progress').innerHTML = `${percent}%`;
  document.getElementById('progress').style = `width: ${percent}%`;
}

function showNextQuestion(){
  updateProgressbar();
  let quastion = quastions[currentQuastion];
  document.getElementById('quastion-number').innerHTML = currentQuastion + 1;
  document.getElementById('quastionText').innerHTML = quastion["quastion"];
  document.getElementById('answer_1').innerHTML = quastion["answer_1"];
  document.getElementById('answer_2').innerHTML = quastion["answer_2"];
  document.getElementById('answer_3').innerHTML = quastion["answer_3"];
  document.getElementById('answer_4').innerHTML = quastion["answer_4"];
}

function answer(selection){
  let quastion = quastions[currentQuastion];
  let selectedQuastionNumber = selection.slice(-1);
  let rightAnswer = `answer_${quastion["right_answer"]}`;
  if(selectedQuastionNumber == quastion["right_answer"]){
    document.getElementById(selection).parentNode.classList.add('bg-success');
    amountOfRightQuestions++;
    Audio_Success.play();
  }else{
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(rightAnswer).parentNode.classList.add('bg-success');
    Audio_Wrong.play();
  }

  document.getElementById('next-button').disabled = false;
}

function nextQuastion(){
  currentQuastion++;
  document.getElementById('next-button').disabled = true;
  resetAnswerButtons();
  showQuastions();
}

function resetAnswerButtons(){
    document.getElementById(`answer_1`).parentNode.classList.remove('bg-danger');
    document.getElementById(`answer_1`).parentNode.classList.remove('bg-success');
    document.getElementById(`answer_2`).parentNode.classList.remove('bg-danger');
    document.getElementById(`answer_2`).parentNode.classList.remove('bg-success');
    document.getElementById(`answer_3`).parentNode.classList.remove('bg-danger');
    document.getElementById(`answer_3`).parentNode.classList.remove('bg-success');
    document.getElementById(`answer_4`).parentNode.classList.remove('bg-danger');
    document.getElementById(`answer_4`).parentNode.classList.remove('bg-success');
}

function restartGame(){
  currentQuastion = 0;
  amountOfRightQuestions = 0;
  document.getElementById('header-image').src= 'img/headerIcon.jpg';
  document.getElementById('endScreen').style ='display: none';
  document.getElementById('questionBody').style ='display: block';
  init();
}
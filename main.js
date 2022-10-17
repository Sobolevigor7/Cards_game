/* eslint-disable prefer-const */
/* eslint-disable linebreak-style */
(() => {
  let iterationCounter = 0;
  let checkNumberArray = [];
  let selectedCardsArray = [];
  const CLOSED_CARD_COLOR = '#007bff';
  const OPENED_CARD_COLOR = '#ffffff';

  function playAgain() {
    const playAgainButton = document.createElement('button');
    playAgainButton.classList.add('col-md-8', 'mx-auto', 'mt-5', 'mr-5', 'btn', 'btn-primary', 'justify-content-center');
    playAgainButton.style.width = '30px';
    playAgainButton.style.height = '50px';
    playAgainButton.style.fontSize = '32px';
    playAgainButton.style.display = 'flex';
    playAgainButton.style.paddingTop = '0';
    playAgainButton.textContent = 'Играем еще раз?';
    return playAgainButton;
  }

  function createCard(element) {
    const card = document.createElement('button');
    card.classList.add('col-2', 'mt-5', 'mr-5', 'btn', 'play-card', 'btn-primary', 'justify-content-center');
    card.textContent = element;
    card.style.width = '10px';
    card.style.height = '50px';
    card.style.fontSize = '32px';
    card.style.display = 'flex';
    card.style.paddingTop = '0';
    card.style.transition = 'all .5s linear';
    card.style.color = CLOSED_CARD_COLOR;
    card.onmouseover = () => {
      card.style.backgroundColor = CLOSED_CARD_COLOR;
    };
    return card;
  }
  function createGame(container, playCardAmmount) {
    const mainArray = [];
    let index = 0;
    let card;
    let cardsLeft = (playCardAmmount ** 2) / 2;
    let playAgainButton;
    let cardMainArry = [];
    let gameTimeout;
    let timeLeft = 60;
    let timeField = document.createElement('div');
    let header = document.createElement('h3');
    header.textContent = 'Время до конца игры';
    header.classList.add('mt-3', 'justify-content-center', 'col-12');
    header.style.textAlign = 'center';
    timeField.style.textAlign = 'center';
    timeField.style.fontSize = '22px';
    timeField.classList.add('col-12', 'mt-3', 'justify-content-center');
    timeField.textContent = timeLeft;

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    function restoreContent() {
      for (let i = 0; i < selectedCardsArray.length; ++i) {
        selectedCardsArray[i].classList.remove('disabled');
        selectedCardsArray[i].style.color = CLOSED_CARD_COLOR;
        selectedCardsArray[i].removeAttribute('disabled');
      }
      checkNumberArray = [];
      selectedCardsArray = [];
    }
    for (let i = 0; i < (playCardAmmount ** 2); i++) {
      ++index;
      mainArray.push(index);
      if (index === (playCardAmmount ** 2 / 2)) {
        index = 0;
      }
    }
    shuffle(mainArray);

    container.append(header);
    container.append(timeField);

    for (const element of mainArray) {
      card = createCard(element);
      container.append(card);
      cardMainArry.push(card);
    }
    // eslint-disable-next-line no-shadow
    function checkCard(elm) {
      elm.classList.add('disabled');
      elm.disabled = 'true';
      elm.style.color = OPENED_CARD_COLOR;
      selectedCardsArray.push(elm);
      let element = elm.textContent;
      checkNumberArray.push(element);
      ++iterationCounter;
      if (iterationCounter === 2) {
        if (checkNumberArray[0] === checkNumberArray[1]) {
          iterationCounter = 0;
          checkNumberArray = [];
          selectedCardsArray = [];
          --cardsLeft;
          if (cardsLeft === 0) {
            // eslint-disable-next-line no-use-before-define
            gameOver();
          }
        } else if (iterationCounter === 2) {
          iterationCounter = 0;
          // eslint-disable-next-line no-unused-vars
          let timeout = setTimeout(restoreContent, 1000);
        }
      }
    }
    let cards = document.querySelectorAll('.play-card');
    cards.forEach((elm) => {
      elm.addEventListener('click', () => { checkCard(elm); });
    });
    function gameOver() {
      clearInterval(gameTimeout);
      cards.disabled = true;
      header.textContent = 'Игра окончена';
      timeField.style.display = 'none';
      document.querySelectorAll('.play-card').forEach((el) => {
        el.classList.add('disabled');
        el.style.cursor = 'not-allowed';
      });
      playAgainButton = playAgain();
      container.append(playAgainButton);
      playAgainButton.addEventListener('click', () => {
        document.location.reload();
      });
    }
    function timeCheck() {
      --timeLeft;
      timeField.textContent = timeLeft;
      if (timeLeft === 0) {
        gameOver();
      }
    }
    gameTimeout = setInterval(timeCheck, 1000);
  }
  function setPlayField(container) {
    const header = document.createElement('h2');
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'number';
    const buttonStartGame = document.createElement('button');
    header.textContent = 'Введите количество карточек по горизонтали / вертикали';
    form.classList.add('iput-group', 'mt-5');
    input.classList.add('form-control', 'mb-3');
    input.placeholder = 'Количество';
    buttonStartGame.classList.add('btn', 'btn-primary', 'justify-content-center', 'col-md-12');
    buttonStartGame.type = 'submit';
    buttonStartGame.textContent = 'Начать игру';
    form.append(input);
    form.prepend(header);
    form.append(buttonStartGame);
    container.append(form);
    buttonStartGame.addEventListener('click', (el) => {
      if (input.value < 2 || input.value > 10 || input.value % 2) {
        el.preventDefault();
        input.value = '4';
      } else {
        el.preventDefault();
        let playCardAmmount = +input.value;
        form.remove();
        createGame(container, playCardAmmount);
      }
    });
  }
  window.setPlayField = setPlayField;
}
)();

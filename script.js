document.addEventListener('DOMContentLoaded', () => {
  const cards = [
      { name: 'A', id: 1 }, { name: 'A', id: 2 },
      { name: 'B', id: 3 }, { name: 'B', id: 4 },
      { name: 'C', id: 5 }, { name: 'C', id: 6 },
      { name: 'D', id: 7 }, { name: 'D', id: 8 },
      { name: 'E', id: 9 }, { name: 'E', id: 10 },
      { name: 'F', id: 11 }, { name: 'F', id: 12 },
      { name: 'G', id: 13 }, { name: 'G', id: 14 },
      { name: 'H', id: 15 }, { name: 'H', id: 16 },
      { name: 'I', id: 17 }, { name: 'I', id: 18 },
      { name: 'J', id: 19 }, { name: 'J', id: 20 },
      { name: 'K', id: 21 }, { name: 'K', id: 22 },
      { name: 'L', id: 23 }, { name: 'L', id: 24 },
      { name: 'M', id: 25 }, { name: 'M', id: 26 },
      { name: 'N', id: 27 }, { name: 'N', id: 28 },
      { name: 'O', id: 29 }, { name: 'O', id: 30 },
      { name: 'P', id: 31 }, { name: 'P', id: 32 }
  ];

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let moves = 0;
  let matches = 0;
  let startTime;
  let timerInterval;

  const gameBoard = document.getElementById('game-board');
  const movesElement = document.getElementById('moves');
  const timeElement = document.getElementById('time');
  const victoryMessage = document.getElementById('victory-message');

  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  function createBoard() {
      shuffle(cards);
      cards.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('card');
          cardElement.dataset.name = card.name;

          cardElement.innerHTML = `
              <div class="card-inner">
                  <div class="card-front">${card.name}</div>
                  <div class="card-back"></div>
              </div>
          `;

          cardElement.addEventListener('click', flipCard);
          gameBoard.appendChild(cardElement);
      });
  }

  function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add('flipped');

      if (!firstCard) {
          firstCard = this;
          return;
      }

      secondCard = this;
      checkForMatch();
  }

  function checkForMatch() {
      let isMatch = firstCard.dataset.name === secondCard.dataset.name;
      isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      resetBoard();

      matches++;
      if (matches === cards.length / 2) {
          endGame();
      }
  }

  function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          resetBoard();
      }, 1500);
  }

  function resetBoard() {
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
      moves++;
      movesElement.textContent = `Movimentos: ${moves}`;
  }

  function startTimer() {
      startTime = new Date();
      timerInterval = setInterval(() => {
          const elapsedTime = Math.floor((new Date() - startTime) / 1000);
          const minutes = Math.floor(elapsedTime / 60);
          const seconds = elapsedTime % 60;
          timeElement.textContent = `Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }, 1000);
  }

  function stopTimer() {
      clearInterval(timerInterval);
  }

  function endGame() {
      stopTimer();
      victoryMessage.classList.remove('hidden');
  }

  function restartGame() {
      gameBoard.innerHTML = '';
      victoryMessage.classList.add('hidden');
      [moves, matches] = [0, 0];
      movesElement.textContent = `Movimentos: ${moves}`;
      timeElement.textContent = 'Tempo: 00:00';
      resetBoard();
      createBoard();
      stopTimer();
      startTimer();
  }

  document.getElementById('restart').addEventListener('click', restartGame);
  document.getElementById('play-again').addEventListener('click', restartGame);

  createBoard();
  startTimer();
});
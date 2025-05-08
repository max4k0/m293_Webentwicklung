
document.addEventListener('DOMContentLoaded', () => {
  let data = [], currentLesson = null, cardIndex = 0, learnIndex = 0, mode = null;


  const lessonList   = document.getElementById('lesson-list');
  const flashCard    = document.getElementById('flash-card');
  const learnCard    = document.getElementById('learn-card');
  const cardEn       = document.getElementById('card-en');
  const cardDe       = document.getElementById('card-de');
  const prevCardBtn  = document.getElementById('prev-card');
  const nextCardBtn  = document.getElementById('next-card');
  const flipCardBtn  = document.getElementById('flip-card');
  const wordEn       = document.getElementById('word-en');
  const wordDeLearn  = document.getElementById('word-de');
  const feedback     = document.getElementById('feedback');
  const answerInput  = document.getElementById('answer-input');
  const sendBtn      = document.getElementById('send-btn');
  const nextLearnBtn = document.getElementById('next-btn');


  if (flashCard) mode = 'cards';
  else if (learnCard) mode = 'learn';


  fetch('/data.json')
    .then(res => {
      if (!res.ok) throw new Error('Netzwerkantwort nicht ok');
      return res.json();
    })
    .then(json => {
      data = json.lessons;
      populateLessons();
    })
    .catch(err => console.error('Fehler beim Laden von data.json:', err));

  function populateLessons() {
    lessonList.innerHTML = '';
    data.forEach(lesson => {
      const li = document.createElement('li');
      li.textContent = lesson.title;
      li.dataset.id = lesson.id;
      li.addEventListener('click', () => selectLesson(lesson.id, li));
      lessonList.appendChild(li);
    });
  }

  function selectLesson(id, li) {
    currentLesson = data.find(l => l.id === parseInt(id));
    cardIndex = learnIndex = 0;
    lessonList.querySelectorAll('li').forEach(el => el.classList.remove('active'));
    li.classList.add('active');
    if (mode === 'cards') showCard();
    else if (mode === 'learn') showLearn();
  }

  //kartenmodus
  if (mode === 'cards') {
    prevCardBtn.addEventListener('click', () => {
      if (!currentLesson) return;
      cardIndex = Math.max(0, cardIndex - 1);
      showCard();
    });
    nextCardBtn.addEventListener('click', () => {
      if (!currentLesson) return;
      cardIndex = Math.min(currentLesson.cards.length - 1, cardIndex + 1);
      showCard();
    });
    flipCardBtn.addEventListener('click', () => {
      flashCard.classList.toggle('flipped');
    });
  }

  function showCard() {
    if (!currentLesson) return;
    const card = currentLesson.cards[cardIndex];
    cardEn.textContent = card.en;
    cardDe.textContent = card.de;
    flashCard.classList.remove('flipped');
  }

  //lernmodus
  if (mode === 'learn') {
    sendBtn.addEventListener('click', () => {
      if (!currentLesson) return;
      const answer  = answerInput.value.trim().toLowerCase();
      const correct = currentLesson.cards[learnIndex].de.toLowerCase();
      feedback.textContent = answer === correct ? 'Korrekt ✔️' : 'Falsch ❌';
      learnCard.classList.add('flipped');
      nextLearnBtn.classList.remove('hidden');
    });
    nextLearnBtn.addEventListener('click', () => {
      if (!currentLesson) return;
      if (learnIndex < currentLesson.cards.length - 1) {
        learnIndex++;
        showLearn();
      } else {
        alert('Du hast alle Wörter dieser Lektion geübt!');
      }
    });
  }


  function showLearn() {
    if (!currentLesson) return;
    const card = currentLesson.cards[learnIndex];
    wordEn.textContent      = card.en;
    wordDeLearn.textContent = card.de;
    feedback.textContent    = '';
    answerInput.value       = '';
    learnCard.classList.remove('flipped');
    nextLearnBtn.classList.add('hidden');
  }
});

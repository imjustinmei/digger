function navigate(direction) {
  let check = arrowCheck();
  let newIndex = parseInt(localStorage.getItem('currentIndex')) + direction;
  if (direction == -1) {
    if (!check[0]) {
      return;
    }
    localStorage.setItem('currentIndex', newIndex);
    let past = JSON.parse(localStorage.getItem('past'))[newIndex];
    for (let cell of document.getElementsByClassName('cell')) {
      cell.className = 'cell';
      cell.innerHTML = '';
    }
    setTimeout(() => {
      render(past.slice(2), past[1]);
    }, 50);
    document.getElementById('date').innerHTML = past[0];
    adjustArrows();
  } else {
    if (!check[1]) {
      return;
    }
    localStorage.setItem('currentIndex', newIndex);
    let past = JSON.parse(localStorage.getItem('past'))[newIndex];
    for (let cell of document.getElementsByClassName('cell')) {
      cell.className = 'cell';
      cell.innerHTML = '';
    }
    setTimeout(() => {
      render(past.slice(2), past[1]);
    }, 50);
    document.getElementById('date').innerHTML = past[0];
    adjustArrows();
  }
}

function arrowCheck() {
  let past = JSON.parse(localStorage.getItem('past'));
  let currentIndex = parseInt(localStorage.getItem('currentIndex'));
  return [past[currentIndex - 1] && currentIndex != 0 ? 1 : 0, past[currentIndex + 1] != undefined ? 1 : 0];
}

function adjustArrows() {
  !arrowCheck()[0] ? document.getElementById('backward').classList.add('cant') : document.getElementById('backward').classList.remove('cant');
  !arrowCheck()[1] ? document.getElementById('forward').classList.add('cant') : document.getElementById('forward').classList.remove('cant');
}

document.querySelectorAll('.nav').forEach((button) => {
  button.addEventListener('click', () => {
    navigate(button.id == 'backward' ? -1 : 1);
  });
});

const navigate = (direction) => {
  const check = arrowCheck();
  if ((direction == -1 && !check[0]) || (direction == 1 && !check[1])) return;

  currentIndex += direction;
  const past = JSON.parse(get("past"))[currentIndex];

  setTimeout(() => {
    render(past.slice(2), past[1], past[0]);
  }, 50);
  adjustArrows();
};

const arrowCheck = () => {
  const won = parseInt(get("won"));
  if (!won) return [0, 0];

  const past = JSON.parse(get("past"));

  return [past[currentIndex - 1] && currentIndex, past[currentIndex + won]];
};

const adjustArrows = () => {
  const arrows = arrowCheck();

  document.getElementById("backward").classList.toggle("cant", !arrows[0]);
  document.getElementById("forward").classList.toggle("cant", !arrows[1]);
};

document.querySelectorAll(".nav").forEach((button) => {
  button.addEventListener("click", () => {
    navigate(button.id == "backward" ? -1 : 1);
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") navigate(-1);
  else if (event.key == "ArrowRight") navigate(1);
});

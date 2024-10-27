let currentIndex;

const get = (item) => {
  return localStorage.getItem(item);
};

const set = (item, value) => {
  localStorage.setItem(item, value);
};

const newDate = () => {
  return new Date().toLocaleDateString("en-GB");
};

const today = newDate();

if (!get("new") || get("date") != today) {
  if (!get("new")) {
    set("new", 1);
    set("past", "[]");
    set("theme", "light");
  } else if (!parseInt(get("won"))) {
    updatePast(0);
  }

  set("won", 0);
  set("visited", "[]");
  set("date", today);
  set("win", wins[today]);
}

const render = (cells, state, date) => {
  const win = get("win");

  for (let cell of document.getElementsByClassName("cell")) {
    const index = cells.indexOf(cell.id);
    cell.className = "cell";

    if (index != -1) {
      if (adjacent(win, cell.id)) cell.classList.add("near");
      cell.classList.add("visited");
      cell.innerText = index + 1;
    } else cell.innerText = "";
    if (state) cell.classList.add("done");
  }

  if (state) document.getElementById(cells.slice(-1)).classList.add("win");
  document.getElementById("date").innerText = date;
};

const generate = () => {
  const won = parseInt(get("won"));
  const path = document.querySelector("#path");
  const current = JSON.parse(get("visited"));
  const board = document.getElementById("board");

  for (let i = 0; i < 4; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < 4; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = i + "," + j;
      cell.addEventListener("click", () => {
        handleClick(cell);
      });
      row.appendChild(cell);
    }
    board.appendChild(row);
  }

  render(current, won, today);
  if (won) document.getElementById("tomorrow").innerText = "dig more tomorrow";
  currentIndex = JSON.parse(get("past")).length - 1;

  adjustArrows();
  path.setAttribute("d", get("theme") == "dark" ? moon : sun);
};

const adjacent = (a, b) => {
  const [aX, aY] = a.split(",");
  const [bX, bY] = b.split(",");

  return (
    (Math.abs(aX - bX) == 1 && Math.abs(aY - bY) == 0) ||
    (Math.abs(aY - bY) == 1 && Math.abs(aX - bX) == 0)
  );
};

const handleClick = (cell) => {
  const win = get("win");
  const won = parseInt(get("won"));
  const current = JSON.parse(get("visited"));

  if (won || current.includes(cell.id)) return;

  current.push(cell.id);
  cell.classList.add("visited");
  if (adjacent(win, cell.id)) cell.classList.add("near");
  set("visited", JSON.stringify(current));

  if (cell.id == win) {
    currentIndex += 1;
    render(current, 1, today);
    updatePast(1);
    set("won", 1);
    adjustArrows();
    document.getElementById("tomorrow").innerText = "dig more tomorrow";
  }
};

const updatePast = (state) => {
  const past = JSON.parse(get("past"));
  const visited = JSON.parse(get("visited"));

  visited.unshift(get("date"), state);
  past.push(visited);
  set("past", JSON.stringify(past));
};

document.querySelector("#toggle").addEventListener("click", () => {
  set("theme", get("theme") == "dark" ? "light" : "dark");
  updateTheme();
});

document.querySelector("#label").setAttribute("d", label);

let startTime;
let running = false;
let laps = [];

function startStop() {
  if (running) {
    stop();
  } else {
    start();
  }
}

function start() {
  startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1] : 0);
  running = true;
  document.getElementById("startStop").textContent = "Stop";
  update();
}

function stop() {
  running = false;
  document.getElementById("startStop").textContent = "Start";
  laps.push(Date.now() - startTime);
}

function reset() {
  running = false;
  laps = [];
  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("startStop").textContent = "Start";
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (running) {
    laps.push(Date.now() - startTime);
    updateLaps();
  }
}

function update() {
  if (running) {
    const elapsedMilliseconds = Date.now() - startTime;
    const time = formatTime(elapsedMilliseconds);
    document.getElementById("display").textContent = time;
    setTimeout(update, 10);
  }
}

function updateLaps() {
  const lapList = document.getElementById("laps");
  const lapItem = document.createElement("li");
  const lapTime = laps[laps.length - 1] - (laps.length > 1 ? laps[laps.length - 2] : 0);
  lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
  lapList.appendChild(lapItem);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millis = Math.floor((milliseconds % 1000) / 10);

  return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(millis)}`;
}

function padNumber(number) {
  return number.toString().padStart(2, '0');
}

// Initial setup
reset();

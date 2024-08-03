let timer;
let isTimerRunning = false;
let totalSeconds = 0;
const initialDyingPrice = 40;
const pricePerMinute = 5.5;

function setInitialTime() {
  const initialDays =
    parseInt(document.getElementById("initialDays").value) || 0;
  const initialHours =
    parseInt(document.getElementById("initialHours").value) || 0;
  const initialMinutes =
    parseInt(document.getElementById("initialMinutes").value) || 0;
  const initialSeconds =
    parseInt(document.getElementById("initialSeconds").value) || 0;

  totalSeconds =
    initialDays * 24 * 3600 +
    initialHours * 3600 +
    initialMinutes * 60 +
    initialSeconds;

  updateTimerDisplay();
  updatePrices();
}

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    document.getElementById("startButton").classList.add("active");
    document.getElementById("stopButton").classList.remove("active");
    timer = setInterval(() => {
      totalSeconds++;
      updateTimerDisplay();
      if (totalSeconds % (15 * 60) === 0) {
        updatePrices();
      }
    }, 1000); // Update every second
  }
}

function stopTimer() {
  if (isTimerRunning) {
    clearInterval(timer);
    isTimerRunning = false;
    document.getElementById("startButton").classList.remove("active");
    document.getElementById("stopButton").classList.add("active");
  }
}

function resetTimer() {
  clearInterval(timer);
  isTimerRunning = false;
  totalSeconds = 0;
  updateTimerDisplay();
  updatePrices();
  document.getElementById("startButton").classList.remove("active");
  document.getElementById("stopButton").classList.remove("active");
}

function updateTimerDisplay() {
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let displayString = "";
  if (days > 0) {
    displayString += `${days}d `;
  }
  if (hours > 0 || days > 0) {
    displayString += `${hours}h `;
  }
  if (minutes > 0 || hours > 0 || days > 0) {
    displayString += `${minutes}m `;
  }
  displayString += `${seconds}s`;

  document.getElementById("timerDisplay").innerText = displayString;
}

function updateDeathCount() {
  const deathCount = parseInt(document.getElementById("deathCount").value) || 0;
  document.getElementById(
    "deathCounterResult"
  ).innerText = `Death: ${deathCount}`;
}

function updatePrices() {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const additionalPrice = Math.floor((totalMinutes / 15) * pricePerMinute * 15);
  const dyingPrice = initialDyingPrice + additionalPrice;
  const waterBucketPrice = Math.floor(dyingPrice / 3);

  document.getElementById(
    "dyingPriceResult"
  ).innerText = `Die Now: ₹ ${dyingPrice} INR`;
  document.getElementById(
    "waterBucketResult"
  ).innerText = `Water Bucket: ₹ ${waterBucketPrice} INR`;
}

// Initialize prices initially
updatePrices();

window.browser = window.browser || window.chrome;

let sessionActive = false;
let sessionData = { games: [], wins: 0, losses: 0, draws: 0, ratingChange: 0 };
let observer = null;

// --- Create overlay ---
function createOverlay() {
  let overlay = document.getElementById("chess-session-overlay");
  if (overlay) return;

  overlay = document.createElement("div");
  overlay.id = "chess-session-overlay";
  overlay.innerHTML = `
    <div id="chess-session-results"></div>
    <p>
      Games: <span id="games">0</span> |
      <span class="win-text">W: <span id="wins">0</span></span> |
      <span class="loss-text">L: <span id="losses">0</span></span> |
      <span class="draw-text">D: <span id="draws">0</span></span>
    </p>
    <p>Rating: <span id="rating">+0</span></p>
    <button id="toggle-session">Start Session</button>
  `;
  document.body.appendChild(overlay);

  document.getElementById("toggle-session").addEventListener("click", () => {
    if (!sessionActive) startSession();
    else endSession();
  });
}

// --- Start Session ---
function startSession() {
  sessionActive = true;
  sessionData = {
    games: [],
    wins: 0,
    losses: 0,
    draws: 0,
    ratingChange: 0,
  };

  updateUI();
  startObserver();
  document.getElementById("toggle-session").textContent = "End Session";
  console.log("[ChessSessionTracker] Session started");
}

// --- End Session ---
function endSession() {
  sessionActive = false;
  stopObserver();
  document.getElementById("toggle-session").textContent = "Start Session";
  console.log("[ChessSessionTracker] Session ended");
}

// --- Update Overlay UI ---
function updateUI() {
  document.getElementById("games").textContent = sessionData.games.length;
  document.getElementById("wins").textContent = sessionData.wins;
  document.getElementById("losses").textContent = sessionData.losses;
  document.getElementById("draws").textContent = sessionData.draws;
  document.getElementById("rating").textContent = sessionData.ratingChange;

  const resultsContainer = document.getElementById("chess-session-results");
  resultsContainer.innerHTML = "";
  sessionData.games.forEach((g) => {
    const box = document.createElement("div");
    box.className = `result-box ${g.result}`;
    box.textContent = g.rating_text;
    resultsContainer.appendChild(box);
  });
}

function extractRatingChange() {
  const ratingChangeElAll = document.querySelectorAll(
    ".rating-score-change.rating-score-positive, .rating-score-change.rating-score-negative",
  );
  const ratingChangeEl = ratingChangeElAll[ratingChangeElAll.length - 1];
  if (!ratingChangeEl) return { text: "+0", value: 0 };

  const text = ratingChangeEl.textContent.trim(); // e.g. "+8" or "-7"

  // Extract numeric value safely, preserving sign
  const value = text.startsWith("-")
    ? -Math.abs(parseInt(text.replace(/[^\d-]/g, ""), 10))
    : Math.abs(parseInt(text.replace(/[^\d+]/g, ""), 10));

  return { text, value: isNaN(value) ? 0 : value };
}

// --- Start MutationObserver ---
function startObserver() {
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        const modal = node.matches(
          ".board-modal-component.game-over-modal-container",
        )
          ? node
          : node.querySelector?.(
              ".board-modal-component.game-over-modal-container",
            );

        if (!modal) continue;

        const titleEl = modal.querySelector(".header-title-component");
        if (!titleEl) continue;

        const text = titleEl.textContent.trim();
        let resultType = "draw";

        if (text.includes("You Won")) resultType = "win";
        else if (text.includes("Won")) resultType = "loss";
        else resultType = "draw";

        const { text: ratingText, value: ratingDiff } = extractRatingChange();

        sessionData.games.push({
          result: resultType,
          rating_text: ratingText,
          rating_diff: ratingDiff,
          time: Date.now(),
        });

        if (resultType === "win") sessionData.wins++;
        else if (resultType === "loss") sessionData.losses++;
        else sessionData.draws++;

        sessionData.ratingChange += ratingDiff;

        updateUI();
        console.log(
          `[ChessSessionTracker] Game recorded — ${resultType} (${ratingDiff})`,
        );
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// --- Stop MutationObserver ---
function stopObserver() {
  if (observer) observer.disconnect();
}

// --- Init ---
createOverlay();

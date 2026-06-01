const STORAGE_KEY = "ghostScoutEntries";

const saveBtn =
  document.getElementById("saveBtn");

const analyzeBtn =
  document.getElementById("analyzeBtn");

const entriesEl =
  document.getElementById("entries");

const analysisEl =
  document.getElementById("analysis");

loadEntries();
updateStats();

saveBtn.onclick = () => {

  const source =
    document.getElementById("source").value.trim();

  const topic =
    document.getElementById("topic").value.trim();

  const pattern =
    document.getElementById("pattern").value.trim();

  const notes =
    document.getElementById("notes").value.trim();

  if (!source || !pattern) {
    alert("Source Account and Pattern are required.");
    return;
  }

  const entry = {
    source,
    topic,
    pattern,
    notes,
    createdAt: Date.now()
  };

  const entries =
    JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

  entries.unshift(entry);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(entries)
  );

  location.reload();

};

analyzeBtn?.addEventListener("click", () => {

  const contentInput =
    document.getElementById("content");

  const content =
    contentInput
      ? contentInput.value.trim()
      : "";

  if (!content) {
    alert("Paste content to analyze first.");
    return;
  }

  const report =
    buildScoutReport(content);

  analysisEl.innerHTML = `
    <h3>Scout Report</h3>

    <p><strong>Pattern:</strong> ${report.pattern}</p>
    <p><strong>Emotion:</strong> ${report.emotion}</p>
    <p><strong>Hook:</strong> ${report.hook}</p>

    <h4>Idea Starters</h4>

    <ul>
      ${report.ideas
        .map(idea => `<li>${idea}</li>`)
        .join("")}
    </ul>
  `;

  document.getElementById("pattern").value =
    report.pattern;

  document.getElementById("topic").value =
    report.topic;

  document.getElementById("notes").value =
    `${report.emotion}\n${report.hook}\n\n${content}`;

});

function buildScoutReport(content) {

  const text =
    content.toLowerCase();

  if (
    text.includes("underdog") ||
    text.includes("comeback") ||
    text.includes("nobody believed") ||
    text.includes("upset")
  ) {
    return {
      topic: "Comeback Story",
      pattern: "Underdog",
      emotion: "Redemption",
      hook: "Nobody believed them until it mattered.",
      ideas: [
        "The Athlete Nobody Believed In",
        "Lost All Season Then Won When It Mattered",
        "The Comeback After Everyone Quit Watching"
      ]
    };
  }

  if (
    text.includes("parent") ||
    text.includes("dad") ||
    text.includes("mom") ||
    text.includes("sideline")
  ) {
    return {
      topic: "Youth Sports Parents",
      pattern: "Parent Behavior",
      emotion: "Recognition",
      hook: "Every team has seen this parent before.",
      ideas: [
        "Parents Who Coach From The Stands",
        "The Ride Home After A Bad Game",
        "What Coaches Wish Parents Understood"
      ]
    };
  }

if (
  text.includes("fighter") ||
  text.includes("round") ||
  text.includes("knockout") ||
  text.includes("submission") ||
  text.includes("comeback")
) {
  return {
    topic: "MMA Moments",
    pattern: "Comeback",
    emotion: "Momentum Shift",
    hook: "The fight changed in an instant.",
    ideas: [
      "The Comeback After Getting Dropped",
      "One Round Changed Everything",
      "How Momentum Swung The Fight"
    ]
  };
}

  if (
    text.includes("technique") ||
    text.includes("shot") ||
    text.includes("finish") ||
    text.includes("setup")
  ) {
    return {
      topic: "Wrestling Technique",
      pattern: "Coach Tip",
      emotion: "Useful",
      hook: "One small detail changes the whole position.",
      ideas: [
        "Why Your Double Leg Keeps Failing",
        "The Setup Before The Shot Matters Most",
        "How To Finish When They Sprawl"
      ]
    };
  }

  return {
    topic: "General",
    pattern: "Attention Signal",
    emotion: "Curiosity",
    hook: "There is a story under the story.",
    ideas: [
      "The Part Nobody Talks About",
      "What People Missed",
      "Why This Hit A Nerve"
    ]
  };
}

function loadEntries() {

  const entries =
    JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

  entriesEl.innerHTML =
    entries.map(entry => `
      <div class="entry">
        <strong>${entry.source}</strong>
        <div class="topic">${entry.topic}</div>
        <div class="pattern">${entry.pattern}</div>
      </div>
    `).join("");

}

function updateStats() {

  const entries =
    JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

  const patterns =
    new Set(
      entries
        .map(e => (e.pattern || "").trim())
        .filter(Boolean)
    );

  const sources =
    new Set(
      entries
        .map(e => (e.source || "").trim())
        .filter(Boolean)
    );

  document.getElementById("entryCount").textContent =
    entries.length;

  document.getElementById("patternCount").textContent =
    patterns.size;

  document.getElementById("sourceCount").textContent =
    sources.size;

}
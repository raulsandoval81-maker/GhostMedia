const factoryWinner = document.getElementById("factoryWinner");
const generateFactoryBtn = document.getElementById("generateFactoryBtn");
const saveFactoryBtn = document.getElementById("saveFactoryBtn");
const factoryOutput = document.getElementById("factoryOutput");

let factoryIdeas = [];

function getWinners() {
  return gmGetIdeas().filter((idea) => idea.status === "WINNER");
}

function loadFactoryWinners() {
  const winners = getWinners();

  factoryWinner.innerHTML = winners
    .map((w) => `<option value="${w.id}">${w.title} — ${w.page}</option>`)
    .join("");
}

function generateVariations(winner) {
  if (!winner) return [];

  const page = winner.page || "General";
  const title = winner.title || "Winning Idea";
  const notes = winner.notes || "";

  const text = `${title} ${page} ${notes}`.toLowerCase();

  // Parenting Pattern

  if (
    page === "Youth Sports Parents" ||
    text.includes("parent") ||
    text.includes("dad") ||
    text.includes("mom")
  ) {
    return [
      "Parents Who Think Their Kid Is Going D1 At Age 8",
      "The Ride Home After A Tough Loss",
      "Every Ref Is Apparently Blind",
      "The Parent Group Chat Nobody Wants",
      "When Parents Care More Than Athletes",
      "Travel Ball Parent Starter Pack",
      "The Parent Who Knows More Than The Coach",
      "Parents Who Scout 8 Year Olds",
      "The Sideline Screamer",
      "When Dad Becomes Assistant Coach"
    ];
  }

  // Wrestling History Pattern

  if (
    page === "Wrestling History" ||
    text.includes("weight cut") ||
    text.includes("bad weight") ||
    text.includes("history") ||
    text.includes("old school")
  ) {
    return [
      "The Worst Weight Cut I Ever Saw",
      "How We Used To Cut Weight Before Hydration Tests",
      "The Night Before Weigh Ins Used To Be Chaos",
      "Every Old Wrestler Has A Weight Cut Story",
      "The Dumbest Weight Cutting Trick Ever",
      "Why Wrestling Finally Changed The Rules",
      "Cutting Weight In The 90s Was Different",
      "Things Coaches Allowed Back Then",
      "The Most Miserable Bus Ride After A Cut",
      "What Young Wrestlers Will Never Experience"
    ];
  }

  // MMA Drama Pattern

  if (
    page === "MMA Drama" ||
    text.includes("mma") ||
    text.includes("fight") ||
    text.includes("drama")
  ) {
    return [
      "The Fight Everyone Saw Differently",
      "When The Corner Made It Worse",
      "The Moment The Crowd Turned",
      "Why Fighters Need Better Corners",
      "The Dumbest Fight IQ Moment Ever",
      "When Ego Cost The Match",
      "The Post Fight Excuse Nobody Believed",
      "The Coach Who Lost Control",
      "The Round That Changed Everything",
      "What Casual Fans Missed"
    ];
  }

  // Wrestling Highlights Pattern

  if (
    page === "Wrestling Highlights" ||
    text.includes("highlight") ||
    text.includes("pin") ||
    text.includes("wrestling")
  ) {
    return [
      "The Craziest Pin I've Ever Seen",
      "The Match Nobody Expected To Matter",
      "One Move Changed Everything",
      "The Crowd Went Silent After This",
      "The Sequence Coaches Replay",
      "The Best Scramble Of The Year",
      "How This Match Turned Around",
      "The Moment Momentum Shifted",
      "The Finish Everyone Missed",
      "Why This Highlight Matters"
    ];
  }

  // Underdog Pattern

  if (
    text.includes("underdog") ||
    text.includes("upset") ||
    text.includes("nobody expected")
  ) {
    return [
      "Nobody Thought They Could Win",
      "The Biggest Surprise Of The Season",
      "How The Underdog Pulled It Off",
      "The Match That Changed Everything",
      "Why This Story Resonates",
      "The Moment Belief Changed",
      "What People Got Wrong",
      "The Quiet Athlete Nobody Saw Coming",
      "The Upset Nobody Predicted",
      "Proof Hard Work Still Wins"
    ];
  }

  // Generic Fallback

  return [
    `The Hidden Lesson Behind ${title}`,
    `Why ${title} Hit A Nerve`,
    `The Part Nobody Talks About`,
    `What Coaches Notice First`,
    `The Story Under The Story`,
    `Why This Keeps Happening`,
    `The Mistake Everyone Misses`,
    `What This Says About The Sport`,
    `The Moment People React To`,
    `The Follow-Up Nobody Asked For`
  ];
}

function renderFactoryOutput() {
  factoryOutput.innerHTML = "";

  factoryIdeas.forEach((title) => {
    const row = document.createElement("div");
    row.className = "page";

    row.innerHTML = `
      <strong>${title}</strong>

      <span>VARIATION</span>

      <button class="build-image-btn">
        🎨 Build Images
      </button>
    `;

    row
      .querySelector(".build-image-btn")
      .addEventListener("click", () => {

        localStorage.setItem(
          "ghost-image-payload",
          JSON.stringify({
            title,
            theme: "Ghost Loop",
            size: "1080x1350",
            createdAt: new Date().toISOString()
          })
        );
window.location.href =
  "/image-generator/";


    });

    factoryOutput.appendChild(row);
  });
}

generateFactoryBtn.addEventListener("click", () => {
  const winners = getWinners();
  const selectedId = factoryWinner.value;
  const winner = winners.find((w) => String(w.id) === String(selectedId));

  factoryIdeas = generateVariations(winner);
  renderFactoryOutput();
});

saveFactoryBtn.addEventListener("click", () => {
  if (!factoryIdeas.length) return;

  const ideas = gmGetIdeas();

  const existingTitles = new Set(
    ideas.map((idea) =>
      String(idea.title || "")
        .trim()
        .toLowerCase()
    )
  );

  const winners = getWinners();
  const selectedId = factoryWinner.value;
  const winner = winners.find((w) => String(w.id) === String(selectedId));

  let saved = 0;
  let skipped = 0;

  factoryIdeas.forEach((title) => {
    const cleanTitle = String(title || "").trim();
    const key = cleanTitle.toLowerCase();

    if (!cleanTitle) return;

    if (existingTitles.has(key)) {
      skipped++;
      return;
    }

    ideas.unshift({
      id: Date.now() + Math.random(),
      title: cleanTitle,
      page: winner?.page || "General",
      notes: "Generated by Factory V2 from winning pattern.",
      status: "NEW",
      source: "factory",
      createdAt: new Date().toISOString()
    });

    existingTitles.add(key);
    saved++;
  });

  gmSaveIdeas(ideas);

  factoryIdeas = [];
  renderFactoryOutput();

  alert(`Factory ideas saved: ${saved}. Duplicates skipped: ${skipped}.`);

  window.location.href = "/dashboard/ideas.html";
});


generateCarouselBtn?.addEventListener(
  "click",
  () => {

    const winners = getWinners();

    const selectedId =
      factoryWinner.value;

    const winner =
      winners.find(
        (w) =>
          String(w.id) ===
          String(selectedId)
      );

    if (!winner) {
      alert("Select a winner first.");
      return;
    }

    localStorage.setItem(
      "ghost-carousel-payload",
      JSON.stringify({

        slide1:
          winner.title ||

          "Winning Idea",

        slide2:
          "Most people miss this.",

        slide3:
          "Here's what actually happens.",

        slide4:
          "The lesson is simpler than people think.",

        slide5:
          "What do you think?",

        createdAt:
          new Date().toISOString()

      })
    );

    alert(
      "Carousel payload created."
    );

  }
);
const generateCarouselBtn =
  document.getElementById("generateCarouselBtn");

generateCarouselBtn?.addEventListener("click", () => {
  const winners = getWinners();
  const selectedId = factoryWinner.value;

  const winner = winners.find(
    (w) => String(w.id) === String(selectedId)
  );

  if (!winner) {
    alert("Select a winner first.");
    return;
  }

  const title = winner.title || "Winning Idea";

  localStorage.setItem(
    "ghost-carousel-payload",
    JSON.stringify({
      slide1: title,
      slide2: "Most people miss this.",
      slide3: "Here's what actually happens.",
      slide4: "The lesson is simpler than people think.",
      slide5: "What do you think?",
      createdAt: new Date().toISOString()
    })
  );

  window.location.href = "/carousel/";
});
loadFactoryWinners();
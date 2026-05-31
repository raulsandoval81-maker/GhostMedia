const patternList = document.getElementById("patternList");

const PATTERN_MAP = {

  Parents: [
    "Parent",
    "Parents",
    "Dad",
    "Mom",
    "Kid",
    "Youth",
    "D1",
    "Travel Ball",
    "Group Chat",
    "Sideline"
  ],

  Humor: [
    "Funny",
    "Humor",
    "Gym",
    "Stands",
    "Group Chat",
    "Starter Pack"
  ],

  Underdog: [
    "Underdog",
    "Nobody Picked",
    "Comeback",
    "Cut From The Team",
    "Nobody Thought",
    "Upset"
  ],

  Motivation: [
    "Motivation",
    "Discipline",
    "Train",
    "Earn",
    "Work Ethic",
    "Hard Work"
  ],

  Drama: [
    "Drama",
    "Beef",
    "Rivalry",
    "Callout",
    "War",
    "Fight",
    "Controversy"
  ],

  Technique: [
    "Technique",
    "Sprawl",
    "Double Leg",
    "Single Leg",
    "Setup",
    "Finish",
    "Scramble"
  ],

  History: [
    "History",
    "Legend",
    "Old School",
    "Forgotten",
    "Weight Cut",
    "Weight",
    "Cut",
    "Back Then",
    "Used To",
    "Never Experience",
    "Bus Ride",
    "Hydration Test",
    "90s"
  ],

  News: [
    "News",
    "Announcement",
    "Ranking",
    "Prospect",
    "Injury"
  ]

};

function detectPatterns(title, page) {

  const found = [];

  const safeTitle =
    String(title || "");

  const safePage =
    String(page || "");

  Object.keys(PATTERN_MAP).forEach((pattern) => {

    const words =
      PATTERN_MAP[pattern];

    const match =
      words.some((word) =>
        safeTitle
          .toLowerCase()
          .includes(word.toLowerCase()) ||

        safePage
          .toLowerCase()
          .includes(word.toLowerCase())
      );

    if (match) {
      found.push(pattern);
    }

  });

  return found;

}

function renderPatterns() {

  const ideas =
    gmGetIdeas();

  const winners =
    ideas.filter(
      (idea) =>
        idea.status === "WINNER"
    );

  const totals = {};

  winners.forEach((idea) => {

    const patterns =
      detectPatterns(
        idea.title,
        idea.page
      );

    patterns.forEach((pattern) => {

      totals[pattern] =
        (totals[pattern] || 0) + 1;

    });

  });

  patternList.innerHTML = "";

  Object.keys(totals)
    .sort(
      (a, b) =>
        totals[b] - totals[a]
    )
    .forEach((pattern) => {

      const row =
        document.createElement("div");

      row.className = "page";

      row.innerHTML = `
        <strong>${pattern}</strong>
        <span>${totals[pattern]} winner(s)</span>
      `;

      patternList.appendChild(row);

    });

  if (!Object.keys(totals).length) {

    patternList.innerHTML = `
      <div class="page">
        <strong>No winning patterns yet.</strong>
        <span>Mark winners first</span>
      </div>
    `;

  }

}

renderPatterns();
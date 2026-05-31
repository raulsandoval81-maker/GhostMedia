const ideaSelect = document.getElementById("ideaSelect");
const generateContentBtn = document.getElementById("generateContentBtn");
const queueContentBtn = document.getElementById("queueContentBtn");

const hookOutput = document.getElementById("hookOutput");
const captionOutput = document.getElementById("captionOutput");
const hashtagsOutput = document.getElementById("hashtagsOutput");

let currentContent = null;

function getIdeaCategory(idea) {
  return idea.page || idea.genre || idea.category || "Uncategorized";
}

function loadIdeasIntoSelect() {
  const ideas = gmGetIdeas();

  ideaSelect.innerHTML = "";

  const promotedIdeas = ideas.filter((idea) => idea.status === "PROMOTED");
  const selectableIdeas = promotedIdeas.length ? promotedIdeas : ideas;

  selectableIdeas.forEach((idea) => {
    const option = document.createElement("option");

    option.value = idea.id;
    option.textContent = `${idea.title} — ${getIdeaCategory(idea)}`;

    ideaSelect.appendChild(option);
  });
}

function getContentBlueprint(page) {
  const blueprints = {
    "Wrestling Highlights": {
      pattern: "Highlight",
      emotion: "Shock + Replay",
      goal: "Views and shares",
      cta: "Would you rewatch this?",
      angle: "Turn the moment into a story, not just a clip."
    },
    "Wrestling History": {
      pattern: "Story",
      emotion: "Nostalgia + Debate",
      goal: "Comments and saves",
      cta: "Did you ever see this happen?",
      angle: "Compare old-school wrestling to today."
    },
    "MMA Moments": {
      pattern: "Fight IQ",
      emotion: "Curiosity + Respect",
      goal: "Watch time and comments",
      cta: "What did you notice first?",
      angle: "Explain the moment casual fans missed."
    },
    "MMA Drama": {
      pattern: "Controversy",
      emotion: "Debate + Reaction",
      goal: "Comments",
      cta: "Whose side are you on?",
      angle: "Frame both sides without overexplaining."
    },
    "Gym Humor": {
      pattern: "Relatable joke",
      emotion: "Funny + Familiar",
      goal: "Shares and tags",
      cta: "Tag the person who does this.",
      angle: "Make the gym behavior instantly recognizable."
    },
    "Strength Motivation": {
      pattern: "Discipline",
      emotion: "Grit + Focus",
      goal: "Saves",
      cta: "Save this for the next hard day.",
      angle: "Make the boring work feel important."
    },
    "Youth Sports Parents": {
      pattern: "Parent behavior",
      emotion: "Relatable + Tension",
      goal: "Comments and shares",
      cta: "Have you seen this parent?",
      angle: "Say the quiet part parents recognize."
    },
    "Combat Sports News": {
      pattern: "Headline breakdown",
      emotion: "Curiosity",
      goal: "Clicks and comments",
      cta: "What does this change?",
      angle: "Explain why the headline matters."
    },
    "Wrestling Technique": {
      pattern: "Coach detail",
      emotion: "Useful + Clear",
      goal: "Saves",
      cta: "Save this before practice.",
      angle: "Teach one detail people can use."
    },
    "Underdog Stories": {
      pattern: "Comeback",
      emotion: "Belief + Momentum",
      goal: "Shares",
      cta: "Never count someone out.",
      angle: "Build the story around the turning point."
    }
  };

  return blueprints[page] || {
    pattern: "General post",
    emotion: "Curiosity",
    goal: "Engagement",
    cta: "What do you think?",
    angle: "Make the idea simple and easy to react to."
  };
}

function buildCaption(idea, blueprint) {
  const title = idea.title || "This moment";
  const notes = idea.notes || "";

  return `${title}

${blueprint.angle}

${notes ? notes + "\n\n" : ""}Pattern: ${blueprint.pattern}
Emotion: ${blueprint.emotion}
Goal: ${blueprint.goal}

${blueprint.cta}`;
}

function buildContent(idea) {
  const page = getIdeaCategory(idea);
  const blueprint = getContentBlueprint(page);

  return {
    ideaId: idea.id,
    title: idea.title,
    page,
    pattern: blueprint.pattern,
    angle: blueprint.angle,
    emotion: blueprint.emotion,
    goal: blueprint.goal,
    cta: blueprint.cta,
    hook: `${idea.title}`,
    caption: buildCaption(idea, blueprint),
    hashtags: getHashtags(page),
    status: "ready",
    createdAt: new Date().toISOString()
  };
}

function getHashtags(page) {
  const tags = {
    "Wrestling Highlights": "#wrestling #wrestlinghighlights #combatsports #matlife",
    "Wrestling History": "#wrestlinghistory #oldschoolwrestling #wrestlinglife #combatsports",
    "MMA Moments": "#mma #fightiq #combatsports #fightlife",
    "MMA Drama": "#mma #fightdrama #ufc #combatsports",
    "Gym Humor": "#gymhumor #gymmemes #fitnesslife #combatgym",
    "Strength Motivation": "#strengthtraining #discipline #motivation #fitness",
    "Youth Sports Parents": "#youthsports #sportsparents #coaching #parentlife",
    "Combat Sports News": "#combatsports #fightnews #mma #wrestling",
    "Wrestling Technique": "#wrestlingtechnique #wrestlingcoach #wrestlinglife #matwork",
    "Underdog Stories": "#underdog #comebackstory #sportsstory #motivation"
  };

  return tags[page] || "#content #media #storytelling";
}

function renderContent(content) {
  hookOutput.textContent =
    `${content.title}

Pattern: ${content.pattern}
Angle: ${content.angle}
Emotion: ${content.emotion}
Goal: ${content.goal}
CTA: ${content.cta}`;

  captionOutput.textContent = content.caption;
  hashtagsOutput.textContent = content.hashtags;
}

generateContentBtn.addEventListener("click", () => {
  const ideas = gmGetIdeas();
  const selectedId = ideaSelect.value;

  const idea = ideas.find(
    (item) => String(item.id) === String(selectedId)
  );

  if (!idea) return;

  currentContent = buildContent(idea);

  renderContent(currentContent);
});

queueContentBtn.addEventListener("click", () => {
  if (!currentContent) {
    alert("Generate content first.");
    return;
  }

  gmUpdateIdeaStatus(
    currentContent.ideaId,
    "QUEUED"
  );

  window.location.href = "/dashboard/queue.html";
});

loadIdeasIntoSelect();
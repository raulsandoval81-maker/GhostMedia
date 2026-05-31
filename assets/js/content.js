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
      postType: "Highlight",
      pattern: "Replay Moment",
      emotion: "Shock + Curiosity",
      goal: "Views and shares",
      cta: "Would you rewatch this?",
      angle: "Turn the best moment into a story."
    },
    "Wrestling History": {
      postType: "Story",
      pattern: "Old School Memory",
      emotion: "Nostalgia + Debate",
      goal: "Comments and saves",
      cta: "Did you ever see this happen?",
      angle: "Compare old-school wrestling to today."
    },
    "MMA Moments": {
      postType: "Breakdown",
      pattern: "Fight IQ",
      emotion: "Curiosity + Respect",
      goal: "Watch time and comments",
      cta: "What did you notice first?",
      angle: "Explain the moment casual fans missed."
    },
    "MMA Drama": {
      postType: "Debate",
      pattern: "Controversy",
      emotion: "Reaction + Opinion",
      goal: "Comments",
      cta: "Whose side are you on?",
      angle: "Frame both sides without overexplaining."
    },
    "Gym Humor": {
      postType: "Meme",
      pattern: "Relatable Joke",
      emotion: "Funny + Familiar",
      goal: "Shares and tags",
      cta: "Tag the person who does this.",
      angle: "Make the gym behavior instantly recognizable."
    },
    "Strength Motivation": {
      postType: "Motivation",
      pattern: "Discipline Reminder",
      emotion: "Grit + Focus",
      goal: "Saves",
      cta: "Save this for the next hard day.",
      angle: "Make the boring work feel important."
    },
    "Youth Sports Parents": {
      postType: "Relatable",
      pattern: "Parent Behavior",
      emotion: "Recognition + Tension",
      goal: "Comments and shares",
      cta: "Have you seen this parent?",
      angle: "Say the quiet part parents recognize."
    },
    "Combat Sports News": {
      postType: "News Breakdown",
      pattern: "Headline Context",
      emotion: "Curiosity",
      goal: "Clicks and comments",
      cta: "What does this change?",
      angle: "Explain why the headline matters."
    },
    "Wrestling Technique": {
      postType: "Coach Tip",
      pattern: "Technical Detail",
      emotion: "Useful + Clear",
      goal: "Saves",
      cta: "Save this before practice.",
      angle: "Teach one detail people can use."
    },
    "Underdog Stories": {
      postType: "Comeback Story",
      pattern: "Turning Point",
      emotion: "Belief + Momentum",
      goal: "Shares",
      cta: "Never count someone out.",
      angle: "Build the story around the turning point."
    }
  };

  return blueprints[page] || {
    postType: "Standard",
    pattern: "General Post",
    emotion: "Curiosity",
    goal: "Engagement",
    cta: "What do you think?",
    angle: "Make the idea simple and easy to react to."
  };
}

function buildCaption(idea, blueprint) {
  const title = idea.title || "This moment";
  const notes = String(idea.notes || "").trim();

  if (blueprint.postType === "Breakdown") {
    return `${title}

Most people watched the obvious part.

But the real story is the detail that changed everything.

${notes ? notes + "\n\n" : ""}${blueprint.cta}`;
  }

  if (blueprint.postType === "Story") {
    return `${title}

A lot of people forgot how different this used to be.

But if you were around it, you remember.

${notes ? notes + "\n\n" : ""}${blueprint.cta}`;
  }

  if (blueprint.postType === "Meme") {
    return `${title}

Every gym has this person.

Some of us have been this person.

${notes ? notes + "\n\n" : ""}${blueprint.cta}`;
  }

  if (blueprint.postType === "Debate") {
    return `${title}

There are two sides to this.

And both sides think they are right.

${notes ? notes + "\n\n" : ""}${blueprint.cta}`;
  }

  if (blueprint.postType === "Coach Tip") {
    return `${title}

This is the detail that changes the position.

Simple. Boring. Effective.

${notes ? notes + "\n\n" : ""}${blueprint.cta}`;
  }

  if (blueprint.postType === "Motivation") {
    return `${title}

Nobody gets better from hype alone.

The boring reps are usually the ones that count.

${notes ? notes + "\n\n" : ""}${blueprint.cta}`;
  }

  return `${title}

${blueprint.angle}

${notes ? notes + "\n\n" : ""}${blueprint.cta}`;
}

function buildContent(idea) {
  const page = getIdeaCategory(idea);
  const blueprint = getContentBlueprint(page);

  return {
    ideaId: idea.id,
    title: idea.title,
    page,
    postType: blueprint.postType,
    pattern: blueprint.pattern,
    angle: blueprint.angle,
    emotion: blueprint.emotion,
    goal: blueprint.goal,
    cta: blueprint.cta,
    strategy: `Post Type:
${blueprint.postType}

Pattern:
${blueprint.pattern}

Angle:
${blueprint.angle}

Emotion:
${blueprint.emotion}

Goal:
${blueprint.goal}

CTA:
${blueprint.cta}`,
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
  hookOutput.textContent = content.strategy;
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
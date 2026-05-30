const ideaSelect = document.getElementById("ideaSelect");
const generateContentBtn = document.getElementById("generateContentBtn");

const hookOutput = document.getElementById("hookOutput");
const captionOutput = document.getElementById("captionOutput");
const hashtagsOutput = document.getElementById("hashtagsOutput");

function loadIdeasIntoSelect() {
  const ideas = gmGetIdeas();

  ideaSelect.innerHTML = "";

  ideas.forEach((idea) => {
    const option = document.createElement("option");
    option.value = idea.id;
    option.textContent = `${idea.title} — ${idea.page}`;
    ideaSelect.appendChild(option);
  });
}

function buildContent(idea) {
  return {
    hook: `This one gets people talking: ${idea.title}`,

    caption: `${idea.title}

${idea.notes || "A simple post built from a strong idea."}

What do you think?`,

    hashtags: getHashtags(idea.page)
  };
}

function getHashtags(page) {
  const tags = {
    "Wrestling Highlights": "#wrestling #wrestlinglife #ncaawrestling #combatsports",
    "Wrestling History": "#wrestlinghistory #wrestlinglife #combatsports",
    "MMA Moments": "#mma #ufc #combatsports #fightlife",
    "MMA Drama": "#mma #ufc #fightnews #combatsports",
    "Gym Humor": "#gymhumor #fitnesslife #gymmemes #workout",
    "Strength Motivation": "#strengthtraining #motivation #discipline #fitness",
    "Youth Sports Parents": "#youthsports #sportsparents #coaching #parentlife",
    "Combat Sports News": "#combatsports #mma #wrestling #fightnews",
    "Wrestling Technique": "#wrestlingtechnique #wrestlingcoach #wrestlinglife",
    "Underdog Stories": "#underdog #sportsstory #comeback #motivation"
  };

  return tags[page] || "#content #media #viral";
}

generateContentBtn.addEventListener("click", () => {
  const ideas = gmGetIdeas();
  const selectedId = Number(ideaSelect.value);

  const idea = ideas.find((item) => Number(item.id) === selectedId);

  if (!idea) return;

  const content = buildContent(idea);

  hookOutput.textContent = content.hook;
  captionOutput.textContent = content.caption;
  hashtagsOutput.textContent = content.hashtags;
});

loadIdeasIntoSelect();
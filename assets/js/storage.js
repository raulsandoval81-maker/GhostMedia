const GM_KEYS = {
  ideas: "ghostmedia-ideas"
};

function gmGetIdeas() {
  return JSON.parse(localStorage.getItem(GM_KEYS.ideas) || "[]");
}

function gmSaveIdeas(ideas) {
  localStorage.setItem(GM_KEYS.ideas, JSON.stringify(ideas));
}
function gmGetQueue() {
  return JSON.parse(localStorage.getItem("ghostmedia-queue") || "[]");
}

function gmSaveQueue(queue) {
  localStorage.setItem("ghostmedia-queue", JSON.stringify(queue));
}
function gmUpdateIdeaStatus(id, status) {
  const ideas = gmGetIdeas();

  const updated = ideas.map((idea) => {
    if (String(idea.id) === String(id)) {
      return {
        ...idea,
        status,
        updatedAt: new Date().toISOString()
      };
    }

    return idea;
  });

  gmSaveIdeas(updated);
}
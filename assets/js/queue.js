const queueReady =
  document.getElementById("queueReady");

const queueQueued =
  document.getElementById("queueQueued");

const queuePosted =
  document.getElementById("queuePosted");

function getQueueItems() {
  const ideas =
    gmGetIdeas();

  const carouselQueue =
    JSON.parse(
      localStorage.getItem("ghost-queue") || "[]"
    );

  const carouselItems =
    carouselQueue.map((item) => ({
      id: item.id,
      title: item.title || "Queued Carousel",
      type: item.type || "carousel",
      status: item.status || "QUEUED",
      caption: item.payload?.caption || "",
      hashtags: item.payload?.hashtags || "",
      slides: item.slides || [],
      payload: item.payload || {},
      source: "carousel"
    }));

  return [
    ...ideas,
    ...carouselItems
  ];
}

function renderQueue() {
  const items =
    getQueueItems();

  queueReady.innerHTML = "";
  queueQueued.innerHTML = "";
  queuePosted.innerHTML = "";

  items.forEach((item) => {
    const row =
      document.createElement("div");

    row.className = "page-card";

    const status =
      String(item.status || "")
        .toUpperCase();

    const title =
      item.title || "Untitled";

    const label =
      item.page ||
      item.genre ||
      item.type ||
      "Uncategorized";

    if (
      status === "IDEA" ||
      status === "NEW"
    ) {
      row.innerHTML = `
        <h3>${title}</h3>
        <p>${label}</p>

        <div class="btn-row">
          <button
            class="btn"
            onclick="moveIdea('${item.id}','QUEUED')">
            📦 Queue
          </button>

          <button
            class="btn"
            onclick="deleteIdea('${item.id}')">
            🗑 Delete
          </button>
        </div>
      `;

      queueReady.appendChild(row);
    }

    if (status === "QUEUED") {
      row.innerHTML = `
        <h3>${title}</h3>
        <p>${label}</p>

        <div class="btn-row">
          <button
            class="btn"
            onclick="previewCarousel('${item.id}')">
            🎠 Preview
          </button>

          <button
            class="btn"
            onclick="toggleReview('${item.id}')">
            📋 Copy - 📦 Package

          </button>

          <button
            class="btn"
            onclick="markPosted('${item.id}', '${item.source || "idea"}')">
            🚀 Mark Posted
          </button>
        </div>

        <div
          id="review-${item.id}"
          class="review-panel"
          style="display:none;"
        >
          ${
            item.caption
              ? `
                <h4>Caption</h4>
                <p>${item.caption}</p>
              `
              : ""
          }

          ${
            item.hashtags
              ? `
                <h4>Hashtags</h4>
                <p>${item.hashtags}</p>
              `
              : ""
          }

          <button
            class="btn"
            onclick="copyContent('${item.id}')">
            📋 Copy - 📦 Package

          </button>
        </div>
      `;

      queueQueued.appendChild(row);
    }

    if (status === "POSTED") {
      row.innerHTML = `
        <h3>${title}</h3>
        <p>${label}</p>

        <span class="status-pill">
          POSTED
        </span>
      `;

      queuePosted.appendChild(row);
    }
  });
}

function previewCarousel(id) {
  const items =
    getQueueItems();

  const item =
    items.find(
      x => String(x.id) === String(id)
    );

  if (!item) return;

  const payload =
    item.payload && Object.keys(item.payload).length
      ? item.payload
      : {
          slide1: item.slides?.[0] || item.title || "Slide 1",
          slide2: item.slides?.[1] || "Slide 2",
          slide3: item.slides?.[2] || "Slide 3",
          slide4: item.slides?.[3] || "Slide 4",
          slide5: item.slides?.[4] || "Slide 5",
          caption: item.caption || "",
          hashtags: item.hashtags || ""
        };

  localStorage.setItem(
    "ghost-carousel-payload",
    JSON.stringify(payload)
  );

  window.location.href = "/carousel/";
}

function toggleReview(id) {
  const panel =
    document.getElementById(`review-${id}`);

  if (!panel) return;

  panel.style.display =
    panel.style.display === "none"
      ? "block"
      : "none";
}

function copyContent(id) {
  const items =
    getQueueItems();

  const item =
    items.find(
      x => String(x.id) === String(id)
    );

  if (!item) return;

  const text = [
    item.caption || "",
    "",
    item.hashtags || ""
  ].join("\n").trim();

  navigator.clipboard.writeText(text);

  alert("Caption and hashtags copied.");
}

function markPosted(id, source) {
  if (source === "carousel") {
    const queue =
      JSON.parse(
        localStorage.getItem("ghost-queue") || "[]"
      );

    const updated =
      queue.map((item) => {
        if (String(item.id) === String(id)) {
          return {
            ...item,
            status: "POSTED",
            postedAt: new Date().toISOString()
          };
        }

        return item;
      });

    localStorage.setItem(
      "ghost-queue",
      JSON.stringify(updated)
    );

    window.location.href =
      "/dashboard/winners.html";

    return;
  }

  moveIdea(id, "POSTED");
}

function moveIdea(id, status) {
  gmUpdateIdeaStatus(id, status);

  if (status === "POSTED") {
    window.location.href =
      "/dashboard/winners.html";

    return;
  }

  renderQueue();
}

function deleteIdea(id) {
  if (!confirm("Delete this item?")) {
    return;
  }

  const ideas =
    gmGetIdeas().filter(
      idea =>
        String(idea.id) !==
        String(id)
    );

  gmSaveIdeas(ideas);

  renderQueue();
}

renderQueue();
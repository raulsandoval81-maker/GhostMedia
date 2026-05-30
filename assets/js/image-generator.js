const payload = JSON.parse(
  localStorage.getItem("ghost-image-payload") || "{}"
);

const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const preview = document.getElementById("preview");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

titleInput.value = payload.title || "";
bodyInput.value = payload.body || "";

function renderPreview() {
  const title = titleInput.value.trim() || "Ghost Loop Slide";
  const body = bodyInput.value.trim();

  preview.innerHTML = `
    <div class="slide-preview">
      <div class="slide-badge">1/5</div>

      <div class="slide-main">
        <h1>${title}</h1>
        ${body ? `<p>${body}</p>` : ""}
      </div>

      <div class="slide-footer">
        <div class="ghost">👻</div>
        <strong>GHOST LOOP HQ</strong>
        <span>SIGNALS. PATTERNS. STORIES.</span>
      </div>
    </div>
  `;
}

if (generateBtn) {
  generateBtn.addEventListener("click", renderPreview);
}

if (downloadBtn) {
  downloadBtn.addEventListener("click", async () => {
    const slide = document.querySelector(".slide-preview");

    if (!slide) {
      alert("Generate preview first.");
      return;
    }

    if (typeof html2canvas === "undefined") {
      alert("Download tool not loaded yet. Refresh and try again.");
      return;
    }

    const canvas = await html2canvas(slide, {
      scale: 2,
      backgroundColor: null
    });

    const link = document.createElement("a");

    link.download = `${
      titleInput.value.trim() || "ghost-loop-slide"
    }.png`;

    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

renderPreview();
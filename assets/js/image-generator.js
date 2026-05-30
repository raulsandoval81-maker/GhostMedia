const payload = JSON.parse(localStorage.getItem("ghost-image-payload") || "{}");

const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const preview = document.getElementById("preview");
const generateBtn = document.getElementById("generateBtn");

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
    
<div class="slide-footer">
  <div class="ghost">👻</div>
  <strong>GHOST LOOP HQ</strong>
  <span>SIGNALS • PATTERNS • STORIES</span>
</div>

  `;
}

generateBtn.addEventListener("click", renderPreview);
renderPreview();

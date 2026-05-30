const payload =
  JSON.parse(
    localStorage.getItem(
      "ghost-image-payload"
    ) || "{}"
  );

const titleInput =
  document.getElementById("title");

const bodyInput =
  document.getElementById("body");

const preview =
  document.getElementById("preview");

if (payload.title) {
  titleInput.value = payload.title;
}

if (payload.body) {
  bodyInput.value = payload.body;
}

document
  .getElementById("generateBtn")
  .addEventListener("click", () => {

    preview.innerHTML = `
      <div class="slide-preview">

        <h1>
          ${titleInput.value}
        </h1>

        <p>
          ${bodyInput.value}
        </p>

      </div>
    `;

  });
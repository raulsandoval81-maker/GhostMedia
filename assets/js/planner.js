const plannerOutput =
  document.getElementById("plannerOutput");

const autoPlanBtn =
  document.getElementById("autoPlanBtn");

autoPlanBtn?.addEventListener(
  "click",
  buildWeek
);

buildWeek();

function buildWeek() {

  const queue =
    JSON.parse(
      localStorage.getItem("ghost-queue") || "[]"
    );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  plannerOutput.innerHTML = "";

  days.forEach((day, index) => {

    const item = queue[index];

    plannerOutput.innerHTML += `

      <div class="card">

        <h2>${day}</h2>

        <p>
          ${
            item
              ? item.title
              : "No content scheduled"
          }
        </p>

      </div>

    `;

  });

}
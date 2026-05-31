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

  const weekPlan = [
    {
      day: "Monday",
      am: "Wrestling History",
      pm: "Youth Sports Parents"
    },
    {
      day: "Tuesday",
      am: "MMA Drama",
      pm: "Coaching"
    },
    {
      day: "Wednesday",
      am: "Technique",
      pm: "Underdog"
    },
    {
      day: "Thursday",
      am: "Humor",
      pm: "Combat Culture"
    },
    {
      day: "Friday",
      am: "Boxing",
      pm: "Wrestling History"
    }
  ];

  plannerOutput.innerHTML = "";

  weekPlan.forEach((slot) => {

    plannerOutput.innerHTML += `
      <div class="card">

        <h2>${slot.day}</h2>

        <div class="page">
          <strong>6:00 AM</strong>
          <span>${slot.am}</span>
        </div>

        <div class="page">
          <strong>6:00 PM</strong>
          <span>${slot.pm}</span>
        </div>

      </div>
    `;

  });

}
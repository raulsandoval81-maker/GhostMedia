const opportunityList =
  document.getElementById("opportunityList");

function renderOpportunities() {

  const patterns = [
    {
      name: "Parenting + Humor",
      score: 92
    },
    {
      name: "Underdog Stories",
      score: 80
    },
    {
      name: "Wrestling Technique",
      score: 70
    },
    {
      name: "MMA Drama",
      score: 55
    }
  ];

  opportunityList.innerHTML = "";

  patterns.forEach(pattern => {

    const row =
      document.createElement("div");

    row.className = "page";

    row.innerHTML = `
      <div>
        <strong>${pattern.name}</strong>
        <div class="idea-note">
          Opportunity Score: ${pattern.score}
        </div>
      </div>
    `;

    opportunityList.appendChild(row);

  });

}

renderOpportunities();
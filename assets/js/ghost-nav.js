document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("ghostNav");
  if (!nav) return;

  nav.innerHTML = `
    <section class="ghost-room-nav">
      <a href="/dashboard/index.html">← Dashboard</a>
    </section>
  `;
});
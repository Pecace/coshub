document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("saveForm");
  const clearBtn = document.getElementById("clearBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: document.getElementById("title").value,
      device: document.getElementById("device").value,
      description: document.getElementById("description").value
    };

    // Aquí se envía a Google Sheets mediante un Web App de Google Apps Script
    await fetch("https://script.google.com/macros/s/AKfycbzp3FzT4m7yI6hBPzikhc88L-V5XjXdHLP8TKjSUk4nNjyp9Jt13oBC-GDmJANkVAwszA/exec", {
      method: "POST",
      body: JSON.stringify(data),
      /* headers: { "Content-Type": "application/json" }*/
    });

    alert("Save");
    form.reset();
  });

  clearBtn.addEventListener("click", () => {
    form.reset();
  });
});
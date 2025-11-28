// URL base de la API
const API_URL = "http://localhost:3000";

// Elementos del DOM
const categoryForm = document.getElementById("categoryForm");
const siteForm = document.getElementById("siteForm");
const siteCategorySelect = document.getElementById("siteCategory");

// Detectar tipo de formulario desde la URL
const params = new URLSearchParams(window.location.search);
const type = params.get("type");

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  if (type === "category") {
    categoryForm.classList.remove("hidden");
  } else {
    siteForm.classList.remove("hidden");
    loadCategories();
  }
});

// Cargar categorías en el select de sites
function loadCategories() {
  fetch(`${API_URL}/categories`)
    .then(r => r.json())
    .then(categories => {
      siteCategorySelect.innerHTML = "";
      categories.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        siteCategorySelect.appendChild(opt);
      });
    });
}

// Crear categoría
categoryForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("catName").value.trim();
  if (!name) return alert("Nombre obligatorio");

  fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  })
    .then(() => {
      alert("Categoría creada");
      window.location.href = "index.html";
    });
});

// Crear site
siteForm.addEventListener("submit", e => {
  e.preventDefault();

  const categoryId = siteCategorySelect.value;

  const payload = {
    name: document.getElementById("siteName").value.trim(),
    url: document.getElementById("siteUrl").value.trim(),
    user: document.getElementById("siteUser").value.trim(),
    password: document.getElementById("sitePassword").value.trim(),
    description: document.getElementById("siteDescription").value.trim()
  };

  fetch(`${API_URL}/categories/${categoryId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(() => {
      alert("Site creado");
      window.location.href = "index.html";
    });
});

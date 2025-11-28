// URL base de la API
const API_URL = "http://localhost:3000";

// Elementos del DOM
const catList = document.getElementById("categoriesList");
const sitesTitle = document.getElementById("sitesTitle");
const sitesContainer = document.getElementById("sitesContainer");
const catEmpty = document.getElementById("catEmpty");
const sitesEmpty = document.getElementById("sitesEmpty");

// Cargar categorías al iniciar
document.addEventListener("DOMContentLoaded", loadCategories);

// Cargar categorías desde API
function loadCategories() {
  fetch(`${API_URL}/categories`)
    .then(r => r.json())
    .then(data => renderCategories(data))
    .catch(() => showEmpty(catEmpty, "Error al cargar categorías"));
}

// Renderizar categorías
function renderCategories(categories) {
  catList.innerHTML = "";

  if (categories.length === 0) return showEmpty(catEmpty, "No hay categorías");
  hideEmpty(catEmpty);

  categories.forEach(cat => {
    const li = document.createElement("li");

    li.innerHTML = `
      <button class="cat-btn">${cat.name}</button>
      <button class="delete-cat-btn">🗑️</button>
    `;

    li.querySelector(".cat-btn").onclick = () =>
      loadSites(cat.id, cat.name);

    li.querySelector(".delete-cat-btn").onclick = () => {
      if (confirm(`¿Eliminar "${cat.name}"?`)) {
        fetch(`${API_URL}/categories/${cat.id}`, { method: "DELETE" })
          .then(() => {
            loadCategories();
            sitesContainer.innerHTML = "";
            sitesTitle.textContent = "Selecciona una categoría";
          })
          .catch(() => alert("Error eliminando categoría"));
      }
    };

    catList.appendChild(li);
  });
}

// Cargar sites de una categoría
function loadSites(catId, catName) {
  sitesTitle.textContent = `Sites de la categoría: ${catName}`;

  fetch(`${API_URL}/categories/${catId}`)
    .then(r => r.json())
    .then(data => renderSites(data.sites || []))
    .catch(() => showEmpty(sitesEmpty, "Error al cargar sites"));
}

// Renderizar sites
function renderSites(sites) {
  sitesContainer.innerHTML = "";

  if (sites.length === 0) return showEmpty(sitesEmpty, "No hay sites");
  hideEmpty(sitesEmpty);

  sites.forEach(site => {
    const card = document.createElement("div");
    card.className = "site-card";

    card.innerHTML = `
      <h3>${site.name}</h3>
      <p><strong>Usuario:</strong> ${site.user}</p>
      <p><strong>Descripción:</strong> ${site.description || "Sin descripción"}</p>
      <a href="${site.url}" target="_blank">🌐 Visitar sitio</a>

      <div class="password-block">
        <input type="password" value="${site.password}" readonly />
        <button class="toggle-btn">👁️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    const passInput = card.querySelector("input");
    const toggle = card.querySelector(".toggle-btn");

    toggle.onclick = () => {
      passInput.type = passInput.type === "password" ? "text" : "password";
    };

    card.querySelector(".delete-btn").onclick = () => {
      fetch(`${API_URL}/sites/${site.id}`, { method: "DELETE" })
        .then(() => card.remove())
        .catch(() => alert("Error eliminando site"));
    };

    sitesContainer.appendChild(card);
  });
}

// Mostrar mensaje vacío
function showEmpty(el, msg) {
  el.textContent = msg;
  el.style.display = "block";
}

// Ocultar mensaje vacío
function hideEmpty(el) {
  el.style.display = "none";
}


const API_URL = "http://localhost:3000";
const catList = document.getElementById("category-list");
const searchInput = document.getElementById("search");
const btnAddCategory = document.getElementById("btn-add-category");

let categories = [];

function printCategories(catData) {
  catList.innerHTML = "";
  const filter = searchInput.value.toLowerCase();

  catData.forEach(cat => {
    if (!cat.name.toLowerCase().includes(filter)) return;

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = cat.name;
    span.style.cursor = "pointer";
    span.onclick = () => window.location.href = `site.html?category=${cat.id}&name=${encodeURIComponent(cat.name)}`;

    const btnDel = document.createElement("button");
    btnDel.textContent = "Eliminar";
    btnDel.onclick = (e) => {
      e.stopPropagation();
      fetch(`${API_URL}/categories/${cat.id}`, { method: "DELETE" })
        .then(loadCategories);
    };

    li.appendChild(span);
    li.appendChild(btnDel);
    catList.appendChild(li);
  });
}

function loadCategories() {
  fetch(`${API_URL}/categories`)
    .then(res => res.json())
    .then(data => {
      categories = data;
      printCategories(categories);
    });
}

searchInput.addEventListener("input", () => printCategories(categories));

btnAddCategory.addEventListener("click", () => {
  const name = prompt("Nombre de la nueva categoría:");
  if (!name) return alert("El nombre es obligatorio");
  fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  }).then(loadCategories);
});

loadCategories();

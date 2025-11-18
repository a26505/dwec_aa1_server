const API_URL = "http://localhost:3000";
const siteList = document.getElementById("site-list");
const siteTitle = document.getElementById("site-title");
const searchInput = document.getElementById("search-site");

const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get("category");
const categoryName = urlParams.get("name");
siteTitle.textContent = `Sites de la categoría: ${categoryName}`;

let sites = [];

function printSites(siteData) {
  siteList.innerHTML = "";
  const filter = searchInput.value.toLowerCase();

  siteData.forEach(site => {
    if (!site.name.toLowerCase().includes(filter) && !site.user.toLowerCase().includes(filter)) return;

    const li = document.createElement("li");
    li.innerHTML = `<strong>${site.name}</strong> (${site.user})`;

    const passInput = document.createElement("input");
    passInput.type = "password";
    passInput.value = site.password;
    passInput.readOnly = true;
    passInput.style.marginLeft = "10px";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Mostrar";
    toggleBtn.onclick = () => {
      if (passInput.type === "password") {
        passInput.type = "text";
        toggleBtn.textContent = "Ocultar";
      } else {
        passInput.type = "password";
        toggleBtn.textContent = "Mostrar";
      }
    };

    const btnDel = document.createElement("button");
    btnDel.textContent = "Eliminar";
    btnDel.onclick = () => {
      fetch(`${API_URL}/sites/${site.id}`, { method: "DELETE" })
        .then(loadSites);
    };

    li.appendChild(passInput);
    li.appendChild(toggleBtn);
    li.appendChild(btnDel);
    siteList.appendChild(li);
  });
}

function loadSites() {
  fetch(`${API_URL}/categories/${categoryId}`)
    .then(res => res.json())
    .then(data => {
      sites = data.sites || [];
      printSites(sites);
    });
}

searchInput.addEventListener("input", () => printSites(sites));

loadSites();

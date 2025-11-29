const categoriesList = document.getElementById("categoriesList");
const sitesList = document.getElementById("sitesList");
const selectedCategoryTitle = document.getElementById("selectedCategoryTitle");
const addSiteSection = document.getElementById("addSiteSection");

let currentCategory = null;

async function loadCategories() {
    const categories = await api.listCategories();
    categoriesList.innerHTML = "";

    categories.forEach(cat => {
        const div = document.createElement("div");
        div.className = "category-item";
        div.innerHTML = `
          <span>${cat.name}</span>
          <button class="delete" data-id="${cat.id}">X</button>
        `;

        div.onclick = () => selectCategory(cat.id, cat.name);
        div.querySelector(".delete").onclick = (e) => {
            e.stopPropagation();
            deleteCategory(cat.id);
        };

        if (currentCategory === cat.id) div.classList.add("active");
        categoriesList.appendChild(div);
    });
}

async function selectCategory(id, name) {
    currentCategory = id;
    selectedCategoryTitle.textContent = name;
    addSiteSection.classList.remove("hidden");
    await loadSites();
    loadCategories();
}

async function loadSites() {
    const data = await api.listCategorySites(currentCategory);
    sitesList.innerHTML = "";

    data.forEach(site => {
        const card = document.createElement("div");
        card.className = "site-card";
        card.innerHTML = `
          <h3>${site.name}</h3>
          <p>${site.description}</p>
          <p class="muted">${site.url}</p>
          <button class="delete" data-id="${site.id}">Eliminar</button>
        `;

        card.querySelector("button").onclick = () => deleteSite(site.id);

        sitesList.appendChild(card);
    });
}

document.getElementById("addCategoryBtn").onclick = async () => {
    const name = document.getElementById("newCategoryName").value.trim();
    if (!name) return;

    await api.addNewCategory({name});
    document.getElementById("newCategoryName").value = "";
    loadCategories();
};

document.getElementById("addSiteBtn").onclick = async () => {
    const site = {
        name: document.getElementById("siteName").value,
        url: document.getElementById("siteUrl").value,
        user: document.getElementById("siteUser").value,
        password: document.getElementById("sitePassword").value,
        description: document.getElementById("siteDescription").value,
    };

    await api.addNewSite(site, currentCategory);
    loadSites();
};

async function deleteSite(id) {
    await api.deleteSite(id);
    loadSites();
}

async function deleteCategory(id) {
    await api.deleteCategory(id);
    if (id === currentCategory) {
        currentCategory = null;
        sitesList.innerHTML = "";
        addSiteSection.classList.add("hidden");
        selectedCategoryTitle.textContent = "Selecciona una categoría";
    }
    loadCategories();
}

loadCategories();

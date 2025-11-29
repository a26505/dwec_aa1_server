document.addEventListener("DOMContentLoaded", loadCategories);

async function loadCategories() {
    const container = document.getElementById("category-list");
    const categories = await api.listCategories();

    container.innerHTML = categories.map(cat => `
        <div class="item">
            <b>${cat.name}</b>
            <button onclick="showSites(${cat.id})">Ver</button>
            <button onclick="deleteCategory(${cat.id})">Eliminar</button>
            <a class="btn" href="form.html?type=site&category=${cat.id}">Añadir site</a>
        </div>
    `).join("");
}

async function showSites(id) {
    const container = document.getElementById("site-list");
    const sites = await api.listCategorySites(id);

    container.innerHTML = sites.length === 0
        ? "<i>No hay sites en esta categoría</i>"
        : sites.map(s => `
            <div class="item">
                <b>${s.name}</b> — ${s.url}
                <button onclick="deleteSite(${s.id})">Eliminar</button>
            </div>
        `).join("");
}

async function deleteCategory(id) {
    await api.deleteCategory(id);
    loadCategories();
    document.getElementById("site-list").innerHTML = "";
}

async function deleteSite(id) {
    await api.deleteSite(id);
    document.getElementById("site-list").innerHTML = "";
}

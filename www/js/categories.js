let currentCategoryId = null;

const ICON_MAP = {
    'Redes Sociales': 'fa-brands fa-square-share-nodes',
    'Banca': 'fa-solid fa-building-columns',
    'Trabajo': 'fa-solid fa-briefcase',
    'Personal': 'fa-solid fa-house',
    'default': 'fa-solid fa-folder'
};

const getIconClass = (categoryName) => {
    const iconKey = Object.keys(ICON_MAP).find(key => categoryName.toLowerCase().includes(key.toLowerCase()));
    return ICON_MAP[iconKey] || ICON_MAP.default;
};

const renderCategories = async () => {
    const categoryList = document.getElementById("categoryList");
    const categories = await api.listCategories();
    categoryList.innerHTML = '';

    if (categories.length > 0 && currentCategoryId === null) {
        currentCategoryId = categories[0].id;
    }

    categories.forEach(cat => {
        const li = document.createElement("li");
        li.className = `category-item ${cat.id === currentCategoryId ? 'active' : ''}`;
        li.innerHTML = `
            <div class="category-info" data-id="${cat.id}">
                <span><i class="${getIconClass(cat.name)}"></i></span>
                ${cat.name}
            </div>
            <div class="category-actions">
                <button class="btn-delete" data-id="${cat.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        categoryList.appendChild(li);

        li.querySelector(".category-info").addEventListener("click", () => {
            currentCategoryId = cat.id;
            renderCategories();
            renderSites();
        });

        li.querySelector(".btn-delete").addEventListener("click", async (event) => {
            event.stopPropagation();
            const confirmResult = await Swal.fire({title: '¿Eliminar?', icon: 'warning', showCancelButton: true});
            if (confirmResult.isConfirmed) {
                await api.deleteCategory(cat.id);
                currentCategoryId = null;
                renderCategories();
                renderSites();
            }
        });
    });
};

const renderSites = async () => {
    const siteList = document.getElementById("siteList");
    siteList.innerHTML = '';

    if (currentCategoryId === null) {
        siteList.innerHTML = `<li class="site-item">Selecciona una categoría para ver los sitios.</li>`;
        return;
    }

    const sitesToRender = await api.listCategorySites(currentCategoryId);
    const categories = await api.listCategories();
    const activeCategory = categories.find(c => c.id === currentCategoryId);
    const categoryName = activeCategory ? activeCategory.name : 'Desconocida';

    if (sitesToRender.length === 0) {
        siteList.innerHTML = `<li class="site-item">No hay sitios guardados en **${categoryName}**.</li>`;
        return;
    }

    sitesToRender.forEach(site => {
        const li = document.createElement("li");
        li.className = "site-item";

        const displayUsername = site.user || site.username || 'N/A';

        li.innerHTML = `
            <div>
                <strong>${site.name}</strong>
                <br>
                <small>${displayUsername} (${categoryName})</small>
            </div>
            <div class="site-actions" data-pass="${site.password}">
                <button class="btn-show-pass" data-id="${site.id}"><i class="fas fa-eye"></i> Mostrar</button>
                <button class="btn-delete" data-id="${site.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        siteList.appendChild(li);

        li.querySelector(".btn-show-pass").addEventListener("click", (event) => {
            const actions = event.currentTarget.closest('.site-actions');
            const password = actions.getAttribute("data-pass");

            if (actions.querySelector('.password-display')) {
                renderSites();
            } else {
                actions.innerHTML = `
                    <span class="password-display">${password}</span>
                    <button class="btn-ocultar" data-id="${site.id}"><i class="fas fa-eye-slash"></i> Ocultar</button>
                    <button class="btn-delete" data-id="${site.id}"><i class="fas fa-trash"></i></button>
                `;
                actions.querySelector(".btn-ocultar").addEventListener("click", () => renderSites());
                actions.querySelector(".btn-delete").addEventListener("click", handleSiteDelete(site.id));
            }
        });

        li.querySelector(".btn-delete").addEventListener("click", handleSiteDelete(site.id));
    });
};

const handleSiteDelete = (siteId) => async (event) => {
    event.stopPropagation();
    const confirmResult = await Swal.fire({
        title: '¿Eliminar?',
        text: "El sitio se eliminará.",
        icon: 'warning',
        showCancelButton: true
    });

    if (confirmResult.isConfirmed) {
        const deleteResult = await api.deleteSite(siteId);
        if (deleteResult === true) {
            renderSites();
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderSites();

    const searchBox = document.getElementById("searchBox");
    searchBox.addEventListener("keyup", (event) => {
        const query = event.target.value.toLowerCase();

        document.querySelectorAll("#categoryList .category-item").forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(query) ? 'flex' : 'none';
        });

        document.querySelectorAll("#siteList .site-item").forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(query) ? 'grid' : 'none';
        });
    });
});

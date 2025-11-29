const API_BASE_URL = "http://localhost:3000";

class Api {

    async listCategories() {
        const r = await fetch(`${API_BASE_URL}/categories`);
        if (!r.ok) throw new Error("Error cargando categorías");
        return r.json();
    }

    async listCategorySites(id) {
        const r = await fetch(`${API_BASE_URL}/categories/${id}`);
        if (!r.ok) throw new Error("Error cargando sitios");
        return r.json();
    }

    async addNewCategory(categoryData) {
        const r = await fetch(`${API_BASE_URL}/categories`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(categoryData)
        });

        if (!r.ok) throw new Error(await r.text());
        return r.json();
    }

    async addNewSite(siteData, categoryId) {
        const r = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(siteData)
        });

        if (!r.ok) throw new Error(await r.text());
        return r.json();
    }

    async deleteSite(id) {
        const r = await fetch(`${API_BASE_URL}/sites/${id}`, { method: "DELETE" });
        if (!r.ok) throw new Error("Error eliminando site");
        return r.json();
    }

    async deleteCategory(id) {
        const r = await fetch(`${API_BASE_URL}/categories/${id}`, { method: "DELETE" });
        if (!r.ok) throw new Error("Error eliminando categoría");
        return r.json();
    }
}

window.api = new Api();

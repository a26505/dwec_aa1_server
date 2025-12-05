const API_BASE_URL = "http://localhost:3000";

class Api {
    async listCategories() {
        try {
            const reply = await fetch(`${API_BASE_URL}/categories`);
            if (!reply.ok) throw new Error("Error cargando categorías");
            return await reply.json();
        } catch (error) {
            Swal.fire("Error de Conexión", "Revisa que tu backend esté corriendo en :3000.", "error");
            return [];
        }
    }

    async listCategorySites(categoryId) {
        try {
            const reply = await fetch(`${API_BASE_URL}/categories/${categoryId}`); 
            if (!reply.ok) throw new Error("Error cargando sitios");
            
            const data = await reply.json();
            return data.sites || []; 

        } catch (error) {
            Swal.fire("Error", "No se pudieron cargar los sitios de la categoría", "error");
            return [];
        }
    }

    async addNewSite(siteData, CategoryId) {
        const url = `${API_BASE_URL}/categories/${CategoryId}`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(siteData)
        };

        try {
            const reply = await fetch(url, options);

            if (!reply.ok) {
                const errorBody = await reply.text(); 
                throw new Error(`Errooooor ${reply.status}: ${errorBody || reply.statusText}`)
            }

            return await reply.json();

        } catch (error) {
            console.error(`Error al añadir un site a la categoría con ese ID ${CategoryId}:`, error);
            Swal.fire("Error", "No se pudo crear el sitio.", "error");
            throw error;
        }
    }
    
    async deleteCategory(id) {
        try {
            const reply = await fetch(`${API_BASE_URL}/categories/${id}`, { method: "DELETE" });
            if (!reply.ok) throw new Error("Error eliminando categoría");
            return reply.json();
        } catch (error) {
            Swal.fire("Error", "No se pudo eliminar la categoría", "error");
        }
    }

    async deleteSite(id) {
        try {
            const reply = await fetch(`${API_BASE_URL}/sites/${id}`, { method: "DELETE" });
            
            if (!reply.ok) {
                throw new Error("Error eliminando sitio. Código: " + reply.status);
            }
            
            return true; 

        } catch (error) {
            console.error("Error real o de parseo:", error);
            Swal.fire("Error", "No se pudo eliminar el sitio", "error");
            return false;
        }
    }
}

window.api = new Api();

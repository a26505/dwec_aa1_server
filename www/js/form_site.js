document.addEventListener("DOMContentLoaded", async () => {
    const formSite = document.getElementById("formSite");
    const genPassBtn = document.getElementById("genPass");
    const selectCat = document.getElementById("siteCategory");

    const cats = await api.listCategories();
    selectCat.innerHTML = "<option value=''>Selecciona categoría</option>";
    cats.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        selectCat.appendChild(opt);
    });

    formSite.addEventListener("submit", async (event) => {
        event.preventDefault();

        const categoryId = selectCat.value;
        const siteData = {
            name: document.getElementById("siteName").value.trim(),
            user: document.getElementById("siteUser").value.trim(),
            password: document.getElementById("sitePass").value,
            url: "",
            description: ""
        };

        if (!categoryId || !siteData.name || !siteData.user || !siteData.password) {
            Swal.fire("Error", "Debes rellenar todos los campos obligatorios.", "error");
            return;
        }

        try {
            const newSite = await api.addNewSite(siteData, categoryId);
            if (newSite) {
                Swal.fire("Sitio guardado", "", "success").then(() => {
                    window.location.href = "index.html";
                });
            }
        } catch (error) {
            console.log("Creación de sitio fallida, el error fue manejado por api.js.");
        }
    });

    genPassBtn.addEventListener("click", () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let pwd = "";
        for (let i = 0; i < 16; i++) {
            pwd += chars[Math.floor(Math.random() * chars.length)];
        }
        document.getElementById("sitePass").value = pwd;
        Swal.fire("Contraseña generada", pwd, "success");
    });
});

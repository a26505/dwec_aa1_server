document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const categoryId = params.get("category");
    const form = document.getElementById("form");

    if (type === "category") {
        document.getElementById("title").textContent = "Nueva Categoría";

        form.innerHTML = `
            <input name="name" placeholder="Nombre" required>
            <button>Guardar</button>
        `;

        form.onsubmit = async e => {
            e.preventDefault();
            await api.addNewCategory({ name: form.name.value });
            location.href = "index.html";
        };

    } else {
        document.getElementById("title").textContent = "Nuevo Site";

        form.innerHTML = `
            <input name="name" placeholder="Nombre" required>
            <input name="url" placeholder="URL">
            <input name="user" placeholder="Usuario" required>
            <input name="password" placeholder="Contraseña" required>
            <textarea name="description" placeholder="Descripción"></textarea>
            <button>Guardar</button>
        `;

        form.onsubmit = async e => {
            e.preventDefault();

            await api.addNewSite({
                name: form.name.value,
                url: form.url.value,
                user: form.user.value,
                password: form.password.value,
                description: form.description.value
            }, categoryId);

            location.href = "index.html";
        };
    }
});

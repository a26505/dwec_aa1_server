document.addEventListener("DOMContentLoaded", () => {
  const formCat = document.getElementById("formCategory");

  formCat.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("catName").value.trim();
      if (!name) {
          Swal.fire("Error", "El nombre es obligatorio", "error");
          return;
      }

      await api.addCategory({ name });
      Swal.fire("Categoría creada", "", "success").then(() => {
          window.location.href = "index.html";
      });
  });
});

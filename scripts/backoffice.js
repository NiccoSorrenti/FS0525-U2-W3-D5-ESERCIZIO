const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYzk0N2Y0YmQ0NzAwMTU4NWIyMWQiLCJpYXQiOjE3NjI1MTExODgsImV4cCI6MTc2MzcyMDc4OH0.kIZhJcExd4IpVSftlcwPPndhx1Uc_KstqLn06HUg01U"; // Inserisci il tuo token

const form = document.getElementById("productForm");
const resetBtn = document.getElementById("resetBtn");
const listContainer = document.getElementById("productList");

let editId = null;

// Carica tutti i prodotti
const caricaProdotti = function () {
  fetch(API_URL, { headers: { Authorization: TOKEN } })
    .then((res) => {
      if (!res.ok) throw new Error("Errore nel caricamento prodotti");
      return res.json();
    })
    .then((products) => {
      listContainer.innerHTML = products
        .map(
          (p) => `
          <div class="product-card" style="border:1px solid #ccc; margin:10px; padding:10px;">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <p><strong>${p.brand}</strong> - €${p.price}</p>
            <img src="${p.imageUrl}" width="100" />
            <br />
            <button onclick="modificaProdotto('${p._id}')">Modifica</button>
            <button onclick="eliminaProdotto('${p._id}')">Elimina</button>
          </div>`
        )
        .join("");
    })
    .catch((err) => {
      console.error(err);
      listContainer.innerHTML = `<p>Errore nel caricamento dei prodotti.</p>`;
    });
}

// Crea o modifica prodotto
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const product = {
    name: form.name.value.trim(),
    description: form.description.value.trim(),
    brand: form.brand.value.trim(),
    imageUrl: form.imageUrl.value.trim(),
    price: parseFloat(form.price.value),
  };

  if (Object.values(product).some((v) => !v)) {
    alert("Compila tutti i campi prima di salvare!");
    return;
  }

  const method = editId ? "PUT" : "POST";
  const url = editId ? API_URL + editId : API_URL;

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
    body: JSON.stringify(product),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((errData) => {
          console.log("Errore API:", errData);
          throw new Error("Errore durante il salvataggio");
        });
      }
      return res.json();
    })
    .then((data) => {
      alert(editId ? "Prodotto aggiornato!" : "Prodotto creato!");
      form.reset();
      editId = null;
      caricaProdotti();
    })
    .catch((err) => {
      console.error(err);
      alert("Errore durante la creazione/modifica del prodotto");
    });
});

// 🔄 Reset form
resetBtn.addEventListener("click", function () {
  form.reset();
  editId = null;
});

// Modifica prodotto
const modificaProdotto = function (id) {
  fetch(API_URL + id, { headers: { Authorization: TOKEN } })
    .then((res) => res.json())
    .then((product) => {
      form.name.value = product.name;
      form.description.value = product.description;
      form.brand.value = product.brand;
      form.imageUrl.value = product.imageUrl;
      form.price.value = product.price;
      editId = id;
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch((err) => console.error("Errore nel caricamento prodotto", err));
}

// Elimina prodotto
const eliminaProdotto = function (id) {
  if (!confirm("Vuoi davvero eliminare questo prodotto?")) return;

  fetch(API_URL + id, {
    method: "DELETE",
    headers: { Authorization: TOKEN },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Errore durante l'eliminazione");
      caricaProdotti();
    })
    .catch((err) => console.error(err));
}

// Se arrivi da homepage con ?id=xxx, pre-carica il prodotto
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
if (productId) editProduct(productId);

caricaProdotti();

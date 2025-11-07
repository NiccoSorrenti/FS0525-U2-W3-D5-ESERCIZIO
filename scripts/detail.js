const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYzk0N2Y0YmQ0NzAwMTU4NWIyMWQiLCJpYXQiOjE3NjI1MTExODgsImV4cCI6MTc2MzcyMDc4OH0.kIZhJcExd4IpVSftlcwPPndhx1Uc_KstqLn06HUg01U";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const mostraDettagli = function() {
  try {
    const res = fetch(API_URL + id, {
      headers: { Authorization: TOKEN },
    });
    if (!res.ok) throw new Error("Errore nel caricamento dettagli");

    const p = res.json();
    document.getElementById("details").innerHTML = `
      <h2>${p.name}</h2>
      <img src="${p.imageUrl}" width="200" />
      <p>${p.description}</p>
      <p><strong>${p.brand}</strong></p>
      <p>Prezzo: €${p.price}</p>
      <button onclick="window.location='backoffice.html?id=${p._id}'">Modifica</button>
      <button onclick="window.location='index.html'">Torna alla Home</button>
    `;
  } catch (error) {
    document.getElementById("details").innerHTML = "<p>Errore nel caricamento.</p>";
    console.error(error);
  }
}

mostraDettagli();

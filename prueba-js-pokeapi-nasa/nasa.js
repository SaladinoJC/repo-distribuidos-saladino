// apod.js
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = "xxbLiVxd2Yy5zdFiMDIg7rRA7OapZ5tkPge9IzxP";
const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function downloadAPOD() {
  try {
    const response = await axios.get(URL);
    const data = response.data;
    console.log(`Título: ${data.title}`);
    console.log(`Fecha: ${data.date}`);
    console.log(`Descripción: ${data.explanation}`);

    if (data.media_type === "image") {
      const imgResponse = await axios.get(data.url, { responseType: "arraybuffer" });
      const filename = path.join(__dirname, `apod_${data.date}.jpg`);
      fs.writeFileSync(filename, imgResponse.data);
      console.log(`Imagen descargada: ${filename}`);
    } else {
      console.log("La APOD de hoy no es una imagen (puede ser un video).");
    }

  } catch (error) {
    console.error("Error descargando la APOD:", error.message);
  }
}
downloadAPOD();

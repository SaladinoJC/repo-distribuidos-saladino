//`https://pokeapi.co/api/v2/pokemon/ditto`; 
//`https://pokeapi.co/api/v2/pokemon/2`
async function procesarDatos() {
 try { 
 let lista = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100`);
 const lista2= await lista.json()
// console.log(lista2)
 for (var i=0;i<=99; i++){
    const urlpokemon = lista2.results[i].url
    console.log(urlpokemon)
    try {
    let resultado = await fetch(urlpokemon);
    const result2= await resultado.json()
    //console.log(result2);
    const imageUrl = result2.sprites.front_default;
    const fs = require('fs');
    const https = require('https');
    const filePath =  `./pokemon-${i}.png`;
    https.get(imageUrl, (response) => {
  if (response.statusCode === 200) {
    const file = fs.createWriteStream(filePath);
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('✅ Imagen descargada con éxito.');
    });
  } else {
    console.error(`❌ Error al descargar: Código de estado ${response.statusCode}`);
  }
}).on('error', (err) => {
  console.error('❌ Error de red:', err.message);
});
    }
   catch (error){
    console.error("todo mal1", error)
   }
 }
 } catch (error) {
 console.error("todo mal");
 }}

procesarDatos();

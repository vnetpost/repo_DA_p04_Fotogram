import fs from "fs";
import path from "path";

const imagesFolder = path.join(process.cwd(), "./images"); // erzeugen vom Bilder-Pfad

const images = fs.readdirSync(imagesFolder) // Ich hab hier ein Array von Dateinamen
    .filter(file => /\.(png|jpe?g|gif|webp|svg)$/i.test(file)) // filtert nur Bilder
    .map(file => {
        const fileName = path.parse(file).name;
        return {
            url: `./assets/img/gallery/images/${file}`, // später im Browser nutzbar, ich meine in meinem JS
            fileName: fileName,
            altName: `Bild_von_${fileName}`
        };
    });

console.log(images);

// JSON Datei erzeugen
fs.writeFileSync("./images.json", JSON.stringify(images, null, 2));

// JavaScript-Datei mit Variable erzeugen
const jsContent = `const imagesList = ${JSON.stringify(images, null, 2)};\nexport default imagesList;`;

fs.writeFileSync("../../../src/data/imagesList.js", jsContent);







// fetch ist eine eingebaute Browser-Funktion (Browser-API)
// 1) Damit frage ich Daten über HTTP vom Server an.
// 2) Ergebnis: fetch gibt ein Promise zurück.
//    - Promise = ein „Versprechen“, dass in Zukunft ein Wert zurückkommt.
//    - In diesem Fall: ein Response-Objekt (HTTP-Antwort enthält Status, Header, Body usw.).

// fetch("./images.json")
//     .then(respObjekt => respObjekt.json()) // Der Body (als Text) wird als JSON interpretiert
//     // Das Ergebnis von respObject.json() ist wieder ein Promise, 
//     // das dann ein echtes JavaScript-Objekt oder -Array zurückgibt
//     .then(images => { // Jetzt haben wir tatsächlich ein Array von Objekten
//         console.log("Geladene Bilder:", images);

//         const ref_secAlbum = document.getElementById("secAlbum");
//         images.forEach(img => {
//             const newEl = document.createElement("img");
//             newEl.src = img.url;
//             newEl.alt = img.altName;
//             newEl.id = indexOf(img);

//             newEl.style.width = "200px"; // nur zum Test
//             newEl.style.margin = "10px";

//             ref_secAlbum.appendChild(newEl); // Add my new <img> to secAlbum 
//         });
//     })
//     .catch(err => console.error("Fehler beim Laden:", err));

import { mountGallery } from "./gallery.js";
import { currentIndex } from "./dialog.js";

mountGallery("idSecAlbum");

document.querySelectorAll("#idHeader, #idSecTitle, #idSecAlbum")
    .forEach((el) => el.classList.add("content"));

// #region Styling Arrows Button (wenn Arrow-img in button-Tags sind!)
document.querySelectorAll("#idDlgBtnGoLeft img, #idDlgBtnGoRight img")
    .forEach(el => {
        el.classList.add("dlgImgArrows")
        if (el.closest("button").id === "idDlgBtnGoLeft") {
            el.style.transform = 'rotate(180deg)';
        }
    });
// #endregion

// #region Make header/footer-Logos as a link (like a-Tag)

document.getElementById("logoArea").addEventListener("click", () => {
    console.log(window.location.href);
    window.location.assign(window.location.href); // im gleichen Tab
});

document.getElementById("da_logoArea").addEventListener("click", () => {
    console.log(window.location.href);
    window.open("https://developerakademie.com/", "_blank"); // im neuen Tab
});
// #endregion




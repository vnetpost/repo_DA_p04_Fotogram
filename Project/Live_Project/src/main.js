import { mountGallery } from "./gallery.js";
import { currentIndex } from "./dialog.js";

mountGallery("idSecAlbum");

document.querySelectorAll("#idHeader, #idSecTitle, #idSecAlbum")
    .forEach((el) => el.classList.add("content"));
document.querySelectorAll("#idHeader, #idSecTitle, #idSecAlbum")
    .forEach(function (el) {
        el.classList.add("content")
    });

// #region Styling Arrows Button (wenn Arrow-img in button-Tags sind!)
document.querySelectorAll("#idDlgBtnGoLeft img, #idDlgBtnGoRight img")
    .forEach(el => {
        el.classList.add("dlgImgArrows")
        //// I rotate now the left arrow
        //// Find im DOM vom img nach oben next button (its parent button’s ID)
        if (el.closest("button").id === "idDlgBtnGoLeft") {
            el.style.transform = 'rotate(180deg)';
        }
    });
// #endregion

// #region Make header/footer-Logos as a link (like a-Tag)

//// window.location.href returns the href (URL) of the current page
//// window.location.hostname returns the domain name of the web host
//// window.location.pathname returns the path and filename of the current page
//// window.location.protocol returns the web protocol used (http: or https:)
//// window.location.assign() loads a new document

//// Window: represents a window containing a DOM document
////  the document property points to the DOM document loaded in that window.
// console.log(window);

//// Window: location: information about the current location of the document.
// console.log(window.location);
//// 
document.getElementById("logoArea").addEventListener("click", () => {
    // console.log(window.location.href);
    window.location.assign(window.location.href); // im gleichen Tab
});

document.getElementById("da_logoArea").addEventListener("click", () => {
    // console.log(window.location.href);
    // window.location.assign("https://developerakademie.com/"); // ich will aber NICHT in gleichem Tab
    window.open("https://developerakademie.com/", "_blank"); // im neuen Tab
    // Wie: <a href="https://www.example.com" target="_blank">Zur Website</a>
});
// #endregion







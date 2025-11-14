import imagesList from "./data/imagesList.js";
export let currentIndex = 0;

const refDlg = document.getElementById("idDlg");

function closeDialog() {
    refDlg.close();
    refDlg.classList.remove("opened");

    document.querySelectorAll(".shapeGalleryImgs:focus, .shapeGalleryImgs:hover, .shapeGalleryImgs.active")
        .forEach((thumbEl) => {
            thumbEl.blur();
            thumbEl.classList.remove("active");
        });

    // currentThumb.blur();
}

// #region Extra Event-Handlers

//// Using EventObject to close the Dialog onclick auf Backdrop
//// backdrop belongs to dialog
//// Wenn man auf den Backdrop klickt, dann ist e.target == refDlg (der Dialog selbst).
//// Klickt man dagegen auf ein Kindelement, dann ist e.target != refDlg.
refDlg.addEventListener("click", (e) => { if (e.target == refDlg) closeDialog() });

//// Activate Arrow-BTN for Dialog
refDlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToNextImg(document.getElementById("idDlgBtnGoLeft"));
    if (e.key === "ArrowRight") goToNextImg(document.getElementById("idDlgBtnGoRight"));
});

// ESC Ueberall – auch außerhalb vom Dialog
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const refDlg = document.getElementById("idDlg");
        if (refDlg.open) {
            closeDialog();
        } else {
            // ESC in Body → Fokus auf meinem Bild (durch Tab) entfernen
            const activeThumb = document.querySelector(".shapeGalleryImgs:focus");
            if (activeThumb) activeThumb.blur();
        }
    }
});

//// Activate onClick => close() for close BTN in Dialog (idDlgBtnClose)
document.getElementById("idDlgBtnClose").addEventListener("click", () => closeDialog());

//// Activate Tab-circle in Dialog for Close-BTN & 2 Arrow-BTNs
const listFocusableDlgEls = document.querySelectorAll(
    "#idDlgBtnClose, #idDlgBtnGoLeft, #idDlgBtnGoRight"
);

refDlg.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key == "Tab") { // Vorwaerts
        listFocusableDlgEls.forEach((el, index) => {
            if (index == listFocusableDlgEls.length - 1) { // Beim Vorwaerts, Kritisch am Ende des Arreys
                listFocusableDlgEls[0].focus();

            } else {
                listFocusableDlgEls[index + 1].focus();
            }
        });
    }
});

// #endregion

// #region Dialog-Adjusting
//// Durch imagesList passe ich Dialog-Elemente an:
export function adjustingDlgContents(idThumb) {
    currentIndex = parseInt(idThumb.split("idThumb")[1], 10);
    const imgListItem = imagesList[currentIndex];
    ////////////////////////////
    document.getElementById("idDlgHTitle").innerHTML = "";
    document.getElementById("idDlgHTitle").innerHTML = imgListItem.fileName;
    ////////////////////////////
    const newImgEl = document.createElement("img");
    newImgEl.id = `idDlgImg${currentIndex}`;
    newImgEl.src = imgListItem.url;
    newImgEl.alt = imgListItem.altName;

    const refDlgImgsContainer = document.getElementById("idDlgImgsContainer");
    refDlgImgsContainer.innerHTML = ""; // altes Bild löschen
    refDlgImgsContainer.appendChild(newImgEl);
    ////////////////////////////
    document.getElementById("idImgPos").innerText = "";
    document.getElementById("idImgPos").innerText = currentIndex + 1;
    ////////////////////////////
    document.getElementById("idImgQty").innerText = imagesList.length;
}

//// Activate OnClick for Arrow-BTNs (idDlgBtnGoLeft & idDlgBtnGoRight)
document.querySelectorAll("#idDlgBtnGoLeft, #idDlgBtnGoRight")
    .forEach(btnEl => {
        btnEl.addEventListener("click", () => goToNextImg(btnEl));
    });

//// The Function
// let currentIndex = 0;
function goToNextImg(btnEl) {

    // console.log(currentIndex);
    const prevThumb = document.getElementById(`idThumb${currentIndex}`);
    prevThumb.classList.remove("active");
    prevThumb.blur();

    if (btnEl.id == "idDlgBtnGoLeft") {
        if (currentIndex === 0) {
            currentIndex = imagesList.length - 1;
        }
        else {
            currentIndex -= 1;
        };
    };

    if (btnEl.id == "idDlgBtnGoRight") {
        if (currentIndex === (imagesList.length - 1)) {
            currentIndex = 0;
        }
        else {
            currentIndex += 1;
        };
    };

    document.getElementById(`idThumb${currentIndex}`).classList.add("active");
    document.getElementById(`idThumb${currentIndex}`).focus();
    // console.log(currentIndex);
    adjustingDlgContents(`idThumb${currentIndex}`);
}

// #endregion



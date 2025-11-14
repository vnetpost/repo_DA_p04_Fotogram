import imagesList from "./data/imagesList.js";
import { adjustingDlgContents } from "./dialog.js";

export function mountGallery(targetContainer) {
    const refTargetContainer = document.getElementById(targetContainer);
    imagesList.forEach((item, index) => {
        const newThumb = document.createElement("img");
        newThumb.src = item.url;
        newThumb.alt = item.altName;
        newThumb.tabIndex = 0;
        newThumb.id = `idThumb${index}`;
        newThumb.className = "shapeGalleryImgs";

        // #region Event-Handling

        newThumb.addEventListener("click", () => {
            newThumb.classList.add("active"); // Bild wird rot markiert

            adjustingDlgContents(newThumb.id);

            const refDialog = document.getElementById("idDlg");
            refDialog.showModal(); // Modal-Fenster → ein Fenster, das nur in diesem Modus funktioniert, bis man es schließt.
            refDialog.classList.add("opened");
        });

        newThumb.addEventListener("keydown", (e) => {
            if (e.key == "Tab") { // Wenn nur Tab: Vorwaerts
                e.preventDefault();

                if (index === imagesList.length - 1) { // Beim Vorwaerts, Kritisch am Ende des Arreys
                    document.getElementById("idThumb0").focus();
                } else {
                    document.getElementById(`idThumb${index + 1}`).focus();
                }
                if (e.shiftKey) { // e.key == "shiftKey" ist falsch – Shift ist kein eigener Key
                    if (index === 0) { // Kritisch am Anfang des Arreys
                        document.getElementById(`idThumb${imagesList.length - 1}`).focus();
                    } else {
                        document.getElementById(`idThumb${index - 1}`).focus();
                    }
                }
            }

            if (e.key == "Enter" || e.key === " ") {
                e.preventDefault(); // normale tab-verhalten verhindern

                const refDialog = document.getElementById("idDlg");
                refDialog.showModal(); // Modal-Fenster → ein Fenster, das nur in diesem Modus funktioniert, bis man es schließt.
                refDialog.classList.add("opened");

                adjustingDlgContents(newThumb.id);
            }
        });

        // #endregion

        refTargetContainer.appendChild(newThumb); // Add my new <img> to secAlbum 
    });
}

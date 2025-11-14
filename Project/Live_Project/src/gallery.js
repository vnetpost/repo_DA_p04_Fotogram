import imagesList from "./data/imagesList.js";
// console.log(imagesList.length);
import { adjustingDlgContents } from "./dialog.js";

//// Durch imagesList generiere ich Thumb-Elemente for Gallery
export function mountGallery(targetContainer) {
    const refTargetContainer = document.getElementById(targetContainer);
    imagesList.forEach((item, index) => {
        // Make IMGs: <img src="" alt="" tabindex="0" id="" class="" onclick="" style=""></img>
        const newThumb = document.createElement("img");

        newThumb.src = item.url;
        newThumb.alt = item.altName;
        newThumb.tabIndex = 0;
        newThumb.id = `idThumb${index}`;
        newThumb.className = "shapeGalleryImgs";

        // #region Event-Handling

        //// Hover(Mouse) for Gallery-Images & focus (Tab-Taste)
        // newThumb.addEventListener("mousemove", () => newThumb.classList.add("isHovered"));
        // newThumb.addEventListener("mouseleave", () => newThumb.classList.remove("isHovered"));
        // newThumb.addEventListener("focus", () => newThumb.classList.add("isFocused"));
        // newThumb.addEventListener("blur", () => newThumb.classList.remove("isFocused"));

        // newThumb.onclick = `openDialog(${newThumb.id})`; // Falsch! onclick erwartet eine Funktion, nicht einen String.
        // newThumb.onclick = openDialog(newThumb.id); // dann wird sofort beim Erstellen des Elements ausgeführt.
        // newThumb.onclick = () => openDialog(newThumb.id); // Wrap-Function
        newThumb.addEventListener("click", () => {
            // console.log(newThumb.id);
            newThumb.classList.add("active"); // Bild wird rot markiert

            adjustingDlgContents(newThumb.id);

            const refDialog = document.getElementById("idDlg");
            refDialog.showModal(); // Modal-Fenster → ein Fenster, das nur in diesem Modus funktioniert, bis man es schließt.
            refDialog.classList.add("opened");
        });

        //// Tab-Kreis im Gallery
        //// Wenn nur Tab: Vorwaerts
        //// Wenn Shift schon gedruckt wurde, bei einem Tab-Druck => "Rueckwerts"
        newThumb.addEventListener("keydown", (e) => {
            if (e.key == "Tab") { // Wenn nur Tab: Vorwaerts
                //// Standardverhalten verhindern, damit der Browser es nicht doppelt macht.
                //// Selbst steuern (normale tab-verhalten verhindern)
                e.preventDefault();

                if (index === imagesList.length - 1) { // Beim Vorwaerts, Kritisch am Ende des Arreys
                    document.getElementById("idThumb0").focus();
                } else {
                    document.getElementById(`idThumb${index + 1}`).focus();
                }
                //// Wenn Shift schon gedruckt wurde, dann bei einem Tab-Druck => "Rueckwerts"
                if (e.shiftKey) { // e.key == "shiftKey" ist falsch – Shift ist kein eigener Key
                    if (index === 0) { // Kritisch am Anfang des Arreys
                        document.getElementById(`idThumb${imagesList.length - 1}`).focus();
                    } else {
                        document.getElementById(`idThumb${index - 1}`).focus();
                    }
                }
            }

            // Öffnen per Enter oder Space
            if (e.key == "Enter" || e.key === " ") {
                e.preventDefault(); // normale tab-verhalten verhindern

                const refDialog = document.getElementById("idDlg");
                refDialog.showModal(); // Modal-Fenster → ein Fenster, das nur in diesem Modus funktioniert, bis man es schließt.
                refDialog.classList.add("opened");

                adjustingDlgContents(newThumb.id);
            }
        });

        // #endregion

        // Beispiel: Inline style
        // newThumb.style = "width:20rem;height:20rem;"; // Inline style (rem wird referenziert zu font-size in css)
        // newThumb.style = "width:200px;height:200px;"; // Inline style
        // OR
        // newThumb.width = "300"; // Inline width
        // newThumb.height = "300"; // Inline height
        // OR    
        // newThumb.style.width = "400px"; // Inline width
        // newThumb.style.height = "400px"; // Inline height

        refTargetContainer.appendChild(newThumb); // Add my new <img> to secAlbum 
    });
}
document.addEventListener("DOMContentLoaded", () => {

  const popup = document.getElementById("popupOverlay");
  const closeButton = document.getElementById("popupClose");
  const enterButton = document.getElementById("enterSite");
  const noMusicButton = document.getElementById("continueWithoutMusic");
  const music = document.getElementById("siteMusic");

  if (!popup) {
    console.error("POP-UP NÃO ENCONTRADO");
    return;
  }

  setTimeout(() => {
    popup.classList.add("active");
  }, 400);

  function fecharPopup() {
    popup.classList.remove("active");

    setTimeout(() => {
      popup.style.display = "none";
    }, 450);
  }

  if (closeButton) {
    closeButton.addEventListener("click", fecharPopup);
  }

  if (noMusicButton) {
    noMusicButton.addEventListener("click", fecharPopup);
  }

  if (enterButton) {
    enterButton.addEventListener("click", () => {

      if (music) {
        music.volume = 0.3;

        music.play().catch((error) => {
          console.log("NÃO FOI POSSÍVEL TOCAR A MÚSICA:", error);
        });
      }

      fecharPopup();
    });
  }

});

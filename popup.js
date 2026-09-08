document.addEventListener("DOMContentLoaded", () => {

  const popup = document.getElementById("popupOverlay");
  const closeButton = document.getElementById("popupClose");
  const enterButton = document.getElementById("enterSite");
  const noMusicButton = document.getElementById("continueWithoutMusic");

  const music = document.getElementById("siteMusic");
  const musicControl = document.getElementById("musicControl");

  if (!popup) {
    console.error("POP-UP NÃO ENCONTRADO");
    return;
  }


  /* =========================================
     ABRIR POP-UP
  ========================================= */

  setTimeout(() => {
    popup.classList.add("active");
  }, 400);


  /* =========================================
     FECHAR POP-UP
  ========================================= */

  function fecharPopup() {

    popup.classList.remove("active");

    setTimeout(() => {
      popup.style.display = "none";
    }, 450);

  }


  /* =========================================
     FECHAR NO X
  ========================================= */

  if (closeButton) {

    closeButton.addEventListener("click", () => {

      fecharPopup();

    });

  }


  /* =========================================
     CONTINUAR SEM MÚSICA
  ========================================= */

  if (noMusicButton) {

    noMusicButton.addEventListener("click", () => {

      fecharPopup();

    });

  }


  /* =========================================
     ENTRAR COM MÚSICA
  ========================================= */

  if (enterButton) {

    enterButton.addEventListener("click", () => {

      if (music) {

        music.volume = 0.25;

        music.play()
          .then(() => {

            if (musicControl) {

              musicControl.classList.add("visible");

              musicControl.classList.remove("paused");

              musicControl.innerHTML = "♫";

              musicControl.setAttribute(
                "aria-label",
                "Pausar música"
              );

              musicControl.setAttribute(
                "title",
                "Pausar música"
              );

            }

          })
          .catch((error) => {

            console.log(
              "NÃO FOI POSSÍVEL TOCAR A MÚSICA:",
              error
            );

          });

      }

      fecharPopup();

    });

  }


  /* =========================================
     PAUSAR / CONTINUAR MÚSICA
  ========================================= */

  if (musicControl && music) {

    musicControl.addEventListener("click", () => {

      if (music.paused) {

        music.play();

        musicControl.classList.remove("paused");

        musicControl.innerHTML = "♫";

        musicControl.setAttribute(
          "aria-label",
          "Pausar música"
        );

        musicControl.setAttribute(
          "title",
          "Pausar música"
        );

      } else {

        music.pause();

        musicControl.classList.add("paused");

        musicControl.innerHTML = "♪";

        musicControl.setAttribute(
          "aria-label",
          "Continuar música"
        );

        musicControl.setAttribute(
          "title",
          "Continuar música"
        );

      }

    });

  }

});

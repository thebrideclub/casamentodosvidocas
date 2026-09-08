document.addEventListener("DOMContentLoaded", function () {

  const popupOverlay = document.getElementById("popupOverlay");
  const popupClose = document.getElementById("popupClose");
  const enterSite = document.getElementById("enterSite");
  const continueWithoutMusic = document.getElementById(
    "continueWithoutMusic"
  );

  const siteMusic = document.getElementById("siteMusic");


  /* =========================================
     ABRIR POP-UP
  ========================================= */

  setTimeout(function () {
    popupOverlay.classList.add("active");
  }, 500);


  /* =========================================
     ENTRAR COM MÚSICA
  ========================================= */

  enterSite.addEventListener("click", function () {

    siteMusic.volume = 0.35;

    siteMusic.play()
      .then(function () {
        console.log("Música iniciada.");
      })
      .catch(function (error) {
        console.log(
          "O navegador bloqueou a reprodução automática:",
          error
        );
      });

    fecharPopup();
  });


  /* =========================================
     CONTINUAR SEM MÚSICA
  ========================================= */

  continueWithoutMusic.addEventListener("click", function () {
    fecharPopup();
  });


  /* =========================================
     FECHAR NO X
  ========================================= */

  popupClose.addEventListener("click", function () {
    fecharPopup();
  });


  /* =========================================
     FUNÇÃO DE FECHAR
  ========================================= */

  function fecharPopup() {

    popupOverlay.classList.remove("active");

    setTimeout(function () {
      popupOverlay.style.display = "none";
    }, 450);
  }

});

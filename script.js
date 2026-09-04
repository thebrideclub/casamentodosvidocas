// =======================================
// CONTAGEM REGRESSIVA
// =======================================

const dataCasamento = new Date(
  "2026-10-10T15:00:00-03:00"
).getTime();


function atualizarContagem() {

  const agora = new Date().getTime();

  const diferenca =
    dataCasamento - agora;


  // Elementos

  const elementoDias =
    document.getElementById("dias");

  const elementoHoras =
    document.getElementById("horas");

  const elementoMinutos =
    document.getElementById("minutos");

  const elementoSegundos =
    document.getElementById("segundos");


  if (
    !elementoDias ||
    !elementoHoras ||
    !elementoMinutos ||
    !elementoSegundos
  ) {
    return;
  }


  // Casamento chegou

  if (diferenca <= 0) {

    elementoDias.textContent = "00";
    elementoHoras.textContent = "00";
    elementoMinutos.textContent = "00";
    elementoSegundos.textContent = "00";

    return;
  }


  // Calcula tempo

  const dias = Math.floor(
    diferenca /
    (1000 * 60 * 60 * 24)
  );


  const horas = Math.floor(

    (
      diferenca %
      (1000 * 60 * 60 * 24)
    ) /

    (1000 * 60 * 60)

  );


  const minutos = Math.floor(

    (
      diferenca %
      (1000 * 60 * 60)
    ) /

    (1000 * 60)

  );


  const segundos = Math.floor(

    (
      diferenca %
      (1000 * 60)
    ) /

    1000

  );


  // Mostra

  elementoDias.textContent =
    String(dias).padStart(2, "0");

  elementoHoras.textContent =
    String(horas).padStart(2, "0");

  elementoMinutos.textContent =
    String(minutos).padStart(2, "0");

  elementoSegundos.textContent =
    String(segundos).padStart(2, "0");

}


// Inicia contador

atualizarContagem();

setInterval(
  atualizarContagem,
  1000
);



// =======================================
// RSVP
// =======================================

const rsvpForm =
  document.getElementById("rsvpForm");

const camposConvidados =
  document.getElementById("camposConvidados");

const convidados =
  document.getElementById("convidados");


const URL_RSVP =
  "https://script.google.com/macros/s/AKfycbzdKEtzjqlpAMfF-oaKkvrWzu-ej_cA5D76eVKtHYVDEiOHZKMfFdr0_QzLOtTlWSwbfQ/exec";



// =======================================
// MOSTRA OU ESCONDE ACOMPANHANTES
// =======================================

function atualizarCamposConvidados() {

  if (!camposConvidados) {
    return;
  }


  const presencaSelecionada =
    document.querySelector(
      'input[name="presenca"]:checked'
    );


  // Nenhuma opção selecionada

  if (!presencaSelecionada) {

    camposConvidados.style.display =
      "none";

    if (convidados) {
      convidados.value = "";
    }

    return;
  }


  // SIM

  if (
    presencaSelecionada.value === "sim"
  ) {

    camposConvidados.style.display =
      "block";

  }

  // NÃO
  else {

    camposConvidados.style.display =
      "none";

    if (convidados) {
      convidados.value = "";
    }

  }

}



// =======================================
// ESCUTA RADIO BUTTONS
// =======================================

const radiosPresenca =
  document.querySelectorAll(
    'input[name="presenca"]'
  );


radiosPresenca.forEach(
  function (radio) {

    radio.addEventListener(
      "change",
      atualizarCamposConvidados
    );

  }
);



// =======================================
// ENVIA RSVP
// =======================================

if (rsvpForm) {

  rsvpForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      const botao =
        rsvpForm.querySelector(
          "button[type='submit']"
        );


      const textoOriginal =
        botao.textContent;


      botao.disabled = true;

      botao.textContent =
        "ENVIANDO...";


      // Dados do formulário

      const dados =
        new FormData(rsvpForm);


      try {

        await fetch(
          URL_RSVP,
          {
            method: "POST",
            body: dados,
            mode: "no-cors"
          }
        );


        alert(
          "Sua confirmação foi enviada com sucesso! 💛"
        );


        rsvpForm.reset();

        atualizarCamposConvidados();


      } catch (erro) {

        console.error(
          "Erro ao enviar RSVP:",
          erro
        );


        alert(
          "Não foi possível enviar sua confirmação. Tente novamente."
        );

      }


      botao.disabled = false;

      botao.textContent =
        textoOriginal;

    }
  );

}



// =======================================
// MENSAGEM AOS NOIVOS
// =======================================

const msgForm =
  document.getElementById("msgForm");


const URL_MENSAGEM =
  "https://script.google.com/macros/s/AKfycbz4mtIX4VMlPcvRNVu4LS9WhkfOW8DP0oU9IOgZlzqPpT-JJCit1hBBkiFKvFJtawFz/exec";



if (msgForm) {

  msgForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      const botao =
        msgForm.querySelector(
          "button[type='submit']"
        );


      const textoOriginal =
        botao.textContent;


      const nome =
        document.getElementById(
          "msg-nome"
        ).value;


      const mensagem =
        document.getElementById(
          "msg-noivos"
        ).value;


      botao.disabled = true;

      botao.textContent =
        "ENVIANDO...";


      const dados =
        new URLSearchParams();


      dados.append(
        "nome",
        nome
      );


      dados.append(
        "mensagem",
        mensagem
      );


      try {

        await fetch(
          URL_MENSAGEM,
          {
            method: "POST",
            body: dados,
            mode: "no-cors"
          }
        );


        alert(
          "Mensagem enviada com sucesso! 💛"
        );


        msgForm.reset();


      } catch (erro) {

        console.error(
          "Erro ao enviar mensagem:",
          erro
        );


        alert(
          "Não foi possível enviar sua mensagem. Tente novamente."
        );

      }


      botao.disabled = false;

      botao.textContent =
        textoOriginal;

    }
  );

}

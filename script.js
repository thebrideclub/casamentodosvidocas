// ===============================
// CONTAGEM REGRESSIVA
// ===============================

const dataCasamento = new Date("2026-10-10T15:00:00-03:00").getTime();

function atualizarContagem() {
  const agora = new Date().getTime();
  const diferenca = dataCasamento - agora;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor(
    (diferenca % (1000 * 60 * 60)) / (1000 * 60)
  );
  const segundos = Math.floor(
    (diferenca % (1000 * 60)) / 1000
  );

  const elementoDias = document.getElementById("dias");
  const elementoHoras = document.getElementById("horas");
  const elementoMinutos = document.getElementById("minutos");
  const elementoSegundos = document.getElementById("segundos");

  if (!elementoDias) return;

  if (diferenca <= 0) {
    elementoDias.textContent = "0";
    elementoHoras.textContent = "0";
    elementoMinutos.textContent = "0";
    elementoSegundos.textContent = "0";
    return;
  }

  elementoDias.textContent = String(dias).padStart(2, "0");
  elementoHoras.textContent = String(horas).padStart(2, "0");
  elementoMinutos.textContent = String(minutos).padStart(2, "0");
  elementoSegundos.textContent = String(segundos).padStart(2, "0");
}

atualizarContagem();
setInterval(atualizarContagem, 1000);


// ===============================
// RSVP
// ===============================

const rsvpForm = document.getElementById("rsvpForm");
const camposConvidados = document.getElementById("camposConvidados");
const quantidade = document.getElementById("quantidade");
const convidados = document.getElementById("convidados");

const URL_RSVP =
  "https://script.google.com/macros/s/AKfycbzdKEtzjqlpAMfF-oaKkvrWzu-ej_cA5D76eVKtHYVDEiOHZKMfFdr0_QzLOtTlWSwbfQ/exec";


// Mostra ou esconde os campos de acompanhantes
function atualizarCamposConvidados() {
  const presencaSelecionada = document.querySelector(
    'input[name="presenca"]:checked'
  );

  if (!presencaSelecionada) {
    camposConvidados.style.display = "none";
    return;
  }

  if (presencaSelecionada.value === "sim") {
    camposConvidados.style.display = "block";

    quantidade.required = true;
    convidados.required = false;
  } else {
    camposConvidados.style.display = "none";

    quantidade.required = false;
    convidados.required = false;

    quantidade.value = "";
    convidados.value = "";
  }
}


// Escuta a escolha de presença
const radiosPresenca = document.querySelectorAll(
  'input[name="presenca"]'
);

radiosPresenca.forEach((radio) => {
  radio.addEventListener("change", atualizarCamposConvidados);
});


// Envia o RSVP
if (rsvpForm) {
  rsvpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const botao = rsvpForm.querySelector("button[type='submit']");
    const textoOriginal = botao.textContent;

    botao.disabled = true;
    botao.textContent = "ENVIANDO...";

    const dados = new FormData(rsvpForm);

    try {
      await fetch(URL_RSVP, {
        method: "POST",
        body: dados,
        mode: "no-cors"
      });

      alert("Sua confirmação foi enviada com sucesso! 💛");

      rsvpForm.reset();
      atualizarCamposConvidados();

    } catch (erro) {
      console.error("Erro ao enviar RSVP:", erro);
      alert("Não foi possível enviar sua confirmação. Tente novamente.");
    }

    botao.disabled = false;
    botao.textContent = textoOriginal;
  });
}


// ===============================
// MENSAGEM AOS NOIVOS
// ===============================

const msgForm = document.getElementById("msgForm");

const URL_MENSAGEM =
  "https://script.google.com/macros/s/AKfycbz4mtIX4VMlPcvRNVu4LS9WhkfOW8DP0oU9IOgZlzqPpT-JJCit1hBBkiFKvFJtawFz/exec";

if (msgForm) {
  msgForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const botao = msgForm.querySelector("button[type='submit']");
    const textoOriginal = botao.textContent;

    const nome = document.getElementById("msg-nome").value;
    const mensagem = document.getElementById("msg-noivos").value;

    botao.disabled = true;
    botao.textContent = "ENVIANDO...";

    const dados = new URLSearchParams();

    dados.append("nome", nome);
    dados.append("mensagem", mensagem);

    try {
      await fetch(URL_MENSAGEM, {
        method: "POST",
        body: dados,
        mode: "no-cors"
      });

      alert("Mensagem enviada com sucesso! 💛");

      msgForm.reset();

    } catch (erro) {
      console.error("Erro ao enviar mensagem:", erro);
      alert("Não foi possível enviar sua mensagem. Tente novamente.");
    }

    botao.disabled = false;
    botao.textContent = textoOriginal;
  });
}

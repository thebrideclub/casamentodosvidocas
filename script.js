// ===============================
// CONTAGEM REGRESSIVA
// ===============================
const dataCasamento = new Date(
  "2026-10-10T15:00:00-03:00"
).getTime();
function atualizarContagem() {
  const agora =
    new Date().getTime();
  const diferenca =
    dataCasamento - agora;
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
  if (diferenca <= 0) {
    elementoDias.textContent =
      "00";
    elementoHoras.textContent =
      "00";
    elementoMinutos.textContent =
      "00";
    elementoSegundos.textContent =
      "00";
    return;
  }
  const dias =
    Math.floor(
      diferenca /
      (1000 * 60 * 60 * 24)
    );
  const horas =
    Math.floor(
      (
        diferenca %
        (1000 * 60 * 60 * 24)
      ) /
      (1000 * 60 * 60)
    );
  const minutos =
    Math.floor(
      (
        diferenca %
        (1000 * 60 * 60)
      ) /
      (1000 * 60)
    );
  const segundos =
    Math.floor(
      (
        diferenca %
        (1000 * 60)
      ) /
      1000
    );
  elementoDias.textContent =
    String(dias).padStart(
      2,
      "0"
    );
  elementoHoras.textContent =
    String(horas).padStart(
      2,
      "0"
    );
  elementoMinutos.textContent =
    String(minutos).padStart(
      2,
      "0"
    );
  elementoSegundos.textContent =
    String(segundos).padStart(
      2,
      "0"
    );
}
// ===============================
// INICIA A CONTAGEM
// ===============================
atualizarContagem();
setInterval(
  atualizarContagem,
  1000
);
// ===============================
// RSVP
// ===============================
const rsvpForm =
  document.getElementById(
    "rsvpForm"
  );
const rsvpContainer =
  document.getElementById(
    "rsvpContainer"
  );
const camposAcompanhante =
  document.getElementById(
    "camposAcompanhante"
  );
const confirmacaoFinal =
  document.getElementById(
    "confirmacaoFinal"
  );
const nomeConfirmado =
  document.getElementById(
    "nomeConfirmado"
  );
const URL_RSVP =
  "https://script.google.com/macros/s/AKfycbx9Tmo_UrEm_8oc0YvwZ6X1VvdN75KNVG-7O1MsuhkiVvitQ4_Nqi_n6sda9phVYU9Y/exec";
// ===============================
// MOSTRA OU ESCONDE ACOMPANHANTE
// ===============================
function atualizarCamposAcompanhante() {
  const presencaSelecionada =
    document.querySelector(
      'input[name="presenca"]:checked'
    );
  if (!camposAcompanhante) {
    return;
  }
  // NENHUMA OPÇÃO MARCADA
  if (!presencaSelecionada) {
    camposAcompanhante.style.display =
      "none";
    const campoAcompanhante =
      rsvpForm
        ? rsvpForm.querySelector(
            '[name="acompanhante"]'
          )
        : null;
    if (campoAcompanhante) {
      campoAcompanhante.value = "";
    }
    return;
  }
  // MARCOU SIM
  if (
    presencaSelecionada.value ===
    "sim"
  ) {
    camposAcompanhante.style.display =
      "block";
  }
  // MARCOU NÃO
  else {
    camposAcompanhante.style.display =
      "none";
    const campoAcompanhante =
      rsvpForm
        ? rsvpForm.querySelector(
            '[name="acompanhante"]'
          )
        : null;
    if (campoAcompanhante) {
      campoAcompanhante.value = "";
    }
  }
}
// ===============================
// ESCUTA OS RADIOS DE PRESENÇA
// ===============================
const radiosPresenca =
  document.querySelectorAll(
    'input[name="presenca"]'
  );
radiosPresenca.forEach(
  function(radio) {
    radio.addEventListener(
      "change",
      atualizarCamposAcompanhante
    );
  }
);
// GARANTE ESTADO CORRETO AO CARREGAR
atualizarCamposAcompanhante();
// ===============================
// MOSTRA CARD DE CONFIRMAÇÃO
// ===============================
function mostrarConfirmacaoFinal(
  nome
) {
  if (
    !confirmacaoFinal ||
    !nomeConfirmado
  ) {
    return;
  }
  const primeiroNome =
    nome
      .trim()
      .split(/\s+/)[0]
      .toUpperCase();
  nomeConfirmado.textContent =
    `${primeiroNome}, VOCÊ VAI ESTAR COM A GENTE 🤎`;
  // ESCONDE O RSVP
  if (rsvpContainer) {
    rsvpContainer.style.display =
      "none";
  }
  // MOSTRA O CARD
  confirmacaoFinal.classList.add(
    "ativo"
  );
  confirmacaoFinal.setAttribute(
    "aria-hidden",
    "false"
  );
  // DESCE SUAVEMENTE ATÉ O CARD
  setTimeout(
    function() {
      confirmacaoFinal.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    },
    200
  );
}
// ===============================
// ENVIO DO RSVP
// ===============================
if (rsvpForm) {
  rsvpForm.addEventListener(
    "submit",
    async function(event) {
      event.preventDefault();
      // ===============================
      // BOTÃO
      // ===============================
      const botao =
        rsvpForm.querySelector(
          "button[type='submit']"
        );
      if (!botao) {
        return;
      }
      const textoOriginal =
        botao.textContent;
      botao.disabled = true;
      botao.textContent =
        "ENVIANDO...";
      // ===============================
      // PEGA OS CAMPOS
      // ===============================
      const campoNome =
        rsvpForm.querySelector(
          '[name="nome"]'
        );
      const campoWhatsapp =
        rsvpForm.querySelector(
          '[name="whatsapp"]'
        );
      const presencaSelecionada =
        rsvpForm.querySelector(
          '[name="presenca"]:checked'
        );
      const campoAcompanhante =
        rsvpForm.querySelector(
          '[name="acompanhante"]'
        );
      // ===============================
      // PEGA OS VALORES
      // ===============================
      const nome =
        campoNome
          ? campoNome.value.trim()
          : "";
      const whatsapp =
        campoWhatsapp
          ? campoWhatsapp.value.trim()
          : "";
      const presenca =
        presencaSelecionada
          ? presencaSelecionada.value
          : "";
      const acompanhante =
        campoAcompanhante
          ? campoAcompanhante.value.trim()
          : "";
      // ===============================
      // VALIDAÇÃO EXTRA
      // ===============================
      if (
        !nome ||
        !whatsapp ||
        !presenca
      ) {
        alert(
          "Preencha todos os campos obrigatórios."
        );
        botao.disabled = false;
        botao.textContent =
          textoOriginal;
        return;
      }
      // ===============================
      // MONTA OS DADOS
      // ===============================
      const dados =
        new FormData();
      dados.append(
        "nome",
        nome
      );
      dados.append(
        "whatsapp",
        whatsapp
      );
      dados.append(
        "presenca",
        presenca
      );
      // NOME NOVO
      dados.append(
        "acompanhante",
        acompanhante
      );
      // NOME ANTIGO
      // MANTIDO PARA GARANTIR COMPATIBILIDADE
      dados.append(
        "convidados",
        acompanhante
      );
      // ===============================
      // TESTE NO CONSOLE
      // ===============================
      console.log(
        "NOME:",
        nome
      );
      console.log(
        "WHATSAPP:",
        whatsapp
      );
      console.log(
        "PRESENÇA:",
        presenca
      );
      console.log(
        "ACOMPANHANTE:",
        acompanhante
      );
      console.log(
        "FORMDATA acompanhante:",
        dados.get(
          "acompanhante"
        )
      );
      console.log(
        "FORMDATA convidados:",
        dados.get(
          "convidados"
        )
      );
      // ===============================
      // ENVIA PARA O GOOGLE SHEETS
      // ===============================
      try {
        await fetch(
          URL_RSVP,
          {
            method: "POST",
            body: dados,
            mode: "no-cors"
          }
        );
        // ===============================
        // SE CONFIRMOU PRESENÇA
        // ===============================
        if (
          presenca === "sim"
        ) {
          mostrarConfirmacaoFinal(
            nome
          );
        }
        // ===============================
        // SE NÃO FOR
        // ===============================
        else {
          alert(
            "Sua resposta foi enviada com sucesso! 🤎"
          );
        }
        // ===============================
        // LIMPA FORMULÁRIO
        // ===============================
        rsvpForm.reset();
        // ESCONDE ACOMPANHANTE NOVAMENTE
        atualizarCamposAcompanhante();
      } catch (erro) {
        console.error(
          "Erro ao enviar RSVP:",
          erro
        );
        alert(
          "Não foi possível enviar sua confirmação. Tente novamente."
        );
      }
      // ===============================
      // RESTAURA BOTÃO
      // ===============================
      botao.disabled = false;
      botao.textContent =
        textoOriginal;
    }
  );
}
// ===============================
// MENSAGEM AOS NOIVOS
// ===============================
const msgForm =
  document.getElementById(
    "msgForm"
  );
const URL_MENSAGEM =
  "https://script.google.com/macros/s/AKfycbz4mtIX4VMlPcvRNVu4LS9WhkfOW8DP0oU9IOgZlzqPpT-JJCit1hBBkiFKvFJtawFz/exec";
if (msgForm) {
  msgForm.addEventListener(
    "submit",
    async function(event) {
      event.preventDefault();
      // ===============================
      // BOTÃO
      // ===============================
      const botao =
        msgForm.querySelector(
          "button[type='submit']"
        );
      if (!botao) {
        return;
      }
      const textoOriginal =
        botao.textContent;
      // ===============================
      // CAMPOS
      // ===============================
      const campoNome =
        document.getElementById(
          "msg-nome"
        );
      const campoMensagem =
        document.getElementById(
          "msg-noivos"
        );
      const nome =
        campoNome
          ? campoNome.value.trim()
          : "";
      const mensagem =
        campoMensagem
          ? campoMensagem.value.trim()
          : "";
      botao.disabled = true;
      botao.textContent =
        "ENVIANDO...";
      // ===============================
      // MONTA OS DADOS
      // ===============================
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
      // ===============================
      // ENVIA
      // ===============================
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
      // ===============================
      // RESTAURA BOTÃO
      // ===============================
      botao.disabled = false;
      botao.textContent =
        textoOriginal;
    }
  );
}
document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // CONTAGEM REGRESSIVA
  // =============================
const destino = new Date("2026-10-10T00:00:00-03:00").getTime();
  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  let timer;

  function atualizarContagem() {
    const agora = Date.now();
    const diferenca = destino - agora;

    if (diferenca <= 0) {
      diasEl.textContent = "00";
      horasEl.textContent = "00";
      minutosEl.textContent = "00";
      segundosEl.textContent = "00";
      clearInterval(timer);
      return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    diasEl.textContent = String(dias).padStart(2, "0");
    horasEl.textContent = String(horas).padStart(2, "0");
    minutosEl.textContent = String(minutos).padStart(2, "0");
    segundosEl.textContent = String(segundos).padStart(2, "0");
  }

  atualizarContagem();
  timer = setInterval(atualizarContagem, 1000);

  // =============================
  // FORMULÁRIO RSVP
  // =============================
  const form = document.getElementById('rsvpForm');
  const campoChinelo = document.getElementById('campo-chinelo');
  const presencaRadios = document.querySelectorAll('input[name="presenca"]');

  presencaRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'sim' && radio.checked) {
        campoChinelo.style.display = 'block';
      } else {
        campoChinelo.style.display = 'none';
        const mensagemField = form.querySelector('textarea[name="mensagem"]');
        if (mensagemField) mensagemField.value = '';
      }
    });
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const res = await fetch('https://script.google.com/macros/s/AKfycbzdKEtzjqlpAMfF-oaKkvrWzu-ej_cA5D76eVKtHYVDEiOHZKMfFdr0_QzLOtTlWSwbfQ/exec', {
          method: 'POST',
          body: formData
        });

        const text = await res.text();
        let data;
        try { 
          data = JSON.parse(text); 
        } catch { 
          data = { result: res.ok ? 'success' : 'error', raw: text }; 
        }

        if (data.result === 'success') {
          alert('RSVP enviado com sucesso!');
          form.reset();
          campoChinelo.style.display = 'none';
        } else {
          alert('Ocorreu um erro no servidor. Detalhes: ' + (data.raw || text || ''));
          console.error('Resposta do servidor:', text);
        }
      } catch (err) {
        alert('Erro de rede: ' + err.message);
        console.error(err);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

 // =============================
// MENSAGEM AOS NOIVOS
// =============================
const msgForm = document.getElementById("msgForm");

if (msgForm) {
  msgForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = msgForm.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Pegando os valores do formulário
    const msgNome = document.getElementById("msg-nome").value;
    const msgNoivos = document.getElementById("msg-noivos").value;

    try {
      // Preparando os dados para envio
      const formData = new URLSearchParams();
      formData.append("msg-nome", msgNome);
      formData.append("msg-noivos", msgNoivos);

      // Enviando para o Google Apps Script
      const res = await fetch('https://script.google.com/macros/s/AKfycbz4mtIX4VMlPcvRNVu4LS9WhkfOW8DP0oU9IOgZlzqPpT-JJCit1hBBkiFKvFJtawFz/exec', {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.result === "sucesso" || data.result === "success") {
        alert("Mensagem enviada com sucesso!");
        msgForm.reset();
      } else {
        alert("Ocorreu um erro ao enviar. Detalhes: " + JSON.stringify(data));
        console.error(data);
      }
    } catch (err) {
      alert("Erro de rede: " + err.message);
      console.error(err);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

});

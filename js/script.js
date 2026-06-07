const grid = document.getElementById("grid");
const ultimo = document.getElementById("ultimo");
const lista = document.getElementById("lista");

const customModal = document.getElementById("customModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalBtnConfirm = document.getElementById("modalBtnConfirm");
const modalBtnCancel = document.getElementById("modalBtnCancel");

let historico = [];

const letras = ["B", "I", "N", "G", "O"];
const classes = ["b", "i", "n", "g", "o"];

function abrirAlerta(titulo, mensagem, tipoBotao = "vermelho") {
  return new Promise((resolve) => {
    modalTitle.textContent = titulo;
    modalMessage.textContent = mensagem;

    if (tipoBotao === "verde") {
      modalBtnConfirm.className = "btn-modal-confirm verde";
    } else {
      modalBtnConfirm.className = "btn-modal-confirm";
    }

    customModal.classList.add("show");

    function fechar(resultado) {
      customModal.classList.remove("show");
      modalBtnConfirm.removeEventListener("click", cliqueConfirmar);
      modalBtnCancel.removeEventListener("click", cliqueCancelar);
      resolve(resultado);
    }

    function cliqueConfirmar() {
      fechar(true);
    }
    function cliqueCancelar() {
      fechar(false);
    }

    modalBtnConfirm.addEventListener("click", cliqueConfirmar);
    modalBtnCancel.addEventListener("click", cliqueCancelar);
  });
}

for (let linha = 0; linha < 5; linha++) {
  const letra = document.createElement("div");

  letra.className = `letra ${classes[linha]}`;
  letra.textContent = letras[linha];

  grid.appendChild(letra);

  for (let coluna = 1; coluna <= 15; coluna++) {
    const numero = linha * 15 + coluna;
    const div = document.createElement("div");

    div.className = "num";
    div.textContent = numero;

    div.addEventListener("click", async () => {
      const classeMarcacao = `marcado-${classes[linha]}`;
      const valor = `${letras[linha]}-${numero}`;

      if (div.classList.contains(classeMarcacao)) {
        const confirmar = await abrirAlerta(
          "Desmarcar Número",
          `Deseja realmente desmarcar o número ${valor}?\nEsta ação removerá o número do histórico.`,
          "vermelho",
        );

        if (!confirmar) return;

        div.classList.remove(classeMarcacao);

        const indice = historico.findIndex((item) => item.texto === valor);
        if (indice !== -1) {
          historico.splice(indice, 1);
        }

        atualizarHistorico();

        if (historico.length > 0) {
          ultimo.textContent = historico[0].texto;
        } else {
          ultimo.textContent = "--";
        }

        return;
      }

      div.classList.add(classeMarcacao);

      historico.unshift({
        texto: valor,
        classe: classes[linha],
      });

      ultimo.textContent = valor;
      atualizarHistorico();
    });

    grid.appendChild(div);
  }
}

function atualizarHistorico() {
  if (historico.length === 0) {
    lista.innerHTML = "Nenhum número sorteado.";
    return;
  }

  lista.innerHTML = "";

  historico.forEach((item) => {
    const span = document.createElement("span");
    span.className = "item-historico";
    span.textContent = item.texto;
    lista.appendChild(span);
  });
}

async function confirmarNovoJogo() {
  const confirmar = await abrirAlerta(
    "Iniciar Novo Jogo",
    "Tem certeza que deseja iniciar um novo jogo? Todos os números marcados atuais serão limpos.",
    "verde",
  );

  if (!confirmar) return;

  reiniciar();
}

function reiniciar() {
  historico = [];
  ultimo.textContent = "--";
  lista.innerHTML = "Nenhum número sorteado.";

  document.querySelectorAll(".num").forEach((numero) => {
    numero.classList.remove("marcado-b", "marcado-i", "marcado-n", "marcado-g", "marcado-o");
  });
}

function fecharTelaEspera() {
  const tela = document.getElementById("telaEspera");
  if (tela) {
    tela.classList.add("escondida");
  }
}

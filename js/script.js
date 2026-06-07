const grid = document.getElementById("grid");
const ultimo = document.getElementById("ultimo");
const lista = document.getElementById("lista");

let historico = [];

const letras = ["B", "I", "N", "G", "O"];
const classes = ["b", "i", "n", "g", "o"];

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

    div.addEventListener("click", () => {
      const classeMarcacao = `marcado-${classes[linha]}`;
      const valor = `${letras[linha]}-${numero}`;

      if (div.classList.contains(classeMarcacao)) {
        const confirmar = confirm(
          `Deseja realmente desmarcar o número ${valor}?\n\nEsta ação removerá o número do histórico.`,
        );

        if (!confirmar) {
          return;
        }

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

function reiniciar() {
  if (!confirm("Tem certeza que deseja iniciar um novo jogo?")) {
    return;
  }

  historico = [];

  ultimo.textContent = "--";

  lista.innerHTML = "Nenhum número sorteado.";

  document.querySelectorAll(".num").forEach((numero) => {
    numero.classList.remove("marcado-b", "marcado-i", "marcado-n", "marcado-g", "marcado-o");
  });
}

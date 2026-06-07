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
      if (
        div.classList.contains("marcado-b") ||
        div.classList.contains("marcado-i") ||
        div.classList.contains("marcado-n") ||
        div.classList.contains("marcado-g") ||
        div.classList.contains("marcado-o")
      ) {
        return;
      }

      div.classList.add(`marcado-${classes[linha]}`);

      const valor = `${letras[linha]}-${numero}`;

      ultimo.textContent = valor;

      historico.unshift({
        texto: valor,
        classe: classes[linha],
      });

      atualizarHistorico();
    });

    grid.appendChild(div);
  }
}

function atualizarHistorico() {
  lista.innerHTML = "";

  historico.forEach((item) => {
    const span = document.createElement("span");

    span.className = `item-historico ${item.classe}`;
    span.textContent = item.texto;

    lista.appendChild(span);
  });
}

function reiniciar() {
  if (!confirm("Limpar todos os números?")) {
    return;
  }

  historico = [];

  ultimo.textContent = "--";

  lista.innerHTML = "Nenhum número sorteado.";

  document.querySelectorAll(".num").forEach((numero) => {
    numero.classList.remove("marcado-b", "marcado-i", "marcado-n", "marcado-g", "marcado-o");
  });
}

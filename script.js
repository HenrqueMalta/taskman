function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem("tarefas");
  return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}

function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
  const listaPendentes = document.getElementById("listaPendentes");
  const listaConcluidas = document.getElementById("listaConcluidas");
  listaPendentes.innerHTML = "";
  listaConcluidas.innerHTML = "";

  const tarefas = carregarTarefas();

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.className = tarefa.feita ? "concluida" : "";

    if (tarefa.editando) {
      // Modo de edição
      li.innerHTML = `
        <input type="text" id="editar-${index}" value="${tarefa.texto}">
        <div class="btn-acoes">
          <button class="btn-salvar" onclick="salvarEdicao(${index})"><i class="fa-solid fa-floppy-disk"></i></button>
          <button class="btn-excluir" onclick="cancelarEdicao(${index})"><i class="fa-solid fa-xmark"></i></button>
        </div>
      `;
    } else {
      // Exibição normal
      li.innerHTML = `
        <span>${tarefa.texto}</span>
        <div class="btn-acoes">
          ${tarefa.feita ? "" : `<button class="btn-concluir" onclick="alternarTarefa(${index})"><i class="fa-solid fa-check"></i></button>`}
          <button class="btn-editar" onclick="editarTarefa(${index})"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-excluir" onclick="removerTarefa(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
    }

    if (tarefa.feita) {
      listaConcluidas.appendChild(li);
    } else {
      listaPendentes.appendChild(li);
    }
  });
}

function adicionarTarefa() {
  const input = document.getElementById("novaTarefa");
  const texto = input.value.trim();

  if (texto === "") return;

  const tarefas = carregarTarefas();
  tarefas.push({ texto: texto, feita: false, editando: false });
  salvarTarefas(tarefas);

  input.value = "";
  renderizarTarefas();
}

function removerTarefa(index) {
  const tarefas = carregarTarefas();
  tarefas.splice(index, 1);
  salvarTarefas(tarefas);
  renderizarTarefas();
}

function alternarTarefa(index) {
  const tarefas = carregarTarefas();
  tarefas[index].feita = !tarefas[index].feita;
  salvarTarefas(tarefas);
  renderizarTarefas();
}

// ---- Edição ----
function editarTarefa(index) {
  const tarefas = carregarTarefas();
  tarefas[index].editando = true;
  salvarTarefas(tarefas);
  renderizarTarefas();
}

function salvarEdicao(index) {
  const tarefas = carregarTarefas();
  const novoTexto = document.getElementById(`editar-${index}`).value.trim();

  if (novoTexto !== "") {
    tarefas[index].texto = novoTexto;
  }
  tarefas[index].editando = false;
  salvarTarefas(tarefas);
  renderizarTarefas();
}

function cancelarEdicao(index) {
  const tarefas = carregarTarefas();
  tarefas[index].editando = false;
  salvarTarefas(tarefas);
  renderizarTarefas();
}

// ---- Filtros ----
function mostrarPendentes() {
  document.querySelector(".pendentes").style.display = "block";
  document.querySelector(".concluidas").style.display = "none";
}

function mostrarConcluidas() {
  document.querySelector(".pendentes").style.display = "none";
  document.querySelector(".concluidas").style.display = "block";
}

function mostrarTodas() {
  document.querySelector(".pendentes").style.display = "block";
  document.querySelector(".concluidas").style.display = "block";
}

document.addEventListener("DOMContentLoaded", renderizarTarefas);
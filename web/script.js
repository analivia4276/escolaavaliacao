const url = "http://localhost:3000";

const professor = JSON.parse(localStorage.getItem("professor"));

/* =========================
   LOGIN
========================= */

const formLogin = document.querySelector("#formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function (e) {

        e.preventDefault();

        fetch(url + "/professores/listar")

            .then(res => res.json())

            .then(lista => {

                const professorEncontrado = lista.find(p =>
                    p.email === email.value &&
                    p.senha === senha.value
                );

                if (!professorEncontrado) {
                    alert("Email ou senha inválidos");
                    return;
                }

                localStorage.setItem(
                    "professor",
                    JSON.stringify(professorEncontrado)
                );

                window.location.href = "index2.html";
            })

            .catch(() => {
                alert("Erro ao conectar com a API");
            });

    });

}

/* =========================
   TURMAS
========================= */

const listaTurmas = document.querySelector("#listaTurmas");

if (listaTurmas && professor) {

    document.querySelector("#nomeProfessor").innerHTML =
        "Professor: " + professor.nome;

    carregarTurmas();
}

function carregarTurmas() {

    fetch(
        url +
        "/turmas/listarProfessor/" +
        professor.id
    )

    .then(res => res.json())

    .then(data => {

        listaTurmas.innerHTML = "";

        data.forEach(turma => {

            listaTurmas.innerHTML += `
                <tr>
                    <td>${turma.id}</td>
                    <td>${turma.nome}</td>

                    <td>

                        <button
                            class="btnVisualizar"
                            onclick="visualizarTurma(${turma.id})">
                            Visualizar
                        </button>

                        <button
                            class="btnExcluir"
                            onclick="excluirTurma(${turma.id})">
                            Excluir
                        </button>

                    </td>
                </tr>
            `;
        });

    })

    .catch(() => {
        alert("Erro ao carregar turmas");
    });
}

function visualizarTurma(id) {

    console.log("Turma clicada:", id);

    localStorage.setItem("turmaId", id);

    window.location.href = "index3.html";
}

function excluirTurma(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta turma?"
    );

    if (!confirmar) return;

    fetch(url + "/turmas/excluir/" + id, {
        method: "DELETE"
    })

    .then(res => res.json())

    .then(data => {

        if (data.erro) {
            alert(data.erro);
            return;
        }

        alert(data.mensagem);

        carregarTurmas();
    })

    .catch(() => {
        alert("Erro ao excluir turma");
    });
}

function abrirModalTurma() {
    document
        .querySelector("#modalTurma")
        .classList.remove("oculto");
}

function fecharModalTurma() {
    document
        .querySelector("#modalTurma")
        .classList.add("oculto");
}

const formTurma = document.querySelector("#formTurma");

if (formTurma && professor) {

    formTurma.addEventListener("submit", function (e) {

        e.preventDefault();

        const turma = {
            nome: nomeTurmaInput.value,
            professorId: professor.id
        };

        fetch(url + "/turmas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(turma)
        })

        .then(res => res.json())

        .then(() => {

            alert("Turma cadastrada");

            formTurma.reset();

            fecharModalTurma();

            carregarTurmas();
        })

        .catch(() => {
            alert("Erro ao cadastrar turma");
        });
    });
}

/* =========================
   ATIVIDADES
========================= */

const listaAtividades = document.querySelector("#listaAtividades");

const turmaId = localStorage.getItem("turmaId");

if (listaAtividades && professor) {

    document.querySelector("#nomeProfessor").innerHTML =
        "Professor: " + professor.nome;

    carregarNomeTurma();

    carregarAtividades();
}

function carregarNomeTurma() {

    fetch(url + "/turmas/buscar/" + turmaId)

        .then(res => res.json())

        .then(turma => {

            document.querySelector("#nomeTurma").innerHTML =
                "Turma: " + turma.nome;
        })

        .catch(() => {

            document.querySelector("#nomeTurma").innerHTML =
                "Turma não encontrada";
        });
}

function carregarAtividades() {

    fetch(url + "/atividades/listar")

        .then(res => res.json())

        .then(data => {

            listaAtividades.innerHTML = "";

            const atividadesTurma = data.filter(
                atividade => atividade.turmaId == turmaId
            );

            atividadesTurma.forEach(atividade => {

                listaAtividades.innerHTML += `
                    <tr>
                        <td>${atividade.id}</td>
                        <td>${atividade.descricao}</td>

                        <td>
                            <button
                                class="btnExcluir"
                                onclick="excluirAtividade(${atividade.id})">
                                Excluir
                            </button>
                        </td>
                    </tr>
                `;
            });

        })

        .catch(() => {
            alert("Erro ao carregar atividades");
        });
}

function abrirModalAtividade() {

    document
        .querySelector("#modalAtividade")
        .classList.remove("oculto");
}

function fecharModalAtividade() {

    document
        .querySelector("#modalAtividade")
        .classList.add("oculto");
}

const formAtividade = document.querySelector("#formAtividade");

if (formAtividade) {

    formAtividade.addEventListener("submit", function (e) {

        e.preventDefault();

        const atividade = {
            descricao: descricao.value,
            turmaId: Number(turmaId)
        };

        fetch(url + "/atividades/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atividade)
        })

        .then(res => res.json())

        .then(() => {

            alert("Atividade cadastrada");

            formAtividade.reset();

            fecharModalAtividade();

            carregarAtividades();
        })

        .catch(() => {
            alert("Erro ao cadastrar atividade");
        });
    });
}

function excluirAtividade(id) {

    if (!confirm("Deseja excluir esta atividade?"))
        return;

    fetch(url + "/atividades/excluir/" + id, {
        method: "DELETE"
    })

    .then(res => res.json())

    .then(() => {

        alert("Atividade excluída");

        carregarAtividades();
    })

    .catch(() => {

        alert("Erro ao excluir atividade");
    });
}

function voltarTurmas() {

    window.location.href = "index2.html";
}

/* =========================
   LOGOUT
========================= */

function sair() {

    localStorage.removeItem("professor");
    localStorage.removeItem("turmaId");

    window.location.href = "index.html";
}
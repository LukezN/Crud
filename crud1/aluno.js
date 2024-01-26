document.addEventListener('DOMContentLoaded', function () {
    getAlunos();
});

function onCadastro() {
    localStorage.clear();
    window.location.href = 'form-alunos/form-aluno.html';
}

function getAlunos() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', getUrl(), false);
    xmlHttp.send(null);
    createTable(JSON.parse(xmlHttp.responseText));
}

function createTable(data) {
    var tabela = window.document.getElementById('tabela');
    var tbody = tabela.getElementsByTagName('tbody')[0];

    resetarTabela(tbody);

    for (i = 0; i < data.length; i++) {
        let aluno = data[i];

        var row = document.createElement('tr');
        var cellName = document.createElement('td');
        var cellAge = document.createElement('td');
        var cellTest = document.createElement('td');
        var cellActions = document.createElement('td');

        var editarIcon = document.createElement('i');
        editarIcon.classList.add('bi', 'bi-pencil-fill');
        editarIcon.addEventListener('click', function () {
            editarAluno(aluno);
        });

        var excluirIcon = document.createElement('i');
        excluirIcon.classList.add('bi', 'bi-trash-fill');
        excluirIcon.addEventListener('click', function () {
            excluirAluno(aluno);
        });

        cellActions.appendChild(editarIcon);
        cellActions.appendChild(excluirIcon);

        cellName.textContent = aluno.name;
        cellAge.textContent = aluno.age;
        cellTest.textContent = aluno.test;

        row.appendChild(cellName);
        row.appendChild(cellAge);
        row.appendChild(cellTest);
        row.appendChild(cellActions);

        tbody.appendChild(row);
    }
}

function resetarTabela(tbody) {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function excluirAluno(aluno) {
    const url = `http://localhost:3000/alunos/${aluno.id}`;
    console.log('Excluir aluno:', aluno);
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            getAlunos();
        }
    };
    xhr.send();
}

function getUrl() {
    return 'http://localhost:3000/alunos';
}

function editarAluno(aluno) {
    // Redireciona para a página de edição do aluno, passando o ID do aluno como parâmetro na URL
    window.location.href = `form-alunos/form-aluno.html`;
    localStorage.setItem('aluno', JSON.stringify(aluno));
}
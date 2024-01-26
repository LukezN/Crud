document.addEventListener('DOMContentLoaded', function () {
    var aluno = JSON.parse(localStorage.getItem('aluno'));
    if (aluno) {
        document.getElementById('inome').value = aluno.name;
        document.getElementById('iidade').value = aluno.age;
        document.getElementById('inota').value = aluno.test;
    }
});

function addAluno() {
    if (!getAluno().name || !getAluno().age || !getAluno().test) {
        return
    }
    var aluno = JSON.parse(localStorage.getItem('aluno'));
    var xhr = new XMLHttpRequest();
    if (aluno) {
        const url = `http://localhost:3000/alunos/${aluno.id}`;
        xhr.open('PUT', url, true);
    } else {
        const url = "http://localhost:3000/alunos"
        xhr.open("POST", url, false);
    }
    xhr.send(JSON.stringify(getAluno()));
    localStorage.clear();
    window.location.href = '../alunos.html'
}

function getAluno() {
    var dadosAluno = {};
    dadosAluno.name = document.querySelector('#inome').value;
    dadosAluno.age = document.querySelector('#iidade').value;
    dadosAluno.test = document.querySelector('#inota').value;
    return dadosAluno;
}

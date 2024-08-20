document.addEventListener('DOMContentLoaded', () => {
    let poderes = [];
    let colecao = JSON.parse(localStorage.getItem('colecao')) || [];

    fetch('poderes.json')
        .then(response => response.json())
        .then(data => {
            poderes = data.poderes;
            exibirPoderes(poderes);
        });

    document.getElementById('classe').addEventListener('change', filtrarPoderes);
    document.getElementById('busca').addEventListener('input', filtrarPoderes);

    function exibirPoderes(lista) {
        const container = document.getElementById('poderes');
        container.innerHTML = '';
        lista.forEach(poder => {
            const div = document.createElement('div');
            div.classList.add('poder');
            div.innerHTML = `<h3>${poder.nome}</h3>
                             <p>Classes: ${poder.classe.join(', ')}</p>
                             <p>Custo de SP: ${poder.custoSP}</p>
                             <p>${poder.descrição}</p>
                             <button onclick="adicionarAColecao('${poder.nome}')">Adicionar à Coleção</button>`;
            container.appendChild(div);
        });
    }

    function filtrarPoderes() {
        const classeSelecionada = document.getElementById('classe').value;
        const busca = document.getElementById('busca').value.toLowerCase();

        let filtrados = poderes.filter(poder => {
            return (classeSelecionada === 'todos' || poder.classe.includes(classeSelecionada)) &&
                   (poder.nome.toLowerCase().includes(busca) || poder.custoSP.toString() === busca);
        });

        exibirPoderes(filtrados);
    }

    window.adicionarAColecao = (nome) => {
        const poder = poderes.find(p => p.nome === nome);
        if (poder && !colecao.includes(poder.nome)) {
            colecao.push(poder.nome);
            localStorage.setItem('colecao', JSON.stringify(colecao));
            exibirColecao();
        }
    };

    function exibirColecao() {
        const ul = document.getElementById('colecao');
        ul.innerHTML = '';
        colecao.forEach(nome => {
            const li = document.createElement('li');
            li.textContent = nome;
            ul.appendChild(li);
        });
    }

    exibirColecao();
});

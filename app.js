//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do numero secreto!';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número de 1 a 10 ?';

let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = geraNumeroAleatorio();
tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', 'Escolha um numero de 1 a 10?');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;


    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `você descobriu o numero secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'o numero  secreto é menor que o seu chute');
        } else {
            exibirTextoNaTela('p', 'O numero secreto é maior que o seu chute');
        } tentativas++;
        limparCampo();
    }
}

function geraNumeroAleatorio() {
    let numeroScolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementoNaLista = listaDeNumeroSorteados.length

    if (quantidadeDeElementoNaLista == numeroLimite) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroScolhido)) {
        return geraNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroScolhido);
        console.log(listaDeNumeroSorteados);
        return numeroScolhido;
    }

}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';

}

function reiniciarJogo() {
    numeroSecreto = geraNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
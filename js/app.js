var cartas = [
    {nome: "Scorpion", imagem: "https://www.comboinfinito.com.br/principal/wp-content/uploads/2020/01/Mortal-Kombat-11-2.jpg", atributos: {ataque: 8, defesa: 6, combo: 9}},
    {nome: "Sub-zero", imagem: "https://1.bp.blogspot.com/-pWr1lRdt_sY/YDBgqvXHe0I/AAAAAAAC_3c/19dFyNpF5ZI_VbO5ZNmmzGlmhlUx6focgCLcBGAsYHQ/s1600/subzero-mortal-kombat-filme-2021.jpg", atributos: {ataque: 6, defesa: 7, combo: 7}},
    {nome: "Mileena", imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/1449882/ss_f52df6e88826891d405e7ec2098aac3e4a81f2cc.1920x1080.jpg?t=1606325858", atributos: {ataque: 7, defesa: 5, combo: 6}},
    {nome: "Baraka", imagem: "https://i.pinimg.com/originals/c6/4c/73/c64c731084021faacaac3f966fc51a46.jpg", atributos: {ataque: 6, defesa: 8, combo: 5}},
    {nome: "Kung Lao", imagem: "https://static2.gamerantimages.com/wordpress/wp-content/uploads/2020/05/mortal-kombat-11-kung-lao.jpg", atributos: {ataque: 7, defesa: 8, combo: 8}},
    {nome: "Liu Kang", imagem: "https://www.comboinfinito.com.br/principal/wp-content/uploads/2019/08/Mortal-Kombat-7.jpg", atributos: {ataque: 9, defesa: 5, combo: 9}},
    {nome: "Raiden", imagem: "https://mocah.org/uploads/posts/318939-Raiden-Mortal-Kombat-11-4K.jpg", atributos: {ataque: 7, defesa: 8, combo: 7}},
    {nome: "Cassie Cage", imagem: "https://img.ibxk.com.br/2019/07/23/23122416460413.jpg", atributos: {ataque: 8, defesa: 7, combo: 7}},
    {nome: "Skarlet", imagem: "https://i.pinimg.com/originals/c5/02/d5/c502d5897df384fee5b585eb541b50de.png", atributos: {ataque: 8, defesa: 6, combo: 6}},
    {nome: "Jax Briggs", imagem: "https://cdna.artstation.com/p/assets/covers/images/026/963/862/large/manuel-robles-manuel-robles-jax-skin-b-thumb-b.jpg?1590205421", atributos: {ataque: 8, defesa: 9, combo: 6}},
];

var cartaMaquina
var cartaJogador

function sortearCarta() {
    var numeroCartaMaquina = numeroCarta()
    var numeroCartaJogador = numeroCarta()
    while(numeroCartaJogador == numeroCartaMaquina) {
        numeroCartaJogador = numeroCarta()
    }
    
    cartaMaquina = cartas[numeroCartaMaquina]
    cartaJogador = cartas[numeroCartaJogador]

    document.getElementById("btnSortear").disabled = true
    document.getElementById("btnJogar").disabled = false

    exibirCartaJogador()

    /* Faz o resultado desaparecer */
    var elementoResultado = document.getElementById("resultado")
    elementoResultado.innerHTML = `<p class='resultado-final' style='display: none'></p>`

    /* Faz a carta da máquina desaparecer */
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura ='<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">'
    divCartaMaquina.style.backgroundImage =`none`
    divCartaMaquina.innerHTML = moldura
}

function numeroCarta() {
    return Math.round(Math.random() * (cartas.length - 1))
}

function obtemAtributosSelecionado() {
    var radioAtributos = document.getElementsByName("atributo")
    
    for(var i = 0; i < radioAtributos.length; i++) {
        if(radioAtributos[i].checked == true) {
            return radioAtributos[i].value
        }
    }
}

function jogar() {
    var atributoSelecionado = obtemAtributosSelecionado()
    var elementoResultado = document.getElementById("resultado")

    if(cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        elementoResultado.innerHTML = `<p class='resultado-final'> Venceu! </p>`
        document.getElementById('fatality').play()
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        elementoResultado.innerHTML = `<p class='resultado-final'> Perdeu! </p>`
        document.getElementById('fatality').play()
    } else {
        elementoResultado.innerHTML = `<p class='resultado-final'> Empatou </p>`
    }

    document.getElementById('btnJogar').disabled = true
    document.getElementById('btnSortear').disabled = false
    exibirCartaMaquina()
}

function exibirCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    divCartaJogador.style.backgroundImage =`url(${cartaJogador.imagem})`

    var moldura ='<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">'
    var tagHTML = "<div id='opcoes' class='carta-status'>"
    var opcoesTexto = ""

    for(var atributo in cartaJogador.atributos) {
        opcoesTexto += `<input type='radio' name='atributo' checked value='${atributo}'> ${atributo} ${cartaJogador.atributos[atributo]} <br>`
    }

    var nome = `<p class='carta-subtitle'>${cartaJogador.nome}</p>`

    divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + '</div>'
}

function exibirCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    divCartaMaquina.style.backgroundImage =`url(${cartaMaquina.imagem})`

    var moldura ='<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">'
    var tagHTML = "<div id='opcoes' class='carta-status'>"
    var opcoesTexto = ""

    for(var atributo in cartaMaquina.atributos) {
        opcoesTexto += `<p name='atributo' value='${atributo}'> ${atributo} ${cartaMaquina.atributos[atributo]} </p>`
    }

    var nome = `<p class='carta-subtitle'>${cartaMaquina.nome}</p>`

    divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + '</div>'
}
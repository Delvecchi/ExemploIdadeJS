
function calcular(event) {
    // Previne o recarregar da página
    event.preventDefault()

    console.log("Foi executada a função calcular")

    // Passo 1
    let usuario = pegarValores()

    // Passo2
    let segundos = calcularSegundos(usuario.nascimento, usuario.data)
}
function pegarValores() {
    let valoresCaprutado = Date.parse(document.getElementById("data").value);
    

    let dataAtual = Date.parse(new Date()) 
     

    let dadosIdade= {
        nascimento: valoresCaprutado,
        data: dataAtual 
    }
    console.log(dadosIdade)
    

    return dadosIdade
}

function calcularSegundos(nascimento, data) {
    let segundosCalculados = data - nascimento

    segundosCalculados = segundosCalculados / 3600
    segundosCalculados = segundosCalculados / 8760
    segundosCalculados = segundosCalculados * 0,0001

    console.log(segundosCalculados)

    return segundosCalculados
}

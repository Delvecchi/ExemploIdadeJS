
function calcular(event) {
    // Previne o recarregar da página
    event.preventDefault()

    console.log("Foi executada a função calcular")

    // Passo 1
    let usuario = pegarValores()

    // Passo2
    // let segundos = calcularSegundos(usuario.nascimento)

    usuario = dadosAtualizado(usuario)

    cadastrarIdade(usuario)
    
    carregarUsuarios()


    
}

function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let valoresCaprutado = Date.parse(document.getElementById("data").value);
    let atual = Date.parse(new Date()) 
    let segundosCalculados = atual  - valoresCaprutado

    segundosCalculados = segundosCalculados / 3600
    segundosCalculados = segundosCalculados / 8760
    segundosCalculados = parseInt(segundosCalculados * 0.001)

    let dadosUsuario = {
        nome: nomeRecebido,
        nascimento: valoresCaprutado,
        idade: segundosCalculados
         
    }
    console.log(dadosUsuario)
    

    return dadosUsuario
}

function dadosAtualizado(dadosUsuario) {
    
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())

    console.log(dataHoraAtual);

    // Organizando o objeto para salvar
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        dataCadastro: dataHoraAtual
    }
    console.log(dadosUsuarioAtualizado)

    return dadosUsuarioAtualizado;
}


function cadastrarIdade(dadosUsuario) {
    let listaUsuarios = []

    // Se houver uma lista de usuarios no localStorage, carregar isso para a variavel listaUsuarios
    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse( localStorage.getItem("usuariosCadastrados") )
    }

    // Adiciona o usuario na lista de usuarios
    listaUsuarios.push(dadosUsuario)

    // Salva a listaUsuarios no localStorage
    localStorage.setItem("usuariosCadastrados",  JSON.stringify(listaUsuarios) )
}

function carregarUsuarios() {
    let listaCarregada = []

    if ( localStorage.getItem("usuariosCadastrados") != null ) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listaCarregada.length == 0) {
        // Se não tiver nenhum usuario cadastrado, mostrar mensagem
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuario cadastrado ☹ </td>
        </tr>`

    } else {
        // Montar conteudo da tabela
        montarTabela(listaCarregada)
    }

    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios() )

function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        template += `<tr>
            <td data-cell="idade">${usuario.nome}</td>
            <td data-cell="data de cadastro">${usuario.idade}</td>
            <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
        </tr>`
    })

    tabela.innerHTML = template;
}

function deletarRegistros() {
    // Remove o item do localStorage
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a página
    window.location.reload()
}
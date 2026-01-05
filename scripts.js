// Obtendo os elementos do DOM
const form = document.querySelector("form")
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Capturando o evento de submit no formulario.

form.onsubmit =  (event) => {
  event.preventDefault();
  
  // Chamada da função que retorna o valor da cotação.
 
  findCurrency(currency.value).then(data => {
    // data.data.mid => Caminho do arquivo JSON com o valor da cotação.
    let currencyValue = data.data.mid.toFixed(2) // Limita a dois numeros na casa decimal.

    // Função que mostra o resultado.
    
    writeResultFooter(currency.value, currencyValue, amount.value)
    
  }).catch((e) => { 
    //Tratamento de erros
    console.log(e)
    description.textContent = "Ocorreu um erro, tente novamente mais tarde."
    result.textContent = ""
  })
}

// Função para buscar os dados da conversão da moeda na API

async function findCurrency(currency) {
  const url = `https://hexarate.paikama.co/api/rates/${currency}/BRL/latest`; // "Cotação atualiza uma vez ao dia"
  
  try {
    const response = await fetch(url); // Aguarda a resposta HTTP.
    const data = await response.json(); // Aguarda a conversão para JSON.
   // data.data.mid => Caminho do arquivo JSON com o valor da cotação.
    return data;
  } catch (error) {
    console.error('Erro: Não foi possivel localizar os dados da API', error); // Tratamento de erros
  }
}

// Aplica a classe que exibe o footer com o resultado da conversão
function showResultFooter() {
  footer.classList.add("show-result")
}

// Calcula e escreve no footer a conversão da moeda.

function writeResultFooter(currency, currencyValue, amount) {
  let convert = currencyValue * amount // Converte para BRL
  convert = convert.toFixed(2) // Limita a duas casas decimais
  convert = convert.toString().replace('.', ',') // converte para string e substitui o "." pela ",".

  switch (currency) {
    case "USD":
      description.textContent = `US$ 1 = R$ ${currencyValue.replace('.', ',')}` // Valor da contação em BRL
      result.textContent = `${convert} Reais`
      showResultFooter()
      break
    case "EUR":
      description.textContent = `€ 1 = R$ ${currencyValue.replace('.', ',')}` // Valor da contação em BRL
      result.textContent = `${convert} Reais`
      showResultFooter()
      break
    case "GBP":
      description.textContent = `£ 1 = R$ ${currencyValue.replace('.', ',')}` // Valor da contação em BRL
      result.textContent = `${convert} Reais`
      showResultFooter()
      break
  }
}

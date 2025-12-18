// Obtendo os elementos do DOM
const form = document.querySelector("form")
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");

// Manipulando o input amount para receber somente números.

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Função para buscar os dados da conversão da moeda na API

async function buscarDados(currency, amount) {
  const url = `https://hexarate.paikama.co/api/rates/${currency}/BRL/latest`;
  
  try {
    const response = await fetch(url); // Aguarda a resposta HTTP.
    const data = await response.json(); // Aguarda a conversão para JSON.
    let = convertToReal = data.data.mid * amount; // Calcula a conversão para real.
    return convertToReal;
  } catch (error) {
    console.error('Erro:', error); // Trata erros
  }
}

// Capturando o evento de submit no formulario.

form.onsubmit =  (event) => {
  event.preventDefault();
  
  buscarDados(currency.value, amount.value).then(convertToReal => {
    console.log(convertToReal)
  }).catch(e => {console.log(e)})

}


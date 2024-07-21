// Obtém valores dos elementos HTML
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const amountInput = document.getElementById('amount');

async function getPrice() {
    // Obtém os valores selecionados e do input
    const fromValue = fromSelect.value;
    const toValue = toSelect.value;
    const amountValue = parseFloat(amountInput.value);

    try {
        // Faz a requisição para a API
        const { data } = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');

        // Obtém a taxa de câmbio correta
        let rate;
        if (fromValue === 'dolar' && toValue === 'real') {
            rate = data.USDBRL.bid;
        } else if (fromValue === 'real' && toValue === 'dolar') {
            rate = 1 / data.USDBRL.bid;
        } else if (fromValue === 'euro' && toValue === 'real') {
            rate = data.EURBRL.bid;
        } else if (fromValue === 'real' && toValue === 'euro') {
            rate = 1 / data.EURBRL.bid;
        } else if (fromValue === 'dolar' && toValue === 'euro') {
            // Calcula a taxa de câmbio entre Dólar e Euro
            rate = data.USDBRL.bid / data.EURBRL.bid;
        } else if (fromValue === 'euro' && toValue === 'dolar') {
            // Calcula a taxa de câmbio entre Euro e Dólar
            rate = data.EURBRL.bid / data.USDBRL.bid;
        } else {
            // Se a conversão não for suportada
            alert('Conversão não suportada.');
            return;
        }

        // Calcula o valor convertido e exibe
        const convertedAmount = (amountValue * rate).toFixed(2);
        if (toValue == 'real') {
             document.getElementById('final-converted').textContent = 'R$ ' + convertedAmount; 

        } else if (toValue == 'dolar') {
            document.getElementById('final-converted').textContent = '$ ' + convertedAmount; 

        } else {
            document.getElementById('final-converted').textContent = '€ ' + convertedAmount; 

        }

    } catch (error) {
        console.error('Erro ao obter a cotação:', error);
        alert('Erro ao obter a cotação. Verifique o console para mais detalhes.');
    }
}

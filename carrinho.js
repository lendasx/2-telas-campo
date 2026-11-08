document.addEventListener('DOMContentLoaded', () => {
    
    // Função para atualizar o valor total do carrinho
    function atualizarTotal() {
        let subtotal = 0;
        const itens = document.querySelectorAll('.item-carrinho');

        itens.forEach(item => {
            const precoTexto = item.querySelector('.preco-unitario').innerText;
            const preco = parseFloat(precoTexto.replace('R$ ', '').replace(',', '.'));
            const qtd = parseInt(item.querySelector('.controle-qtd span').innerText);
            subtotal += preco * qtd;
        });

        const taxaEntrega = subtotal > 0 ? 5.00 : 0;
        const total = subtotal + taxaEntrega;

        // Atualiza os valores na tela
        const subtotalEl = document.querySelector('.linha-resumo:nth-child(1) span:nth-child(2)');
        const entregaEl = document.querySelector('.linha-resumo:nth-child(2) span:nth-child(2)');
        const totalEl = document.querySelector('.linha-resumo.total strong');

        if (subtotalEl) subtotalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        if (entregaEl) entregaEl.innerText = `R$ ${taxaEntrega.toFixed(2).replace('.', ',')}`;
        if (totalEl) totalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Evento de clique para aumentar, diminuir e remover itens
    document.addEventListener('click', (event) => {

        // Botão de Aumentar (+)
        if (event.target.matches('.controle-qtd button:last-child')) {
            const spanQtd = event.target.previousElementSibling;
            let qtd = parseInt(spanQtd.innerText);
            spanQtd.innerText = qtd + 1;
            atualizarTotal();
        }

        // Botão de Diminuir (-)
        if (event.target.matches('.controle-qtd button:first-child')) {
            const spanQtd = event.target.nextElementSibling;
            let qtd = parseInt(spanQtd.innerText);
            if (qtd > 1) {
                spanQtd.innerText = qtd - 1;
                atualizarTotal();
            }
        }

        // Botão de Remover
        if (event.target.matches('.btn-remover')) {
            const item = event.target.closest('.item-carrinho');
            item.remove(); // Remove o card do HTML
            atualizarTotal();
        }
    });

});
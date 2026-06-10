// Aguarda o carregamento do DOM para garantir a segurança da manipulação dos elementos
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. COMPONENTE ACCORDION (Caixas Expansíveis de Benefícios)
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            
            // Alterna a classe ativa do item clicado
            item.classList.toggle("active");
            
            // Opcional: Fecha os outros itens abertos (Efeito Sanfona Único)
            document.querySelectorAll(".accordion-item").forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });
        });
    });

    // ==========================================================================
    // 2. ACESSIBILIDADE: CONTROLE DE CONTRASTE (MODO CLARO / ESCURO)
    // ==========================================================================
    const btnTema = document.getElementById("btn-tema");
    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // ==========================================================================
    // 3. ACESSIBILIDADE: DIMENSIONAMENTO DE FONTE
    // ==========================================================================
    const btnAumentar = document.getElementById("btn-aumentar");
    const btnDiminuir = document.getElementById("btn-diminuir");
    let tamanhoAtual = 100; // Porcentagem inicial da escala base

    btnAumentar.addEventListener("click", () => {
        if (tamanhoAtual < 130) { // Limite máximo seguro
            tamanhoAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoAtual}%`;
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if (tamanhoAtual > 80) { // Limite mínimo seguro
            tamanhoAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoAtual}%`;
        }
    });

    // ==========================================================================
    // 4. ACESSIBILIDADE: LEITURA POR VOZ (SpeechSynthesis API)
    // ==========================================================================
    const btnLer = document.getElementById("btn-ler");
    const btnParar = document.getElementById("btn-parar");
    let uttrance = null;

    btnLer.addEventListener("click", () => {
        // Cancela qualquer leitura em andamento para não encavalar as vozes
        window.speechSynthesis.cancel();

        // Captura apenas o texto contido no container principal de conteúdo
        const conteudoParaLer = document.getElementById("conteudo-principal").innerText;
        
        uttrance = new SpeechSynthesisUtterance(conteudoParaLer);
        uttrance.lang = "pt-BR";
        uttrance.rate = 1.1; // Velocidade levemente ajustada

        window.speechSynthesis.speak(uttrance);
    });

    btnParar.addEventListener("click", () => {
        window.speechSynthesis.cancel();
    });

    // ==========================================================================
    // 5. INTERAÇÃO: SISTEMA DE COMENTÁRIOS DO LEITOR
    // ==========================================================================
    const formComentario = document.getElementById("form-comentario");
    const textoComentario = document.getElementById("texto-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");

    formComentario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita o reload padrão da página

        const mensagem = textoComentario.value.trim();
        if (mensagem) {
            // Cria dinamicamente a estrutura de visualização do comentário
            const novoComentario = document.createElement("div");
            novoComentario.classList.add("comentario-item");
            novoComentario.textContent = mensagem;

            listaComentarios.prepend(novoComentario); // Insere no topo da lista
            textoComentario.value = ""; // Limpa a caixa de texto
        }
    });

    // ==========================================================================
    // 6. FORMULÁRIO DE INSCRIÇÃO DO SEMINÁRIO
    // ==========================================================================
    const formSeminario = document.getElementById("form-seminario");
    formSeminario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Simulação de captação e validação de sucesso
        const nomeUsuario = document.getElementById("nome").value;
        alert(`Parabéns, ${nomeUsuario}! Sua inscrição para o Seminário Online AgroFuturo 2026 foi realizada com sucesso.`);
        formSeminario.reset();
    });
});







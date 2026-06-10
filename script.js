// Aguarda o carregamento total do DOM para garantir estabilidade e performance
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. SISTEMA INTERATIVO DE ACORDEONS (SEÇÕES EXPANSÍVEIS)
       ========================================================================== */
    const headersAcordeon = document.querySelectorAll(".accordion-header");

    headersAcordeon.forEach(header => {
        header.addEventListener("click", () => {
            const itemAtual = header.parentElement;
            const estaAtivo = itemAtual.classList.contains("ativo");

            // Fecha todos os acordeons antes de abrir o selecionado (Efeito sanfona fluido)
            document.querySelectorAll(".accordion-item").forEach(item => {
                item.classList.remove("ativo");
                item.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
            });

            // Se não estava ativo, abre o atual
            if (!estaAtivo) {
                itemAtual.classList.add("ativo");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });

    /* ==========================================================================
       2. REQUISITOS DE ACESSIBILIDADE - CONTROLE DE FONTE
       ========================================================================== */
    let tamanhoFonteAtual = 100; // Representa 100% (Base do navegador)
    const btnAumentar = document.getElementById("btn-aumentar");
    const btnDiminuir = document.getElementById("btn-diminuir");

    btnAumentar.addEventListener("click", () => {
        if (tamanhoFonteAtual < 130) { // Limite prudente para evitar quebras visuais
            tamanhoFonteAtual += 5;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if (tamanhoFonteAtual > 85) {
            tamanhoFonteAtual -= 5;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    /* ==========================================================================
       3. ALTERNADOR DE MODO ESCURO / CLARO
       ========================================================================== */
    const btnTema = document.getElementById("btn-tema");
    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("tema-claro");
    });

    /* ==========================================================================
       4. ACESSIBILIDADE - LEITURA POR VOZ (SPEECH SYNTHESIS API)
       ========================================================================== */
    const btnFalar = document.getElementById("btn-falar");
    const btnParar = document.getElementById("btn-parar");
    let synth = window.speechSynthesis;
    let utterance = null;

    btnFalar.addEventListener("click", () => {
        // Interrompe qualquer leitura anterior ativa para evitar sobreposição de áudio
        if (synth.speaking) {
            synth.cancel();
        }

        // Seleciona cirurgicamente o conteúdo principal excluindo botões, formulários e cabeçalhos
        const artigoConteudo = document.getElementById("artigo");
        if (!artigoConteudo) return;

        // Extrai o texto limpo
        let textoParaLer = artigoConteudo.innerText;

        utterance = new SpeechSynthesisUtterance(textoParaLer);
        utterance.lang = "pt-BR";
        utterance.rate = 1.0; // Velocidade ideal padrão

        // Feedback visual ou de estado pode ser inserido aqui
        synth.speak(utterance);
    });

    btnParar.addEventListener("click", () => {
        if (synth.speaking) {
            synth.cancel();
        }
    });

    /* ==========================================================================
       5. FORMULÁRIO DE INSCRIÇÃO COM VALIDAÇÃO E SUBCONTEXTO
       ========================================================================== */
    const formCadastro = document.getElementById("form-cadastro");
    const msgSucesso = document.getElementById("mensagem-sucesso");

    formCadastro.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o recarregamento assíncrono

        // Captura e sanitiza dados básicos
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();

        if (nome && email) {
            // Renderiza mensagem moderna de confirmação de vaga
            msgSucesso.textContent = `Obrigado, ${nome}! Sua inscrição para o seminário foi confirmada. Detalhes enviados para o e-mail: ${email}.`;
            msgSucesso.style.display = "block";

            // Limpa o formulário de maneira limpa
            formCadastro.reset();

            // Desaparece com a mensagem de forma suave após 6 segundos
            setTimeout(() => {
                msgSucesso.style.display = "none";
            }, 6000);
        }
    });

    /* ==========================================================================
       6. INTERAÇÃO E COMENTÁRIOS DO LEITOR
       ========================================================================== */
    const formComentario = document.getElementById("form-comentario");
    const txtComentario = document.getElementById("txt-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");

    formComentario.addEventListener("submit", (e) => {
        e.preventDefault();

        const texto = txtComentario.value.trim();
        if (texto === "") return;

        // Cria o elemento estrutural do comentário dinamicamente
        const card = document.createElement("div");
        card.classList.add("comentario-card");

        // Cria estrutura semântica interna
        const meta = document.createElement("p");
        meta.style.fontSize = "0.85rem";
        meta.style.color = "var(--cor-verde)";
        meta.style.fontWeight = "700";
        meta.style.marginBottom = "0.4rem";
        meta.textContent = "Leitor AgroFuturo • Agora mesmo";

        const pTexto = document.createElement("p");
        pTexto.style.fontSize = "0.95rem";
        pTexto.style.color = "var(--texto-principal)";
        pTexto.textContent = texto;

        card.appendChild(meta);
        card.appendChild(pTexto);

        // Insere no topo da lista de debates
        listaComentarios.insertBefore(card, listaComentarios.firstChild);

        // Limpa o campo de entrada do usuário
        txtComentario.value = "";
    });
});









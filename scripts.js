// Referências globais dos elementos do DOM;
const selectFaixaAlunos = document.getElementById("faixa-alunos");
const elementoTitulo = document.getElementById("beneficio-titulo");
const elementoTexto = document.getElementById("beneficio-texto");
const inputNomeCreche = document.getElementById("nome-creche");
const inputNomeResponsavel = document.getElementById("nome-responsavel");
const inputContactoWhatsapp = document.getElementById("contacto-whatsapp");
const formSimulador = document.getElementById("form-parceria"); 

const PLANOS_PARCERIA = {
    ate20: {
        titulo: "Plano Turma Inicial (Até 20 alunos)",
        descricaoCard: "Ideal para creches que estão a iniciar o programa de natação. Aulas com grupos reduzidos e acompanhamento focado na adaptação aquática.",
        mensagemWhatsapp: "Tenho interesse no *Plano Turma Inicial (Até 20 alunos)* para uma turma reduzida e acompanhamento focado."
    },

    de20a50: {
        titulo: "Plano Crescimento (20 a 50 alunos)",
        descricaoCard: "Pacote intermédio com condições comerciais exclusivas. Metodologia adaptada por faixas etárias para atender múltiplas turmas da creche.",
        mensagemWhatsapp: "Gostaria de simular o *Plano Crescimento (20 a 50 alunos)* com condições especiais para turmas intermédias."

    },

    mais50: {
        titulo: "Plano Escala VIP (Mais de 50 alunos)",
        descricaoCard: "A melhor relação custo-benefício para instituições de grande porte. Aulas estruturadas, suporte operacional prioritário e horários flexíveis.",
        mensagemWhatsapp: "Quero negociar o *Plano Escala VIP (Mais de 50 alunos)* com proposta personalizada e suporte prioritário."
    }
}

// Função de callback acionada na mudança do select;

function actualizarSimulador(evento) {
    const faixaSelecionada = evento.target.value;

    if (!faixaSelecionada || !PLANOS_PARCERIA[faixaSelecionada]) {
        elementoTitulo.textContent = "";
        elementoTexto.textContent = "";

        return;
    }

    const plano = PLANOS_PARCERIA[faixaSelecionada];

    elementoTitulo.textContent = plano.titulo;
    elementoTexto.textContent = plano.descricaoCard ;
}

selectFaixaAlunos.addEventListener("change", actualizarSimulador);

function lidarComSubmit(evento) {
    evento.preventDefault();

    //Capturar os valores atuais dos campos;

    const faixa = selectFaixaAlunos.value;
    const nomeCreche = inputNomeCreche.value.trim();
    const nomeResponsavel = inputNomeResponsavel.value.trim();
    const contactoWhatsapp = inputContactoWhatsapp.value.trim();

    //Validação extra de segurança;

    if (!faixa || !PLANOS_PARCERIA[faixa]) {
        alert("Por favor, selecione uma faixa de alunos válida.");

        return;
    }

    //Montagem da mensagem final;

    const plano = PLANOS_PARCERIA[faixa];
    const mensagemTexto = `Olá! Sou *${nomeResponsavel}*, representante da creche *${nomeCreche}*, (Contacto: ${contactoWhatsapp}).\n\n${plano.mensagemWhatsapp}`

    //Codificar a mensagem pra URL;

    const mensagemCodificada = encodeURIComponent(mensagemTexto);

    //Redirecionar para a API do WhatsApp;

    const numeroWhatsApp = "244925220846";
    window.location.href = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
}

//Conectar o evento de submit do formulário à função de callback;

formSimulador.addEventListener("submit", lidarComSubmit);


import type { ChatCopy } from './script.ts';

const hiring = 'Estou contratando';
const project = 'Tenho um projeto';
const hello = 'Só vim dizer oi';
const composerPlaceholder = 'O que você está criando e como posso ajudar?';
const greeting = 'Oi, sou Jahat. O que traz você por aqui?';
const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;
const sentTail = (email: string) => `Enviado. Responderei em breve para ${email}. Enquanto isso:`;

export const chatPt: ChatCopy = {
  greeting, hiring, project, hello, composerPlaceholder, suggestionsLabel: 'Sugestões',
  ui: { author: 'Jahat Trinidad', status: 'DISPONÍVEL PARA ESTÁGIO', youWrote: 'VOCÊ ESCREVEU', privacy: 'Vai direto para minha caixa de entrada.', failedNote: 'Nada foi perdido.', cardLabel: 'Conversa com Jahat', logLabel: 'Mensagens', typing: 'Jahat está digitando' },
  script: {
    idle: { reply: greeting, chips: [{ value: 'hiring', label: hiring }, { value: 'project', label: project }], placeholder: composerPlaceholder },
    intent: { reply: 'Será um prazer ajudar. É sobre uma vaga, um projeto ou outra coisa?', chips: [{ value: 'hiring', label: hiring }, { value: 'project', label: project }, { value: 'other', label: hello }], placeholder: 'Conte um pouco mais' },
    branches: {
      hiring: { askName: 'Legal, estou procurando estágio agora. Com quem estou falando?', askCompany: (name) => `Obrigado, ${firstName(name)}. Qual é a empresa?`, askDetail: 'Entendi. Algo que eu deva saber antes de responder? Datas, stack, como me encontrou.', companyChips: [], detailChips: [{ value: 'Começa em janeiro', label: 'Começa em janeiro' }, { value: 'Pode ser remoto', label: 'Pode ser remoto' }, { value: 'Nada mais', label: 'Nada mais' }], placeholders: { name: 'Seu nome', company: 'Sua empresa', detail: 'Datas, stack, algo mais' } },
      project: { askName: 'Parece interessante. Com quem estou falando?', askCompany: (name) => `Obrigado, ${firstName(name)}. É para uma empresa ou para você?`, askDetail: 'O que você está criando e quando gostaria de ter pronto?', companyChips: [{ value: 'just-me', label: 'Só para mim' }], detailChips: [], placeholders: { name: 'Seu nome', company: 'Sua empresa', detail: 'O que você está criando' } },
      other: { askName: 'Oi! Com quem estou falando?', askDetail: 'O que você tem em mente?', companyChips: [], detailChips: [], placeholders: { name: 'Seu nome', company: 'Sua empresa', detail: 'Sua mensagem' } },
    },
    askEmail: { reply: 'Última pergunta: para onde devo responder?', placeholder: 'you@company.com' }, invalidEmail: { reply: 'Esse endereço não parece certo. Pode conferir?' },
    summary: { reply: 'Toque em um lápis para alterar uma resposta.', title: 'ISTO É O QUE VOU ENVIAR', labels: { name: 'Nome', company: 'Empresa', detail: 'Detalhes', email: 'Responder para' }, empty: 'Só para mim', edit: (label) => `Editar ${label}`, confirm: 'Tudo certo, enviar', sending: 'Enviando…' },
    sent: { hiring: { reply: sentTail, next: [{ id: 'garden', label: 'Ver o estudo de caso do Garden' }, { id: 'cv', label: 'Baixar meu CV' }] }, project: { reply: sentTail, next: [{ id: 'work', label: 'Ver meus projetos' }] }, other: { reply: () => 'Enviado. Obrigado por dizer oi.', next: [] }, placeholder: 'Enviar outra mensagem' },
    failed: { reply: 'Não foi possível enviar. Sua mensagem continua aqui.', retry: 'Tentar novamente', copy: 'Copiar meu e-mail' },
    email: { subjectPrefix: '[jahattrinidad.com]', branchLabel: 'Tipo', branchNames: { hiring: 'Contratação', project: 'Projeto', other: 'Outro' }, nameLabel: 'Nome', companyLabel: 'Empresa', emailLabel: 'E-mail', empty: '—', signature: '— Enviado pelo chat de contato de jahattrinidad.com' },
  },
};

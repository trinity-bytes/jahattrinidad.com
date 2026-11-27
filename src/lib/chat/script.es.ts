import type { ChatCopy } from './script.ts';

const hiring = 'Estoy contratando';
const project = 'Tengo un proyecto';
const hello = 'Solo quería saludar';
const composerPlaceholder = '¿Qué estás creando y cómo podría ayudarte?';
const greeting = 'Hola, soy Jahat. ¿Qué te trae por aquí?';
const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;
const sentTail = (email: string) => `Enviado. Te responderé pronto a ${email}. Mientras tanto:`;

export const chatEs: ChatCopy = {
  greeting, hiring, project, hello, composerPlaceholder, composerPlaceholderShort: '¿Qué estás creando?', suggestionsLabel: 'Sugerencias',
  ui: { author: 'Jahat Trinidad', status: 'Disponible para prácticas', youWrote: 'Escribiste', privacy: 'Llega directo a mi correo.', failedNote: 'No se perdió nada.', cardLabel: 'Conversación con Jahat', logLabel: 'Mensajes', typing: 'Jahat está escribiendo' },
  script: {
    idle: { reply: greeting, chips: [{ value: 'hiring', label: hiring }, { value: 'project', label: project }], placeholder: composerPlaceholder },
    intent: { reply: 'Con gusto. ¿Se trata de un puesto, un proyecto o algo más?', chips: [{ value: 'hiring', label: hiring }, { value: 'project', label: project }, { value: 'other', label: hello }], placeholder: 'Cuéntame un poco más' },
    branches: {
      hiring: { askName: 'Genial, ahora busco prácticas. ¿Con quién hablo?', askCompany: (name) => `Gracias, ${firstName(name)}. ¿De qué empresa se trata?`, askDetail: 'Entendido. ¿Algo que deba saber antes de responder? Fechas, stack, cómo me encontraste.', companyChips: [], detailChips: [{ value: 'Empieza en enero', label: 'Empieza en enero' }, { value: 'Puede ser remoto', label: 'Puede ser remoto' }, { value: 'Nada más', label: 'Nada más' }], placeholders: { name: 'Tu nombre', company: 'Tu empresa', detail: 'Fechas, stack, algo más' } },
      project: { askName: 'Suena interesante. ¿Con quién hablo?', askCompany: (name) => `Gracias, ${firstName(name)}. ¿Es para una empresa o para ti?`, askDetail: '¿Qué estás creando y cuándo te gustaría tenerlo listo?', companyChips: [{ value: 'just-me', label: 'Solo para mí' }], detailChips: [], placeholders: { name: 'Tu nombre', company: 'Tu empresa', detail: 'Lo que estás creando' } },
      other: { askName: '¡Hola! ¿Con quién hablo?', askDetail: '¿Qué tienes en mente?', companyChips: [], detailChips: [], placeholders: { name: 'Tu nombre', company: 'Tu empresa', detail: 'Tu mensaje' } },
    },
    askEmail: { reply: 'Una última pregunta: ¿a dónde te respondo?', placeholder: 'you@company.com' }, invalidEmail: { reply: 'Esa dirección no parece correcta. ¿Puedes revisarla?' },
    summary: { reply: 'Usa un lápiz para cambiar una respuesta.', title: 'Esto es lo que enviaré', labels: { name: 'Nombre', company: 'Empresa', detail: 'Detalles', email: 'Responder a' }, empty: 'Solo para mí', edit: (label) => `Editar ${label}`, confirm: 'Todo bien, enviar', sending: 'Enviando…' },
    sent: { hiring: { reply: sentTail, next: [{ id: 'garden', label: 'Ver el caso de estudio del Garden' }, { id: 'cv', label: 'Descargar mi CV' }] }, project: { reply: sentTail, next: [{ id: 'work', label: 'Ver mis proyectos' }] }, other: { reply: () => 'Enviado. Gracias por saludar.', next: [] }, placeholder: 'Enviar otro mensaje' },
    failed: { reply: 'No se pudo enviar. Tu mensaje sigue aquí.', retry: 'Intentar de nuevo', copy: 'Copiar mi correo' },
    email: { subjectPrefix: '[jahattrinidad.com]', branchLabel: 'Tipo', branchNames: { hiring: 'Contratación', project: 'Proyecto', other: 'Otro' }, nameLabel: 'Nombre', companyLabel: 'Empresa', emailLabel: 'Correo', empty: '—', signature: '— Enviado desde el chat de contacto de jahattrinidad.com' },
  },
};

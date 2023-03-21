import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  nome: string;
  profissao: string;
  likes: number;
  messages: number;
  shares: number;
  telefone: string;
  nascimento: string;
  cidade: string;
  altura: string;
  iniciais: string;
  peso: number;
  imc: string;
}

const app = express();
app.use(bodyParser.json());
const nomes = [
  "Maria",
  "João",
  "Pedro",
  "Ana",
  "José",
  "Fernanda",
  "Lucas",
  "Gabriela",
  "Paulo",
  "Camila",
  "André",
  "Juliana",
  "Rafael",
  "Mariana",
  "Thiago",
  "Natália",
  "Luciana",
  "Ricardo",
  "Carla",
  "Diego",
];

const profissoes = [
  "Desenvolvedor Front-end",
  "Desenvolvedor Back-end",
  "Engenheiro de Software",
  "Arquiteto de Software",
  "Analista de Dados",
  "Cientista de Dados",
  "Gerente de Projetos",
  "Designer UX",
  "Analista de Sistemas",
  "Especialista em Segurança da Informação",
];

const cidadesEstados = [
  'São Paulo - SP',
  'Rio de Janeiro - RJ',
  'Salvador - BA',
  'Belo Horizonte - MG',
  'Fortaleza - CE',
  'Brasília - DF',
  'Curitiba - PR',
  'Manaus - AM',
  'Recife - PE',
  'Goiânia - GO',
  'Belém - PA',
  'Porto Alegre - RS',
  'São Luís - MA',
  'Campinas - SP',
  'Guarulhos - SP',
  'São Gonçalo - RJ',
  'Nova Iguaçu - RJ',
  'Maceió - AL',
  'Duque de Caxias - RJ',
  'Natal - RN',
  'Teresina - PI',
  'São Bernardo do Campo - SP',
  'Campo Grande - MS',
  'Jaboatão dos Guararapes - PE',
  'Osasco - SP',
  'Santo André - SP',
  'João Pessoa - PB',
  'Ribeirão Preto - SP',
  'Contagem - MG',
  'Aracaju - SE',
  'Feira de Santana - BA',
  'Cuiabá - MT',
  'Joinville - SC',
  'Aparecida de Goiânia - GO',
  'Londrina - PR',
  'São João de Meriti - RJ',
  'Uberlândia - MG',
  'Ananindeua - PA',
  'Niterói - RJ',
  'Belford Roxo - RJ',
  'Serra - ES',
  'Diadema - SP',
  'Mauá - SP',
  'Caucaia - CE',
  'Itaquaquecetuba - SP',
  'Caxias do Sul - RS',
  'Embu das Artes - SP',
  'Montes Claros - MG',
  'Petrópolis - RJ',
  'Rio Branco - AC',
  'Praia Grande - SP'
];

const sobrenomes = [
  "Silva",
  "Santos",
  "Oliveira",
  "Souza",
  "Pereira",
  "Costa",
  "Ferreira",
  "Rodrigues",
  "Almeida",
  "Carvalho",
  "Gomes",
  "Martins",
  "Rocha",
  "Ribeiro",
  "Reis",
  "Sales",
  "Lima",
  "Araújo",
  "Fernandes",
  "Barbosa",
  "Cardoso",
  "Nunes",
  "Schneider",
  "Klein",
  "Garcia",
  "Ferreira",
  "Silveira",
  "Machado",
  "Moraes",
  "Campos",
  "Monteiro",
  "Nascimento",
  "Miranda",
  "Barros",
  "Mendes",
  "Fonseca",
  "Cavalcanti",
  "Pinto",
  "Azevedo",
  "Medeiros",
  "Tavares",
  "Corrêa",
  "Pinheiro",
  "Dias",
  "Gonçalves",
  "Borges",
  "Xavier",
  "Castro",
  "Vieira",
  "Nogueira",
  "Siqueira",
  "Gusmão",
];
function gerarTelefone() {
  const ddds = ["61", "62", "63", "64", "65", "66"];
  const randomDDD = ddds[Math.floor(Math.random() * ddds.length)];
  const randomNum1 = Math.floor(Math.random() * 90000) + 10000;
  const randomNum2 = Math.floor(Math.random() * 9000) + 1000;
  return `(${randomDDD}) ${randomNum1}-${randomNum2}`;
}
const gerarUsuario = (): User => {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  const profissao = profissoes[Math.floor(Math.random() * profissoes.length)];
  const dia = Math.floor(Math.random() * 28) + 1;
  const mes = Math.floor(Math.random() * 12) + 1;
  const ano = Math.floor(Math.random() * 40) + 1980;
  const nascimento = `${dia}/${mes}/${ano}`;
  const cidade = cidadesEstados[Math.floor(Math.random() * cidadesEstados.length)];
  const altura = (Math.random() * (2 - 1.5) + 1.5).toFixed(2).replace('.', ',');
  const peso = Math.floor(Math.random() * 135) + 60;
  const iniciais = nome[0] + sobrenome[0];
  const imc = (peso / (Number(altura.replace(',', '.')) ** 2)).toFixed(2);
  const likes = Math.floor(Math.random() * 10000);
  const messages = Math.floor(Math.random() * 500);
  const shares = Math.floor(Math.random() * 500);

  return {
    id: uuidv4(),
    nome: nome + ' ' + sobrenome,
    profissao,
    likes,
    messages,
    shares,
    telefone: gerarTelefone(),
    nascimento,
    cidade,
    altura,
    imc,
    iniciais,
    peso,
  }
}
const users: User[] = Object.keys(Array.from({ length: 50 })).map(() => gerarUsuario());


// endpoint para listar todos os usuários
app.get('/users', (req, res) => {
  const sortedUsers = users.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena a lista de usuários por nome
  res.json(sortedUsers);

});

// endpoint para listar usuário por ID
app.get('/users/id/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado por id.' });
  }
});

// endpoint para listar usuário por nome
app.get('/users/nome', (req, res) => {
  const { nome } = req.body;
  const filteredUsers = users.filter(user => user.nome.toLowerCase().includes(nome.toLowerCase()));
  console.log(filteredUsers)
  if (filteredUsers.length > 0) {
    const sortedUsers = filteredUsers.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena a lista de usuários por nome
    res.json(sortedUsers);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado por nome.' });
  }
});

// endpoint para listar usuários com IMC acima de um valor específico
app.get('/users/imc', (req, res) => {
  const { imc } = req.body;

  const filteredUsers = users.filter(user => {
    const alturaMetros = Number(user.altura.replace(',', '.').replace('m', '')) // converter altura para metros
    const imcUser = user.peso / (alturaMetros * alturaMetros);
    return imcUser > imc;
  });
  if (filteredUsers.length > 0) {
    const sortedUsers = filteredUsers.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena a lista de usuários por nome
    res.json(sortedUsers);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado por imc.' });
  }
});

app.listen(3333);
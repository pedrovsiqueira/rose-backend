import db from '../database/connection';
import Psychologist from '../models/Psychologist';
require('dotenv').config();

db();

const data = [
  {
    name: 'Jose Jorge',
    email: 'jose@jorge.com',
    password: '1234345',
    avatar:
      'https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg',
    whatsapp: '11980764523',
    crp: '06/88022',
    workingHours: {
      startTime: '08:30',
      endTime: '18:00',
    },
    education: [
      '- Graduação em Naturologia Aplicada - Universidade do Sul de Santa Catarina (UNISUL) - 2005',
      '- Pós-graduada em Neurociência e Futuro Sustentado de Pessoas e Organizações - aculdade de Ciências Médicas da Santa Casa de São Paulo - 2018',
      '- Curso de Atualização em Transtorno Ansioso e Depressivo - Hospital Israelita Albert Einstein - 2019',
    ],
    specialties: ['Ansiedade', 'Baixa auto-estima', 'Relacionamentos ruins'],
    experience: [
      'Ansiedade',
      'Autoconhecimento',
      'Doenças',
      'Psicossomáticas',
      'Equilibrio',
      'Emocional',
      'Estresse',
      'Meditação',
      'Mindfulness',
      'Sono',
    ],
    price: 100,
    virtualRoom: 'https://us02web.zoom.us/j/2100894472',
    longDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat!',
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat!',
  },
  {
    name: 'Fernanda Rabino',
    email: 'fernanda@rabino.com',
    password: '1234345',
    avatar:
      'https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg',
    whatsapp: '11980793651',
    crp: '01/87390',
    workingHours: {
      startTime: '08:30',
      endTime: '18:00',
    },
    education: [
      '- Graduação em Naturologia Aplicada - Universidade do Sul de Santa Catarina (UNISUL) - 2005',
      '- Pós-graduada em Neurociência e Futuro Sustentado de Pessoas e Organizações - aculdade de Ciências Médicas da Santa Casa de São Paulo - 2018',
      '- Curso de Atualização em Transtorno Ansioso e Depressivo - Hospital Israelita Albert Einstein - 2019',
    ],
    specialties: ['Ansiedade', 'Depressão', 'Orientação'],
    experience: [
      'Ansiedade',
      'Autoconhecimento',
      'Doenças',
      'Psicossomáticas',
      'Equilibrio',
      'Emocional',
      'Estresse',
      'Meditação',
      'Mindfulness',
      'Sono',
    ],
    price: 150,
    virtualRoom: 'https://us02web.zoom.us/j/2100894472',
    longDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat!',
    shortDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magni dolores sequi repellendus ab fugiat! Dolore nemo suscipit corporis provident asperiores commodi, officia molestias enim aut eligendi recusandae aliquam quaerat!',
    healthInsurance: ['Amil, Unimed'],
  },
];
(async () => {
  const createdUsers = await Psychologist.create(data);
  console.log(createdUsers);
})();

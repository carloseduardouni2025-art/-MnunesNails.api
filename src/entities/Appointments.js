const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Appointments',
  tableName: 'appointments',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    nome: {
      type: String,
      length: 250,
      nullable: true,
    },
    servico: {
      type: String,
      length: 250,
      nullable: true,
    },
    dia: {
      type: String,
      length: 250,
      nullable: true,
    },
    hora: {
      type: String,
      length: 250,
      nullable: true,
    },
    observacao: {
      type: String,
      length: 250,
      nullable: true,
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    },
  },
});

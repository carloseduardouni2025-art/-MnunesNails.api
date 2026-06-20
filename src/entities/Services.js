const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Services',
  tableName: 'services',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    nome: {
      type: String,
      length: 250,
      nullable: false,
    },
    price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    },
    description: {
      type: String,
      length: 500,
      nullable: false,
    },
    time: {
      type: Number,
      nullable: false,
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

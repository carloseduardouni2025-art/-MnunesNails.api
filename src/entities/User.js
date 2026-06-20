const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      length: 150,
      nullable: true,
    },
    phone: {
      type: String,
      length: 30,
      nullable: true,
    },
    whatsapp: {
      type: String,
      length: 30,
      nullable: true,
    },
    password: {
      type: String,
      length: 150,
      nullable: true,
    },
    role: {
      type: String,
      length: 10,
      default: 'client',
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

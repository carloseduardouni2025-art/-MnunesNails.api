const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Availability',
  tableName: 'availability',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    date: {
      type: 'date',
      nullable: false,
    },
    time: {
      type: String,
      length: 10,
      nullable: false,
    },
    available: {
      type: Boolean,
      default: true,
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

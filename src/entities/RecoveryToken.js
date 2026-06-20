const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'RecoveryToken',
  tableName: 'recovery_tokens',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    user_id: {
      type: Number,
      nullable: false,
    },
    token: {
      type: String,
      length: 6,
      nullable: false,
    },
    expires_at: {
      type: Date,
      nullable: false,
    },
    used: {
      type: Boolean,
      default: false,
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
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
      onDelete: 'CASCADE',
    },
  },
});

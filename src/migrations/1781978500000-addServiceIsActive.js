module.exports = class AddServiceIsActive1781978500000 {
  name = 'AddServiceIsActive1781978500000'

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "isActive" boolean NOT NULL DEFAULT true`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN IF EXISTS "isActive"`);
  }
}

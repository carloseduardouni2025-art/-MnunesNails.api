module.exports = class AddAppointmentFields1781978200000 {
  name = 'AddAppointmentFields1781978200000'

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "appointments" ADD COLUMN IF NOT EXISTS "service_id" integer REFERENCES "services"("id") ON DELETE SET NULL`);
    await queryRunner.query(`ALTER TABLE "appointments" ADD COLUMN IF NOT EXISTS "status" character varying(20) NOT NULL DEFAULT 'pendente'`);
    await queryRunner.query(`ALTER TABLE "appointments" ADD COLUMN IF NOT EXISTS "notas" text`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN IF EXISTS "notas"`);
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN IF EXISTS "status"`);
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN IF EXISTS "service_id"`);
  }
}

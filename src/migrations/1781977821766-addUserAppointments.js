/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddUserAppointments1781977821766 {
    name = 'AddUserAppointments1781977821766'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "servico"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "observacao"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_66dee3bea82328659a4db8e54b7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_66dee3bea82328659a4db8e54b7"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "observacao" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "servico" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "nome" character varying(250)`);
    }
}

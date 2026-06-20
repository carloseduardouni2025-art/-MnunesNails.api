module.exports = class CreateAvailability1781978300000 {
  name = 'CreateAvailability1781978300000'

  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "availability" (
        "id" SERIAL NOT NULL,
        "date" DATE NOT NULL,
        "time" character varying(10) NOT NULL,
        "available" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_availability" PRIMARY KEY ("id")
      )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS "availability"`);
  }
}

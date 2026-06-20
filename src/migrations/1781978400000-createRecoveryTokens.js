module.exports = class CreateRecoveryTokens1781978400000 {
  name = 'CreateRecoveryTokens1781978400000'

  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "recovery_tokens" (
        "id" SERIAL NOT NULL,
        "user_id" integer NOT NULL,
        "token" character varying(6) NOT NULL,
        "expires_at" TIMESTAMP NOT NULL,
        "used" boolean NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_recovery_tokens" PRIMARY KEY ("id"),
        CONSTRAINT "FK_recovery_tokens_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS "recovery_tokens"`);
  }
}

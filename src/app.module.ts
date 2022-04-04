import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { UserModule } from './user/user.module';
import config from './config';
import { Knex } from 'knex';

@Module({
  imports: [
    KnexModule.forRoot({
      config: config.database as Knex.Config,
    }),
    UserModule,
  ],
})
export class AppModule {}

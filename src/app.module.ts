import { Module } from '@nestjs/common';
import { AuthModule } from './resolvers/auth/auth.module';
import { UserModule } from './resolvers/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-auth',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),

    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

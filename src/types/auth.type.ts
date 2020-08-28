import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/entities/user.entity";

@ObjectType()
export class Token {

  @Field()
  access_token: string;
}

@ObjectType()
export class AuthType extends Token{
  user: User
 }
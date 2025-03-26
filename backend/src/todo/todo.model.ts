import { Field, ID, ObjectType, InputType } from "@nestjs/graphql";

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  completed: boolean;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;
}

@InputType()
export class UpdateTodoInput {
  @Field(() => ID)
  id: string;

  @Field()
  completed: boolean;
}

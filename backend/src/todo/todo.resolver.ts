import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { Todo, CreateTodoInput, UpdateTodoInput } from "./todo.model";
import { TodoService } from "./todo.service";

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  todos(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { nullable: true })
  todo(@Args("id", { type: () => ID }) id: string): Todo | undefined {
    return this.todoService.findById(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args("input") input: CreateTodoInput): Todo {
    return this.todoService.create(input.title);
  }

  @Mutation(() => Boolean)
  deleteTodo(@Args("id", { type: () => ID }) id: string): boolean {
    return this.todoService.delete(id);
  }

  @Mutation(() => Todo, { nullable: true })
  updateTodo(@Args("input") input: UpdateTodoInput): Todo | undefined {
    return this.todoService.update(input.id, input.completed);
  }
}

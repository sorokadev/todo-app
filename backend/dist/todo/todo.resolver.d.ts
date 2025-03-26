import { Todo, CreateTodoInput, UpdateTodoInput } from "./todo.model";
import { TodoService } from "./todo.service";
export declare class TodoResolver {
    private readonly todoService;
    constructor(todoService: TodoService);
    todos(): Todo[];
    todo(id: string): Todo | undefined;
    createTodo(input: CreateTodoInput): Todo;
    deleteTodo(id: string): boolean;
    updateTodo(input: UpdateTodoInput): Todo | undefined;
}

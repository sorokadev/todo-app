import type { Todo } from "./todo.model";
export declare class TodoService {
    private todos;
    findAll(): Todo[];
    findById(id: string): Todo | undefined;
    create(title: string): Todo;
    delete(id: string): boolean;
    update(id: string, completed: boolean): Todo | undefined;
}

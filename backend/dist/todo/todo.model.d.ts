export declare class Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}
export declare class CreateTodoInput {
    title: string;
}
export declare class UpdateTodoInput {
    id: string;
    completed: boolean;
}

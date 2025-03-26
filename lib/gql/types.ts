// TypeScript types for GraphQL responses

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface TodosData {
  todos: Todo[];
}

export interface TodoData {
  todo: Todo;
}

export interface CreateTodoInput {
  title: string;
}

export interface CreateTodoData {
  createTodo: Todo;
}

export interface CreateTodoVariables {
  input: CreateTodoInput;
}

export interface UpdateTodoInput {
  id: string;
  completed: boolean;
}

export interface UpdateTodoData {
  updateTodo: Todo;
}

export interface UpdateTodoVariables {
  input: UpdateTodoInput;
}

export interface DeleteTodoData {
  deleteTodo: boolean;
}

export interface DeleteTodoVariables {
  id: string;
}

export interface GetTodoByIdVariables {
  id: string;
}

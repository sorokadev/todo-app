import { Injectable } from "@nestjs/common";
import type { Todo } from "./todo.model";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findById(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  create(title: string): Todo {
    const todo = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    this.todos.push(todo);
    return todo;
  }

  delete(id: string): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return initialLength > this.todos.length;
  }

  update(id: string, completed: boolean): Todo | undefined {
    const todo = this.findById(id);
    if (todo) {
      todo.completed = completed;
    }
    return todo;
  }
}

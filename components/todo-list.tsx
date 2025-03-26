"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TODOS } from "@/lib/gql/queries";
import { DELETE_TODO, UPDATE_TODO } from "@/lib/gql/mutations";
import type {
  TodosData,
  DeleteTodoVariables,
  UpdateTodoVariables,
} from "@/lib/gql/types";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function TodoList() {
  const { loading, error, data } = useQuery<TodosData>(GET_ALL_TODOS);

  const [deleteTodo] = useMutation<{}, DeleteTodoVariables>(DELETE_TODO, {
    update(cache, { data }, { variables }) {
      const existingTodos = cache.readQuery<TodosData>({
        query: GET_ALL_TODOS,
      });
      if (existingTodos) {
        cache.writeQuery({
          query: GET_ALL_TODOS,
          data: {
            todos: existingTodos.todos.filter(
              (todo) => todo.id !== variables?.id
            ),
          },
        });
      }
    },
    onError(error) {
      console.error("Error deleting todo:", error);
    },
  });

  const [updateTodo] = useMutation<{}, UpdateTodoVariables>(UPDATE_TODO, {
    onError(error) {
      console.error("Error updating todo:", error);
    },
  });

  const handleDelete = (id: string) => {
    deleteTodo({ variables: { id } });
  };

  const handleToggleComplete = (id: string, currentStatus: boolean) => {
    updateTodo({
      variables: {
        input: {
          id,
          completed: !currentStatus,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        Error loading todos: {error.message}
      </div>
    );
  }

  if (!data?.todos || data.todos.length === 0) {
    return <p className="text-muted-foreground">No todos yet. Create one!</p>;
  }

  return (
    <div className="space-y-3">
      {data.todos.map((todo) => (
        <Card key={todo.id}>
          <CardContent className="p-4 flex items-center gap-3">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() =>
                handleToggleComplete(todo.id, todo.completed)
              }
            />
            <div className="flex-1">
              <p
                className={
                  todo.completed ? "line-through text-muted-foreground" : ""
                }
              >
                {todo.title}
              </p>
              <p className="text-xs text-muted-foreground">
                Created: {new Date(todo.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href={`/todo/${todo.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

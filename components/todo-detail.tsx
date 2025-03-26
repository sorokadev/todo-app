"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TODOS, GET_TODO_BY_ID } from "@/lib/gql/queries";
import { UPDATE_TODO, DELETE_TODO } from "@/lib/gql/mutations";
import type {
  TodoData,
  GetTodoByIdVariables,
  UpdateTodoVariables,
  DeleteTodoVariables,
  TodosData,
} from "@/lib/gql/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface TodoDetailProps {
  id: string;
}

export default function TodoDetail({ id }: TodoDetailProps) {
  const router = useRouter();
  const { loading, error, data } = useQuery<TodoData, GetTodoByIdVariables>(
    GET_TODO_BY_ID,
    {
      variables: { id },
    }
  );

  const [updateTodo] = useMutation<{}, UpdateTodoVariables>(UPDATE_TODO, {
    onError(error) {
      console.error("Error updating todo:", error);
    },
  });

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
    onCompleted() {
      // Navigate back to the home page after deletion
      router.push("/");
    },
    onError(error) {
      console.error("Error deleting todo:", error);
    },
  });

  const handleToggleComplete = (currentStatus: boolean) => {
    updateTodo({
      variables: {
        input: {
          id,
          completed: !currentStatus,
        },
      },
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo({ variables: { id } });
    }
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
        Error loading todo: {error.message}
      </div>
    );
  }

  if (!data?.todo) {
    return <p className="text-muted-foreground">Todo not found</p>;
  }

  const { todo } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo Details</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Checkbox
            id={`todo-detail-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={() => handleToggleComplete(todo.completed)}
          />
          <div className="flex-1">
            <p
              className={
                todo.completed
                  ? "line-through text-muted-foreground font-medium text-lg"
                  : "font-medium text-lg"
              }
            >
              {todo.title}
            </p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>ID: {todo.id}</p>
          <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
          <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Todo
        </Button>
      </CardFooter>
    </Card>
  );
}

import { ApolloProvider } from "@apollo/client";
import TodoList from "@/components/todo-list";
import CreateTodoForm from "@/components/create-todo-form";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Todo List App</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create New Todo</h2>
          <CreateTodoForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
          <TodoList />
        </div>
      </div>
    </main>
  );
}

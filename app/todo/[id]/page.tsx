import TodoDetail from "@/components/todo-detail";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

interface TodoPageProps {
  params: {
    id: string;
  };
}

export default async function TodoPage({ params: { id } }: TodoPageProps) {
  if (!id) {
    redirect("/");
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Link>
      </Button>
      <TodoDetail id={id} />
    </main>
  );
}

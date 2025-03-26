"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_TODO } from "@/lib/gql/mutations"
import { GET_ALL_TODOS } from "@/lib/gql/queries"
import type { CreateTodoData, CreateTodoVariables } from "@/lib/gql/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function CreateTodoForm() {
  const [title, setTitle] = useState("")

  const [createTodo, { loading }] = useMutation<CreateTodoData, CreateTodoVariables>(CREATE_TODO, {
    onCompleted: () => {
      setTitle("")
    },
    update: (cache, { data }) => {
      if (!data) return

      // Update the cache with the new todo
      const existingTodos = cache.readQuery({ query: GET_ALL_TODOS })
      if (existingTodos && "todos" in existingTodos) {
        cache.writeQuery({
          query: GET_ALL_TODOS,
          data: {
            todos: [...existingTodos.todos, data.createTodo],
          },
        })
      }
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    createTodo({
      variables: {
        input: { title: title.trim() },
      },
    })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading || !title.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Add Todo"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


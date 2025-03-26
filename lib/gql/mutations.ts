import { gql } from "@apollo/client";
import { TODO_ITEM_FRAGMENT } from "./fragments";

// Mutation to create a new todo
export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      ...TodoItemFields
    }
  }
  ${TODO_ITEM_FRAGMENT}
`;

// Mutation to delete a todo
export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

// Mutation to update a todo (toggle completion)
export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      ...TodoItemFields
    }
  }
  ${TODO_ITEM_FRAGMENT}
`;

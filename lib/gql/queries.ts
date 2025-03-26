import { gql } from "@apollo/client";
import { TODO_ITEM_FRAGMENT } from "./fragments";

// Query to get all todos
export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    todos {
      ...TodoItemFields
    }
  }
  ${TODO_ITEM_FRAGMENT}
`;

// Query to get a single todo by ID
export const GET_TODO_BY_ID = gql`
  query GetTodoById($id: ID!) {
    todo(id: $id) {
      ...TodoItemFields
    }
  }
  ${TODO_ITEM_FRAGMENT}
`;

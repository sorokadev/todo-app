import { gql } from "@apollo/client"

// Fragment for todo item fields to reuse across queries
export const TODO_ITEM_FRAGMENT = gql`
  fragment TodoItemFields on Todo {
    id
    title
    completed
    createdAt
  }
`


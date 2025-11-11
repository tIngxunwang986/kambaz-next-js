import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: any}) {
    const dispatch = useDispatch();

    return (
        <ListGroupItem key={todo.id}>
            <Button
                onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
                className="btn btn-danger me-2"
            >
                Delete
            </Button>

            <Button
                onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"
                className="btn btn-primary me-2"
            >
                Edit
            </Button>

            {todo.title}
        </ListGroupItem>
    );
}
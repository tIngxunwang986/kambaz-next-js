import { Button, ListGroupItem } from "react-bootstrap";

export default function TodoItem({ todo, deleteTodo, setTodo }: {
    todo: { id: string; title: string };
    deleteTodo: (id: string) => void;
    setTodo: (todo: { id: string; title: string }) => void;
}) {
    return (
        <ListGroupItem key={todo.id}>
            <Button
                onClick={() => deleteTodo(todo.id)}
                id="wd-delete-todo-click"
                className="btn btn-danger me-2"
            >
                Delete
            </Button>

            <Button
                onClick={() => setTodo(todo)}
                id="wd-set-todo-click"
                className="btn btn-primary me-2"
            >
                Edit
            </Button>

            {todo.title}
        </ListGroupItem>
    );
}
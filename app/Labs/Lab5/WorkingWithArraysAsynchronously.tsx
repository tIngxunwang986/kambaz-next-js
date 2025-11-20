"use client";

import React, { useEffect, useState } from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";
import type { AxiosError } from "axios";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean;
}

type ServerError = {
    message?: string;
};

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos);
        setErrorMessage(null);
    };

    const removeTodo = async (todo: Todo) => {
        const updatedTodos = await client.removeTodo(todo);
        setTodos(updatedTodos);
        setErrorMessage(null);
    };

    const deleteTodo = async (todo: Todo) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
            setErrorMessage(null);
        } catch (error: unknown) {
            const err = error as AxiosError<ServerError>;
            console.log(err);
            setErrorMessage(err.response?.data?.message ?? "Unable to delete todo.");
        }
    };

    const createNewTodo = async () => {
        const todos = await client.createNewTodo();
        setTodos(todos);
        setErrorMessage(null);
    };

    const postNewTodo = async () => {
        const newTodo = await client.postNewTodo({
            title: "New Posted Todo",
            completed: false,
        });
        setTodos([...todos, newTodo]);
        setErrorMessage(null);
    };

    const editTodo = (todo: Todo) => {
        const updated = todos.map((t) =>
            t.id === todo.id ? { ...todo, editing: true } : t
        );
        setTodos(updated);
    };

    const updateTodo = async (todo: Todo) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
            setErrorMessage(null);
        } catch (error: unknown) {
            const err = error as AxiosError<ServerError>;
            console.log(err);
            setErrorMessage(err.response?.data?.message ?? "Unable to update todo.");
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>

            {errorMessage && (
                <div
                    id="wd-todo-error-message"
                    className="alert alert-danger mb-2 mt-2"
                >
                    {errorMessage}
                </div>
            )}

            <h4>
                Todos
                <FaPlusCircle
                    onClick={createNewTodo}
                    className="text-success float-end fs-3"
                    id="wd-create-todo"
                />
                <FaPlusCircle
                    onClick={postNewTodo}
                    className="text-primary float-end fs-3 me-3"
                    id="wd-post-todo"
                />
            </h4>

            <ListGroup>
                {todos.map((todo) => (
                    <ListGroup.Item key={todo.id}>
                        <input
                            type="checkbox"
                            className="form-check-input me-2 float-start"
                            checked={todo.completed}
                            onChange={(e) =>
                                updateTodo({ ...todo, completed: e.target.checked })
                            }
                        />

                        {!todo.editing ? (
                            <span
                                style={{
                                    textDecoration: todo.completed ? "line-through" : "none",
                                }}
                            >
                {todo.title}
              </span>
                        ) : (
                            <FormControl
                                className="w-50 float-start"
                                value={todo.title ?? ""}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, editing: false });
                                    }
                                }}
                                onChange={(e) =>
                                    updateTodo({ ...todo, title: e.target.value })
                                }
                            />
                        )}

                        <span className="float-end">
              <FaPencil
                  onClick={() => editTodo(todo)}
                  className="text-primary me-2 mt-1"
                  id="wd-edit-todo"
              />
              <TiDelete
                  onClick={() => deleteTodo(todo)}
                  className="text-danger me-2 fs-3"
                  id="wd-delete-todo"
              />
              <FaTrash
                  onClick={() => removeTodo(todo)}
                  className="text-danger mt-1"
                  id="wd-remove-todo"
              />
            </span>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <hr />
        </div>
    );
}
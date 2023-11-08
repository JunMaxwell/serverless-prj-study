import { TodosAccess } from './todosAcess';
import { FileStorage } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
// import { createLogger } from '../utils/logger';
import { nanoid } from 'nanoid';
// import * as createError from 'http-errors';

let todoAccess = new TodosAccess();
let fileStorage = new FileStorage();

// TODO: Implement businessLogic
export function createTodo(toDo: CreateTodoRequest, userId: string) {
    let newTodoId = nanoid();
    let requestedTodo: TodoItem = {
        userId: userId,
        todoId: newTodoId,
        createdAt: new Date().toISOString(),
        done: false,
        attachmentUrl: fileStorage.getLinkById(newTodoId),
        ...toDo
    };
    return todoAccess.createItem(requestedTodo);
}

export function updateTodo(toDo: UpdateTodoRequest, userId: string, todoId: string) {
    const requestedTodo = {
        userId: userId,
        todoId: todoId,
        ...toDo
    }
    return todoAccess.updateItem(requestedTodo, userId, todoId);
}

export function deleteTodo(userId: string, todoId: string) {
    return todoAccess.deleteItem(userId, todoId);
}

export function getTodos(userId: string) {
    return todoAccess.getAllTodoItems(userId);
}
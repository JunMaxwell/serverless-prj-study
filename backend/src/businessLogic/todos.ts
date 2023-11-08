import {
  TodosAccess
} from "../dataLayer/todosAccess";
import {
  TodoItem
} from "../models/TodoItem";
import {
  CreateTodoRequest
} from "../requests/CreateTodoRequest";
import {
  UpdateTodoRequest
} from "../requests/UpdateTodoRequest";
import {
  createLogger
} from "../utils/logger";
import * as uuid from "uuid";

const logger = createLogger("TodosAccess");
const todosAccess = new TodosAccess();

export async function createTodo(
  newItem: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  logger.info("Call function create todos");
  const todoId = uuid.v4();
  const createdAt = new Date().toISOString();
  const newTodo = {
    userId,
    todoId,
    createdAt,
    done: false,
    attachmentUrl: null,
    ...newItem,
  };
  return await todosAccess.createClient(newTodo);
}

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  logger.info("getall");
  return await todosAccess.getAllClient(userId);
}

export async function updateTodo(
  userId: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
): Promise<TodoItem> {
  logger.info("updateTodo");
  return await todosAccess.updateClient(userId, todoId, updatedTodo);
}

export async function deleteTodo(
  userId: string,
  todoId: string
): Promise<String> {
  logger.info("deleteTodo");
  return await todosAccess.deleteClient(userId, todoId);
}

export async function createAttachmentPresignedUrl(
  userId: string,
  todoId: string
): Promise<String> {
  logger.info("createAttachmentPresignedUrl" + userId);
  const uploadUrl = todosAccess.getUploadUrl(todoId, userId);
  return uploadUrl;
}
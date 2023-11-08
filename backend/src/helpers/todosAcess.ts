import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
// import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

// const XAWS = AWSXRay.captureAWS(AWS);
const docClient = new AWS.DynamoDB.DocumentClient();

// TODO: Implement the dataLayer logic
export class TodosAccess {
    constructor() {}

    createItem(item: TodoItem) {
        docClient.put({
            TableName: process.env.TODO_TABLE,
            Item: item
        }, (err) => {
            return err;
        });
        return "Todo item " + item.name + " is updated!";
    }

    updateItem(updatedInfo: TodoUpdate, userId: string, itemId: string) {
        docClient.update({
            TableName: process.env.TODO_TABLE,
            Key: {
                user_id: userId,
                item_id: itemId
            },
            UpdateExpression: 'set #oldInfo = :updatedInfo',
            ExpressionAttributeNames: {
                '#oldInfo': 'any' 
            },
            ExpressionAttributeValues: {
                ':updatedInfo': updatedInfo
            }
        }, (err) => {
            return err;
        });
        return "Todo item " + updatedInfo.name + " is updated!";
    }

    deleteItem(userId: string, itemId: string) {
        docClient.delete({
            TableName: process.env.TODO_TABLE,
            Key: {
                user_id: userId,
                item_id: itemId
            }
        }, (err) => {
            return err;
        });
        return "Item is deleted!";
    }

    getAllTodoItems(userId: string) {
        const result = docClient.query({
            TableName: process.env.TODO_TABLE,
            IndexName: process.env.TODO_INDEX,
            KeyConditionExpression: 'user_id = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }, (err) => {
            return err
        });

        return result as unknown as TodoItem[];
    }
}

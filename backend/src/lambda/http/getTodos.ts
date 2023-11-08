import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";
import { getTodosForUser as getTodosForUser } from "../../businessLogic/todos";
import { getUserId } from "../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const userId = getUserId(event);
      const todos = await getTodosForUser(userId);
      return {
        statusCode: 200,
        body: JSON.stringify({ items: todos }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
      };
    } catch (exception) {
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        statusCode: 500,
        body: JSON.stringify({ message: exception })
      };
    }
  }
);
handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
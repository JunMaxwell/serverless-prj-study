'use strict';

export const main = async () => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(
            {
                message: `Hello, world! Your function executed successfully!`
            },
            null,
            2
        )
    }
}

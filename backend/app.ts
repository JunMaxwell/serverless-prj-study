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
                message: 'Your functions executed successfully!'
            },
            null,
            2
        )
    }
}

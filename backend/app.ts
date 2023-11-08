'use strict';

export const main = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Your functions executed successfully!'
            },
            null,
            2
        )
    }
}

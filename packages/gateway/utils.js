const fetch = require('node-fetch');
const { ApolloServer } = require('apollo-server');
const Authentication = require('./services/authentication');

const sleep = (time) => new Promise((r) => setTimeout(r, time))

const waitForServices = async (urls) => {
    while (true) {
        const results = await Promise.all(
            urls.map((url) =>
                fetch(url)
                    .then((_) => 'ok')
                    .catch((x) => x.message)
            )
        )

        const errors = results.filter((x) => x.includes('ECONNREFUSED'))
        if (errors.length) {
            await sleep(1000)
            console.log('waiting for services avaliability')
        } else {
            return true
        }
    }
}

/**
 * This is abstracted out of the main file for the ability to injecting test schemas so potentially
 * Wouldnt have to use rely on running servers to do tests. Not finished
 * 
 * @param {Object} graphql
 * @param {Object} graphql.schema - The schema to use for graphql 
 * @param {Object} graphql.executor - The executor to use for schema
 */
const createServer = ({schema, executor}) => {
    const authentication = new Authentication();

    return new ApolloServer({
        schema,
        executor,
        cacheControl: {
            calculateHttpHeaders: true,
            defaultMaxAge: Number(process.env.CACHE_MAX_AGE) || 0,
        },
        context: ({ req, res }) => {
            authentication.validateCredentials(req?.headers?.authorization)

            return {
                req,
                res
            }
        },
    })
}

module.exports = {
    waitForServices,
    createServer
};
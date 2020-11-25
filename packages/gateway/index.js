const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { waitForServices, authentication } = require('./utils');
const { services } = require('./services.json');

const PORT = process.env.PORT || 80

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        request.http.headers.set('x-user-id', context.userId);
    }
}

const makeGateway = () => {
    return new ApolloGateway({
        serviceList: services,
        buildService({ name, url }) {
            return new AuthenticatedDataSource({url})
        }
    })
}

const main = async () => {
    try {
        const urls = services.map(({ url }) => url);

        await waitForServices(urls)
        const gateway = makeGateway()
        const { schema, executor } = await gateway.load()

        const server = new ApolloServer({
            schema,
            executor,
            cacheControl: {
                calculateHttpHeaders: true,
                defaultMaxAge: Number(process.env.CACHE_MAX_AGE) || 0,
            },
            context: ({ req, res }) => {
                authentication.validateCredentials(req.headers?.authorization)

                return {
                    req,
                    res
                }
            },
        })

        return await server.listen(PORT).then(({ url }) => {
            console.log(`🚀 Server ready at port ${PORT}`)
        })
    } catch (e) {
        console.error(e.name + ', ' + e.message)
    }
}

main()
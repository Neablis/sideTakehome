const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { waitForServices, createServer } = require('./utils');
const { services } = require('./services/services.json');

const PORT = process.env.PORT || 80

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        request.http.headers.set('x-user-id', context.userId);
    }
}

const makeGateway = (services) => {
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
        const gateway = makeGateway(services)
        const { schema, executor } = await gateway.load()

        const server = createServer({schema, executor})
    
        return await server.listen(PORT).then(({ url }) => {
            console.log(`🚀 Server ready at port ${PORT}`)
        })
    } catch (e) {
        console.error(e.name + ', ' + e.message)
    }
}

main()
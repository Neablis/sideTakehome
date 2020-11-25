# Side Takehome Project
The goal of this take-home assignment is to evaluate your backend skills (Node.js, GraphQL,
3rd-party integration, testing, and more). This take-home should take around 5 hours to
complete. Feel free to make any assumptions, simplifications, or other changes to the problems
- though please state those in your write up when you submit this assignment. Please use as
many libraries as is reasonable - there is no sense in rebuilding what has been built.

Using Apollo, and a Node.js HTTP framework (Express.js or Koa), create a GraphQL endpoint
to retrieve a list of properties in a city. SimplyRETS is an API commonly used in real estate and
you will need to use it to retrieve the properties data.

## Goals
Create a simple Graphql API with
- Basic auth enforcing only 2 specified users can acess
- Use Apollo server for serving up Grapql Endpoints
- Create wrapper around simplyrets properties endpoint

## Steps to run
- Have docker set up locally
- > cp .env.example .env
- Update .env to have the correct environment variables for accessing simpleRet
- Query health endpoint on gateway

```
curl --request POST \
  --url http://localhost:3002/ \
  --header 'Authorization: Basic <Base64 encoded basic auth token>' \
  --header 'Content-Type: application/json' \
  --data '{"query":"{\n  health\n}"}'
```

## Design
The application is a dockerized Apollo Federation server. This emulates what a production microservice graphql 
project would look like with simple local development environment. For this system there is 1 gateway and 1 server (The application server).
However, if we wanted to add other servers, we would just need to register them in the gatway (In services.json), and they would be stitched together.

### Infrastructure
Docker & Docker-compose gives us the benefit of simple local development. No need for managing an entire tech stack locally. If we ever needed postgres or redis set up, they would be trivial to add also. Also has tests running in a docker instance on file changes. 

### Testing
Testing is done with mocha + Chai + Istanbul (coverage) + nock (mocking). Testing is essentially built out just enough to see how you go about getting 100% test coverage. Unfortunately, the way apollo federations work, it would require real servers to run to test, so had to just test the authentication layer directly on the underlying service. The Application server is fully tested, All requestions to SimpleRet are mocked out, though the abstraction could be cleaner through use of a secondary file defining routes, and responses rather than test by test. 

I used insomnia to test and build out all my endpoints. I did not including my xml, since i dont know or expect tester to have insomnia instance. 

## Notes
I used this project as a opportunity to learn Apollo Federations since it was a new technology I had been watching.
It seems promosing, but led to a lot more code for this take home then I originally intended to have. 

### Pros
- Single json file stitches together multiple Graphql instances
- A graphql instance on one server hypothetically can use elements from another server (Users microservice can return Listings microservice results)
- Built in performance and error metrics through Apollo Studio
- Single point of authentication (This could also be a con)
### Cons
- Very new technology that didnt work with all my tools
- Very new tech that didnt work with common parts of apollo strangely :/
- Gateway is very hard to test since it has external dependencies (I Could solve this in time through dependency injection but thats hacky)

### Alternatives
- Do take home without splitting up schemas
  - Pros
    - Known problem
    - Easy
    - Much less code
  - Cons
    - Dont learn something new
    - Not extendable

- Use a nginx layer to stitch graphql schemas together
  - Pros
    - Common solution for graphql monoliths
    - Single source of adding new services
    - Keep gateway logic out of apollo servers (Federated schema, extends)
  - Cons
    - No sharing of graphql types between services
    - Dont learn something new

## Todos
- Add more test coverage
- Figure out how to inject schemas into the gateway to easier testing
- Find a way to add new federated servers dynamically so you wouldnt have to ship and roll box to add them
- Figure out how to publish to apollo studios the schema automatically
- Add configs for storing environmentable variables based on NODE_ENV, rather than using the docker-compose file
- Add back in performance metricing (was easy to add, hard to hide the secret cleanly)
- Better logging throughout the system (New requests, errors)
- Add typescript
- A lot of edge case handling (No real testing about unhappy SimpleRet requests)
- Add Lerna (my code is already structured to leverage lerna for code management)
- Docker testing throws errors on restarting too quickly
- Automated Linting

## Resources
- [Apollo Federation](https://www.apollographql.com/docs/federation/)
- [HTTP Authorization](https://www.ietf.org/rfc/rfc2617.txt)
- [Apollo Studio](https://studio.apollographql.com/)
- [Insomnia](https://insomnia.rest/graphql/)

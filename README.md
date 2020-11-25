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
project would look like with simple local development. For this instance there is only 1 gateway (The application server).
However if we wanted to add other servers, we would just need to register them in the gatway, and they would be stitched together.

Docker gives us the benefit of simple local development. 


## Resources
- Apollo Federation: https://www.apollographql.com/docs/federation/
- HTTP Authorization: https://www.ietf.org/rfc/rfc2617.txt


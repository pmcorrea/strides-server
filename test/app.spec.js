// Ensure tests are properly working
const axios = require('axios')
const app = require("../src/app")
const knex = require("knex")
const helpers = require("./test_helpers")
const jwt = require("jsonwebtoken")


describe("GraphQL Endpoint is up", () => {

  it("Should login demo user and return id of '1'", async () => {

    let result = await axios.post("https://young-castle-93107.herokuapp.com/graphql", {
          query: `
          query {
            loginUser(user_name: "Peter", user_password: "adminpassword") {
              id
              user_name
              token
            }
          }
          `
        })

    expect(result.data.data.loginUser.id).to.be.equal("1")
  })
})
// If we add multiple test files, it would be nice if we could 
// avoid needing to require expect and supertest in every file. 
// We can utilize a feature of mocha to require a specific setup 
// file we specify. Then we can add these functions as globals inside tests.
require("dotenv").config();

process.env.TZ = "UTC";
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "secret123TEST";
process.env.TEST_DB_URL =
	process.env.TEST_DB_URL || "";

const { expect } = require("chai");
const supertest = require("supertest");
global.expect = expect;
global.supertest = supertest;
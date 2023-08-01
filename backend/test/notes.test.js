const mongoose = require("mongoose");
const supertest = require("supertest");
const { app, server } = require("../index");

const api = supertest(app);

test("Notes are returned as a json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

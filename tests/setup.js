// File: tests/setup.js
// Generated: 2025-10-08 11:36:00 UTC
// Project ID: proj_388a524d8735
// Task ID: task_e70otforae2i


const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoServer;

module.exports = {
  setupTestDB: async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  teardownTestDB: async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  },

  clearTestDB: async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  },
};

beforeAll(async () => {
  await module.exports.setupTestDB();
});

afterEach(async () => {
  await module.exports.clearTestDB();
});

afterAll(async () => {
  await module.exports.teardownTestDB();
});

jest.setTimeout(30000);

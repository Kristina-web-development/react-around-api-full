const {
    NODE_ENV = 'production',
    JWT_SECRET = 'super_secret_key',
    MONGO_DB = 'mongodb://localhost:27017/aroundb',
    PORT = 3000,
  } = process.env;

  module.exports = {
 NODE_ENV, JWT_SECRET, MONGO_DB, PORT,
};

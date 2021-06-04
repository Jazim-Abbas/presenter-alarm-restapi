export default () => {
  const username = process.env.MONGO_USERNAME || "root";
  const password = process.env.MONGO_PASSWORD || "password";

  return {
    MONGO_URI: `mongodb://${username}:${password}@localhost:27017/presenter-alarm-app?authSource=admin`,
  };
};

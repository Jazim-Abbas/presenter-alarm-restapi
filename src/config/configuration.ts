export default () => {
  const username = process.env.MONGO_USERNAME || "root";
  const password = process.env.MONGO_PASSWORD || "password";

  return {
    MONGO_URI: `mongodb://${username}:${password}@localhost/presenter-alarm-app?authSource=admin`,
    SECRETKEY: 'mykey'
  };
};

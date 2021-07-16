export default () => {
  const username = process.env.MONGO_USERNAME || "root";
  const password = process.env.MONGO_PASSWORD || "password";
  const mongo_URI = `mongodb://${username}:${password}@localhost/presenter-alarm-app?authSource=admin`;

  return {
    MONGO_URI: process.env.MONGO_URI || mongo_URI,
    SECRETKEY: "mykey",
  };
};

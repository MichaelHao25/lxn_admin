export default {
  //   address: `http://59.110.32.43:3000`,
  address:
    process.env.NODE_ENV === "development"
      ? `http://127.0.0.1:3000`
      : `http://59.110.32.43:3000`,
};

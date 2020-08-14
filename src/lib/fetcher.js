const APP_URL = `http://localhost:3000`;

const fetcher = (...args) => {
  args[0] = `${APP_URL}${args[0]}`;
  return fetch(...args).then((res) => res.json());
};

export default fetcher;

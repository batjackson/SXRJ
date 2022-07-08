const config = {
  // the mothods of this request
  method: "get", // default
  // the base url will unshift into the url you write in the parmas
  baseURL: "http://121.5.56.179:8890",
  timeout: 5000,
  // when cross origin,whether the request will cookie
  withCredentials: false, // default
  // type of the reponse data
  reponseType: "json",
};
export default config;

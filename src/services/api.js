// import axios from "axios";

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}/api`,
  
// });
// console.log(import.meta.env.VITE_API_URL);

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;
import axios from 'axios';

const kasselApi = axios.create({
  baseURL: process.env.GATSBY_KASSEL_API_URL,
});

export default kasselApi;

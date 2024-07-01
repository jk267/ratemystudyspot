import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://ratemystudyspot.com/api/v1/restaurants'
    : 'http://localhost:3000/api/v1/restaurants';

const instance = axios.create({
    baseURL,
});
export default instance;

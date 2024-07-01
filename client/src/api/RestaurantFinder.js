import axios from 'axios';


// decide production mode or dev mod 
// NODE_ENV -> set production or a dev

//if we are in production, we use the base ulr of the /api/v1/restaurants
//else base url will be whatever before 


const baseURL = process.env.NODE_ENV === "production"? "api/v1/restaurants" :"http://localhost:3000/api/v1/restaurants"



export default axios.create({
    baseURL,
});

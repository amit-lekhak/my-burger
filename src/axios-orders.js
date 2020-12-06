import axios from "axios";

const instance = axios.create({
    baseURL : "https://react-my-burger-274e8-default-rtdb.firebaseio.com/"
});



export default instance;
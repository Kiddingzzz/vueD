import axios from "axios";

const server = axios.create({
    baseURL:"https://shanghai.anjuke.com/sale/?from=navigation#",
    headers:{
        "Content-type":"text/plain",
        "Access-Control-Allow-Cradentials":true
    }
})

server.interceptors.request.use(
    config => {
        config.headers.token = localStorage.getItem("token");
        return config;
    },
    error => {
        console.log(error)
        Promise.reject(error);
    }
)
server.interceptors.response.use(
    response => {
        if(response.data.code == 200){
            console.log("操作成功")
        }
    }
)
export default server;
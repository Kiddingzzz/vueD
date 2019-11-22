import axios from "axios";

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
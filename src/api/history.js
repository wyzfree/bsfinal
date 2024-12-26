
// 导入request
import request from '@/utils/request.js'

export const getHistoryFromMysql = () => {
    // 
    return request.post('/product/readmysql');
}


// export const deleteHistoryFromMysql = (pid) => {
//     console.log("into deleteHistoryFromMysql...")
//     console.log("pid: " + pid)
//     const params = new URLSearchParams(pid);
//     console.log("params: " + params)
//     return request.post('/product/deletemysql', params);
// }

export const deleteHistoryFromMysql = (pid) => {
    console.log("into deleteHistoryFromMysql...");
    console.log(pid);
    return request.post('/product/deletemysql', null, {
        params: { pid } // 这里将 pid 作为查询参数传递
    });
}

export const getCertainFromMysql = (pid) => {
    console.log("into getCertainFromMysql...")
    console.log("pid: " + pid)
    return request.post('/product/getcertain', null, {
        params: { pid } // 这里将 pid 作为查询参数传递
    });
}

// 导入request
import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'


export const TBsearchService = (searchData) => {
    //console.log("in searchService... " + searchData)
    const params = new URLSearchParams(searchData);
    //return request.post('/product/show', params);
    return request.post('/product/tbsearch', params);
};

export const JDsearchService = (searchData) => {
    //console.log("in searchService... " + searchData)
    const params = new URLSearchParams(searchData);
    //return request.post('/product/show', params);
    return request.post('/product/jdsearch', params);
};

export const addService = (itemData) => {
    console.log("into addService...")
    const params = new URLSearchParams(itemData);
    console.log("展示params")
    console.log(params)
    return request.post('/product/add', params);
};
//'Authorization': `Bearer ${tokenStore.token}`
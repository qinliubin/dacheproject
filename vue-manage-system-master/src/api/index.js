import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
export const fetchDatatest = query => {
    return request({
        url: 'admin/allAdmin',
        method: 'get',
        params: query
    });
};

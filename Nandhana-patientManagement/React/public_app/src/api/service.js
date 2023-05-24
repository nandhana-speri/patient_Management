import instance from './instance';

export const getData = (url) => instance.get(url);
export const setData = (url, data) => instance.post(url, data);
export const editData = (url, data) => instance.patch(url, data);
export const getByIdData = (url, id) => instance.get(`${url}/${id}`);
export const deleteData = (url, id) => instance.delete(`${url}/${id}`);
export const driverApprovalReqs = (data) =>
  instance.patch('driver/approve', data);

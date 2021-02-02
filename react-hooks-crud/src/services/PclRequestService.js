import http from "../http-common";
//adding some comments

const getAll = () => {
  return http.get("/pclrequests");
};

const get = id => {
  return http.get(`/pclrequests/${id}`);
};

const create = data => {
  return http.post("/pclrequests", data);
};

const update = (id, data) => {
  return http.put(`/pclrequests/${id}`, data);
};

const remove = id => {
  return http.delete(`/pclrequests/${id}`);
};

const removeAll = () => {
  return http.delete(`/pclrequests`);
};

const findByRequestType = requestType => {
  return http.get(`/pclrequests?requestType=${requestType}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByRequestType
};

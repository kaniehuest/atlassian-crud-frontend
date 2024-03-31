import http from "../http-common";

const getAll = () => {
  return http.get("/");
};

const get = (id) => {
  return http.get(`/${id}`);
};

const create = (data) => {
  return http.post("/", data);
};

const update = (id, data) => {
  return http.put(`/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/${id}`);
};

const findByName = (name) => {
  return http.get(`/?name=${name}`);
};

const SensorService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default SensorService;

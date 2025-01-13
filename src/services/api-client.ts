import axios from "axios";

import jwt from "./jwt";
import cookie from "./getCookie";
const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 500000,
  headers: {
    "X-CSRFToken": cookie,
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: jwt ? `JWT ${jwt}` : undefined,
    credentials: "include",
  },
});

interface ResponseA<T> {
  count: number;
  results: T[];
}
interface addId {
  id: number | undefined;
}
type TypeWithId = T | addId;
class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint + "/";
  }
  getAll = () => {
    return instance
      .get<ResponseA<T>>(this.endpoint)
      .then((res) => res.data.results);
  };
  save = (data: T) => {
    return instance.post<T>(this.endpoint, data).then((res) => res.data);
  };
  setFriend = (data: TypeWithId) => {
    return instance
      .patch<T | addId>(this.endpoint + `${data.id}/set_friend/`, data)
      .then((res) => res.data);
  };
  completeTransaction = (data: TypeWithId) => {
    return instance
      .patch<T | addId>(this.endpoint + `${data.id}/complete/`, data)
      .then((res) => res.data);
  };
  deleteTransaction = (data: TypeWithId) => {
    return instance
      .delete<T | addId>(this.endpoint + `${data.id}/delete/`)
      .then((res) => res.data);
  };
}

export default ApiClient;

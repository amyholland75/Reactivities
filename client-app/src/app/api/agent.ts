import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api"; //?where does this get called?
axios.interceptors.response.use(async (response) => {
  try {
    await sleep(2000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data; //declares a function called reposponse body, take a parameter of AxiosResponse, return response.data

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string) => axios.post<T>(url).then(responseBody),
  put: <T>(url: string) => axios.put<T>(url).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}; //object contains 4 methods, each method takes a parameter and calls axios function, then is promise code

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => axios.post<void>("/activities", activity),
  update: (activity: Activity) =>
    axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
}; //object with a property list, list is a function that makes a get request to the"/activities" endpoint and returns a promise that resolves to an array of Activity objects

const agent = {
  Activities,
};

export default agent; //importing and exporting, modules in JS

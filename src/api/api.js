import axios from "axios";

let istance = axios.create({
  baseURL: "http://localhost:5000",
});

export const getApiItems = {
  getItemsForApi(data) {
    return istance.post("/", { ...data });
  },
  saveNewData(data) {
    return istance.put("/", {data:data});
  },
  getItems() {
    return istance.get("/");
  },
  clearDb() {
    return istance.delete("/");
  },
};

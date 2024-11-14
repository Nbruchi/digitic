export const baseURL = "http://localhost:5000/api";

const localStorageCustomer = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      localStorageCustomer !== null ? localStorageCustomer.token : ""
    }`,
    Accept: "application/json",
  },
};

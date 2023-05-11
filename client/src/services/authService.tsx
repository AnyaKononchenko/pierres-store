import axios from "axios";

import { Login } from "@customTypes/users";
import { CommonResponse } from "@customTypes/common";

const BASE_URL = "http://localhost:3002/api/v1";

export const login = async (loginData: Login) => {
  await axios
    .post<CommonResponse>(`${BASE_URL}/auth/login`, loginData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      }
    });
};



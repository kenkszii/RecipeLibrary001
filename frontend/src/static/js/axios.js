import axios from "axios";

import { Auth } from "./useAuth.js";
import fetchAPI from "./fetchAPI.js";


axios.defaults.baseURL = "http://127.0.0.1:5000";

let refresh = false;

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		const originalRequest = error.config;

		if (error && error["response"] && error["response"]["status"] === 401
			&& !refresh
		) {
			const {authorize, renewAuthSession} = Auth();
		
			refresh = true;

			authorize("refresh_token");

			return (
				fetchAPI("/auth/refresh", "POST", undefined, [201, 401])
					.then(
						function (response) {
							if (response && response["status"] === 201) {
								const {data} = response;

								renewAuthSession(data["message"]);

								originalRequest.headers.Authorization = (
									`Bearer ${data["message"]["access_token"]}`
								);

								return axios(originalRequest);
							};
						}
					)
					.catch(
						function (error) {
							return error;
						}
					)
					.finally(
						function () {
							refresh = false;
						}
					)
			);
		};

		refresh = false;
		
		return error;
	},
);

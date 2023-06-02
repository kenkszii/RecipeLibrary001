import axios from "axios";
import swal from "sweetalert2";


function fetchAPI(url, method, form_data={}, ignore_status=[]) {
  const axiosMethod = (
		method === "POST"
		? axios.post
    : method === "GET"
    ? axios.get
    : method === "PUT"
    ? axios.put
    : method === "DELETE"
    ? axios.delete
		: <></>
	);

  return (
    axiosMethod(url, form_data)
      .then(
        function (response) {
          // configure swal for error without response.response like network error etc
          // always include error status code 401 in ignore_status
          if (!ignore_status.includes(
            response["status"] || response["response"]["status"]
          )) {
            let {statusText, status, data} = response["response"];

            if (statusText === "") {
              if (status === 401) {
                statusText = "Unauthorized";
              } else if (status === 500) {
                statusText = "Server Error";
              } else if (status === 400) {
                statusText = "Bad Request";
              };
            };

            new swal({
              title: statusText + ": " + status,
              text: data["message"],
              icon: "error",
              confirmButtonText: "Please Try Again",
            });
          } else {
            return response;
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
          return;
        }
      )
  );
};


export default fetchAPI;
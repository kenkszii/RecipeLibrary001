import { useNavigate, Navigate } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";

import { useLocalStorage } from "./useLocalStorage.js";


function Auth(use_navigate=null) {
  // create a rouute that will be use to verify if the login credentials are valid, decode the jwt token using javascript and
  // pass it to the api if user is been found then isAuthenticated else is not.
  let isAuthenticated = false;
  let credentials = null;
  let isLoading = true;

  const navigate = use_navigate;
  const key = "USER_TOKEN_AUTH_KEY";
  
  const {load, save, destroy, update} = useLocalStorage(key);
  const savedCredentials = load();

  if (savedCredentials) {
    const { access_token } = savedCredentials;
    save({ access_token });
    credentials = savedCredentials;
    
    isAuthenticated = true;
  };
 

  function signIn(newCredentials) {
    save(newCredentials);

    credentials = newCredentials;
    isAuthenticated = true;

    new swal({
      title: "Success",
      text: "Account signed in successfully.",
      icon: "success",
    });

    navigate("/dashboard");
  };


  function GetAuthenticated() {
    new swal({
      title: "Info",
      text: "Please sign in to access this system.",
      icon: "info",
    })

    return <Navigate to="/login" />;
  };


  function unauthorize() {
    delete axios.defaults.headers.common["Authorization"];
  };


  function signOut() {
    if (isAuthenticated) {
      destroy();

      credentials = null;
      isAuthenticated = false;
      
      unauthorize();

      new swal({
        title: "Success",
        text: "Account signed out successfully.",
        icon: "success",
      });
    } else {
      GetAuthenticated();
    };

    navigate("/login");
  };


  function authorize(key) {
    axios.defaults.headers.common["Authorization"] = (
      `Bearer ${
        key === "access_token"
        ? credentials["access_token"]
        : key === "refresh_token"
        ? credentials["refresh_token"]
        : credentials
      }`
      
    );
  };


  function renewAuthSession(new_session) {
    update(new_session);

    Object.assign(credentials, new_session);
    
    isAuthenticated = true;
  };


  isLoading = false;

  return {
    isAuthenticated, isLoading, signIn, signOut, GetAuthenticated, authorize,
    renewAuthSession, unauthorize
  };
};


function useAuth() {
	return Auth(useNavigate());
};


export { Auth, useAuth };
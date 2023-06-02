import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import fetchAPI from "../static/js/FectchApi";
import { useAuth } from "../static/js/useAuth";


import "../static/style.css"

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { isAuthenticated, signIn, unauthorize } = useAuth();
  const [isProcessingRequest, setProcessingRequest] = useState(false);


  function handleSignIn(form_data) {
    if (!isAuthenticated) {
      setProcessingRequest(true);
      unauthorize();

      fetchAPI("/auth/login", "POST", form_data, [201, 401]) 
        .then(
          function (response) {
            if (response) {
              const { data, status } = response;
              console.log(data);
              console.log(form_data);

              if (status === 201) {
                signIn(data["message"]);
              };
            };
          }
        )
        .finally(
          function () {
            setProcessingRequest(false);
          }
        );
    } else {
      navigate("/dashboard");
    };
  };

  return (
    <div className="auth">
      <div className="containerauth">
        <Form >

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder="Username"
              {...register("username", { required: true, maxLength: 25 })}
            />
          </Form.Group>
          {errors.username && <p style={{ color: "red" }}><small>Username is required</small></p>}
          {errors.username?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 25</small></p>}


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </Form.Group>
          {errors.password && <p style={{ color: "red" }}><small>Password is required</small></p>}
          {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>password should not less than 8 character</small></p>}

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me"
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit(handleSignIn)}>
            Login
          </Button>
        </Form>

        <Form.Group>
          <small>Do not have an account? <Link to='/signup'>Signup here</Link></small>
        </Form.Group>
      </div>
    </div>
  );
}

export default Login;



  

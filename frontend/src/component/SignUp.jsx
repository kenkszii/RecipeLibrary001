import React from "react";

import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from 'sweetalert2'


function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();


  const submitForm = (data) => {
    if (data.password === data.confirmPassword) {


      const body = {
        username: data.username,
        email: data.email,
        password: data.password
      }

      const requestOptions = {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }


      fetch("http://127.0.0.1:5000/auth/signup", requestOptions, [201])
        .then(res => res.json())
        .then(data => {
          console.log(data)
          
          const status = data.status;

          if (status===201)
          {
          new Swal({
            title: "Success",
            text: data["message"],
            icon: "success",
            confirmButtonText: "Proceed to Login",
          });
        }
        else{
          new Swal({
            title: "Error",
            text: data["message"],
            icon: "error",
            confirmButtonText: "Proceed to Login",
          });
        }

        })
        
        .catch(err => console.log(err))

    }

    else {
      alert("Passwords do not match")
    }


  }


  return (
    <div className="auth">
      <div className="containerauth">
        <Form>
          <Form.Group className="mb-3" controlId="myTextField">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username"
              {...register("username", { required: true, maxLength: 25 })}
            />
          </Form.Group>
          {errors.username && <p style={{ color: "red" }}><small>Username is required</small></p>}
          {errors.username?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 25</small></p>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="Email" placeholder="Email"
              {...register("email", { required: true, maxLength: 80 })}
            />
          </Form.Group>
          {errors.email && <p style={{ color: "red" }}><small>Email is required</small></p>}
          {errors.email?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </Form.Group>
          {errors.password && <p style={{ color: "red" }}><small>Password is required</small></p>}
          {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              {...register("confirmPassword", { required: true, minLength: 8 })}

            />
          </Form.Group>
          {errors.confirmPassword && <p style={{ color: "red" }}><small>Confirm your Password</small></p>}
          {errors.confirmPassword?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}
          

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit(submitForm)}>
            SignUp
          </Button>

          <Form.Group>
            <small>
              Already have an account, <Link to="/login" className="signup">Log In</Link>
            </small>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
export default SignUp;


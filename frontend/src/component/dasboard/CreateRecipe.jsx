import React, {useState} from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import swal from 'sweetalert2';
import { useAuth } from '../../static/js/useAuth';

import fetchAPI from '../../static/js/fetchAPI';

function CreateRecipe(props) {
  const { setRecipes } = props;
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { authorize} = useAuth();
  
 


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

  
  };

  const handleCreate = (form_data) => {
    authorize('access_token');
    fetchAPI("/recipe/recipes", "POST", form_data, [200, 201, 400])
      .then((response) => {
        const { data, status } = response;
        console.log("formdat", form_data);
        console.log("res", response);

        if (status === 200 || status === 201) {
          setRecipes((prevRecipes) => [...prevRecipes, data]);
          authorize('access_token');
          new swal({
            title: "Success",
            text: "Recipe created successfully.",
            icon: "success",
          });
         
          closeModal(); // Close the modal after successful creation or update
        } else {
          new swal({
            title: "Error",
            text: data["message"],
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        new swal({
          title: "Error",
          text: "An error occurred while fetching data.",
          icon: "error",
        });
      });
  };
  return (
    <>
    <Button variant="primary" onClick={openModal}>
      Craete Recipe

  </Button>

    <Modal show={showModal} onHide={closeModal}  backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>CREATE A RECIPE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Title:</label>
            <input type="text" className="form-control" id="recipient-name" 
            {...register("title", { required: true })}
            />
             {errors.title && <p style={{ color: "red" }}><small>Title is required</small></p>}
          </div>
        

          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Description:</label>
            <textarea className="form-control" id="message-text" 
            {...register("description", { required: true })}>
            
            </textarea>
            {errors.title && <p style={{ color: "red" }}><small>Description is required</small></p>}
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(handleCreate)}>Create</Button>
      </Modal.Footer>
    </Modal>
    </>

  )
}

export default CreateRecipe;



import React, {useState} from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import swal from 'sweetalert2';
import { useAuth } from '../../static/js/useAuth';

import fetchAPI from '../../static/js/fetchAPI';

function UpdateRecipe(props) {
  const [showModal, setShowModal] = useState(false);
  const { register, getValues, formState: { errors } } = useForm();
  const { authorize } = useAuth();


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

  
  };

  const handleUpdate = (id, form_data) => {

    authorize('access_token');
    fetchAPI(`/recipe/recipe/${id}`, "PUT", form_data, [200, 201, 400])
      .then((response) => {
        const { data, status } = response;
        if (status === 200 || status === 201) {
          authorize('access_token');
          new swal({
            title: "Success",
            text: "Recipe updated successfully.",
            icon: "success",
          });
          props.updateRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id ? data : recipe
          )
        );
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
    <Button variant="warning" onClick={openModal}>
      Update

  </Button>

    <Modal show={showModal} onHide={closeModal}  backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>UPDATE RECIPE</Modal.Title>
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
        <Button variant="primary" type="submit" onClick={() => handleUpdate(props.recipe, getValues())}>Save</Button>
      </Modal.Footer>
    </Modal>
    </>

  )
}

export default UpdateRecipe;


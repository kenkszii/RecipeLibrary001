import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import UpdateRecipe from './UpdateRecipe';

function ViewRecipe(props) {
  const [showModal, setShowModal] = useState(false);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <Button variant="primary" onClick={openModal}>
      View Recipe

  </Button>

    <Modal show={showModal} onHide={closeModal}  backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <small>
          Description: {props.description}
          </small>
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <UpdateRecipe recipe={props.recipe} setRecipe={props.setRecipe}/>
      </Modal.Footer>
    </Modal>
    </>

  )
}

export default ViewRecipe;

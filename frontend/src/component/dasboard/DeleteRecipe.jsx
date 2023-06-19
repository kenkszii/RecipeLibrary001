import React from "react";
import fetchAPI from "../../static/js/fetchAPI";
import { Button } from 'react-bootstrap';
import swal from "sweetalert2";

function DeleteRecipe(props) {

  const handleDelete = (id, form_data) => {

    fetchAPI(`/recipe/recipe/${id}`, "DELETE", form_data, [201, 200, 400])
      .then((response) => {
        const { data, status } = response;


        if (status === 200) {
          new swal({
            title: "Success",
            text: "recipe deleted successfully.",
            icon: "success",
          });
          props.updateRecipes((prevRecipes) =>
            prevRecipes.filter((recipe) => recipe.id !== id))
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
      <Button
        variant="danger"
        className="ml-2"
        onClick={() => handleDelete(props.recipe)}
      >
        Delete
      </Button>
    </>
  )
}

export default DeleteRecipe;

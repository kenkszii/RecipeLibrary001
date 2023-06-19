import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import fetchAPI from '../static/js/fetchAPI';
import { useAuth } from '../static/js/useAuth';
import swal from 'sweetalert2';
import ViewRecipe from './dasboard/ViewRecipe';
import DeleteRecipe from './dasboard/DeleteRecipe';
import CreateRecipe from './dasboard/CreateRecipe';
import UpdateRecipe from './dasboard/UpdateRecipe';
const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const { signOut } = useAuth();

  const updateRecipes = (newRecipes) => {
    setRecipes(newRecipes);
  };


  useEffect((form_data) => {

    fetchAPI("/recipe/recipes", "GET", form_data, [201, 200, 400])
      .then((response) => {
        const { data, status } = response;

        if (status === 200) {
          setRecipes(data);
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


  }, []);

  return (
    <Container>
      <h1>My Recipe Dashboard</h1>
      <CreateRecipe setRecipes={setRecipes}/>
      <Button variant="danger" className='ms-3' onClick={signOut} >
        Logout
      </Button>

      <hr />

      <Row>
        {recipes.map((recipe) => (
          <Col key={recipe.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Text>{recipe.id}</Card.Text>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>

                <ViewRecipe title={recipe.title} description={recipe.description} recipe={recipe.id} setRecipes={setRecipes}/>
                <DeleteRecipe recipe={recipe.id} updateRecipes={updateRecipes} />
                <UpdateRecipe recipe={recipe.id} setRecipes={setRecipes}/>

              </Card.Body>
            </Card>
          </Col>
        ))}

      </Row>



    </Container>
  );
};

export default Dashboard;

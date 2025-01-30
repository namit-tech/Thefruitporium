import React from "react";
import "./fruits.css";
import simplefruits from "../../assets/pineapple.JPG";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Fruits = () => {
  const addButton = {
    backgroundColor: "#709F41",
    color: "white",
    width: "5vw",
  };
  return (
    <div className="cards">
      <Card className="data">
        <Card.Img className="data-img" variant="top" src={simplefruits} />
        <Card.Body>
          <Card.Title className="fw-bold">Pineapple</Card.Title>
            <Card.Text className="">Rs - 1000/-</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Text className="text-secondary">200 g</Card.Text>
            <div className="d-flex justify-content-end">
              <Button variant="sucess" style={addButton}>
                ADD
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Fruits;

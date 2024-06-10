import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { solicitud_trabajo_backend } from 'declarations/solicitud_trabajo_backend';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const FormPostulante = ({
  id = null,
  pNombre = "",
  pEdad = 0,
  pPuesto = "",
  isEditable = false,
  getPostulantes,
  setShow
}) => {
  const [nombre, setNombre] = useState(pNombre);
  const [puesto, setPuesto] = useState(pPuesto);
  const [edad, setEdad] = useState(pEdad);

  const navigate = useNavigate();

  const onChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const onChangePuesto = (e) => {
    setPuesto(e.target.value);
  };

  const onChangeEdad = (e) => {
    setEdad(e.target.value);
  };

  const createPostulante = () => {
    Swal.fire("Guardando postulante");
    Swal.showLoading();
    solicitud_trabajo_backend.createPostulante(nombre, puesto, BigInt(edad)).then(postulante => {
      Swal.fire({
        title: "Postulante guardado",
        text: "Se han realizado los cambios correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/');
        getPostulantes();
      });
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.log("Error al añadir al postulante", err);
    });
  };

  const updatePostulante = () => {
    Swal.fire("Updating postulante");
    Swal.showLoading();
    solicitud_trabajo_backend.updatePostulante(BigInt(id), nombre, puesto, BigInt(edad)).then(postulante => {
      Swal.fire({
        title: "Postulante actualizado",
        text: "Se han realizado los cambios correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setShow(false);
        getPostulantes();
      });
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.log("Error al actualizar al postulante", err);
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card.Title>{isEditable ? "Update" : "Add"} Postulante</Card.Title>
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Ingresa tu nombre completo</Form.Label>
                    <Form.Control value={nombre} name="nombre" onChange={onChangeNombre} type="text" placeholder="Nombre completo" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Ingresa tu edad</Form.Label>
                    <Form.Control value={edad} name="edad" onChange={onChangeEdad} type="number" placeholder="Edad" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Ingrese el puesto que se desee</Form.Label>
                    <Form.Control value={puesto} name="puesto" onChange={onChangePuesto} type="text" placeholder="Puesto de trabajo" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="primary" onClick={isEditable ? updatePostulante : createPostulante}>
                    {isEditable ? "Update" : "Save"} postulante
                  </Button>
                  <Form.Text className="text-muted">
                    No se va a compartir tu informacion personal.
                  </Form.Text>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default FormPostulante;

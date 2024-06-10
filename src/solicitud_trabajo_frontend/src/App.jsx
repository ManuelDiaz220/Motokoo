import { useEffect, useState } from 'react';
import { solicitud_trabajo_backend } from 'declarations/solicitud_trabajo_backend';
import { Col, Container, Row, Card, Table, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import FormPostulante from './FormPostulante';
import Swal from 'sweetalert2';

function App() {
  const [postulantes, setPostulantes] = useState([]);
  const [postulante, setPostulante] = useState({});
  const [show, setShow] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    getPostulantes();
  }, []);
  
  const getPostulantes = async () => {
    try {
      const postulantes = await solicitud_trabajo_backend.getAllPostulantes();
      setPostulantes(postulantes);
    } catch (error) {
      console.error("Error fetching postulantes:", error);
      Swal.fire("Error", "Unable to fetch postulantes", "error");
    }
  };

  const getPostulante = async (id) => {
    try {
      const postulante = await solicitud_trabajo_backend.getPostulanteById(BigInt(id));
      setPostulante(postulante.shift());
      setIsNew(false);
      setShow(true);
    } catch (error) {
      console.error("Error fetching postulante:", error);
      Swal.fire("Error", "Unable to fetch postulante", "error");
    }
  };

  const deletePostulante = async (id) => {
    Swal.fire("Deleting");
    Swal.showLoading();
    try {
      await solicitud_trabajo_backend.deletePostulante(BigInt(id));
      getPostulantes();
    } catch (error) {
      console.error("Error deleting postulante:", error);
      Swal.fire("Error", "Unable to delete postulante", "error");
    }
  };

  const handleAddPostulante = () => {
    setPostulante({});
    setIsNew(true);
    setShow(true);
  };

  return (
    <Container className="mt-5 p-3" style={{ backgroundColor: '#e0f7fa', borderRadius: '8px' }}>
      <Row>
        <Col>
          <Card style={{ backgroundColor: '#ffffff' }}>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Card.Title>Solicitudes</Card.Title>
                </Col>
                <Col className="text-end">
                  <Button variant="primary" onClick={handleAddPostulante}>Agregar postulante</Button>
                </Col>
              </Row>
              <Table striped bordered hover responsive style={{ backgroundColor: '#bbdefb' }}>
                <thead style={{ backgroundColor: '#1565c0', color: '#ffffff' }}>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Puesto</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    postulantes.length > 0 ? 
                    postulantes.map((postulante, index) => (
                      <tr key={index}>
                        <td>{Number(postulante.id)}</td>
                        <td>{postulante.nombre}</td>
                        <td>{Number(postulante.edad)}</td>
                        <td>{postulante.puesto}</td>
                        <td>
                          <Row>
                            <Col>
                              <Button variant="primary" onClick={() => getPostulante(Number(postulante.id))}>Update</Button>
                            </Col>
                            <Col>
                              <Button variant="warning" onClick={() => deletePostulante(Number(postulante.id))}>Delete</Button>
                            </Col>
                          </Row>
                        </td>
                      </tr> 
                    )) :
                    <tr>
                      <td colSpan="5" className="text-center">No hay postulantes</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isNew ? "Agregar" : "Update"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormPostulante
            id={isNew ? null : Number(postulante.id)}
            pNombre={postulante.nombre || ""}
            pEdad={postulante.edad || ""}
            pPuesto={postulante.puesto || ""}
            isEditable={true}
            fetchPostulantes={getPostulantes}
            setShow={setShow}
            isNew={isNew}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ModalCad from "../../components/RegisterNew";
import Cards from "../../components/CardPatient";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import api from "../../Axios";
import "../../components/CardPatient/style.css"


export default function Homes() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  async function getAllPatients() {
    try {
      const response = await api.get(`patients?page=${page}`);

      setPatients(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPatients();
  }, [page]);

  return (
    <div className="AllPage">
      <Header />

      <ModalCad getAllPatients={getAllPatients} />
      
      <div className="div-pagination-home">
        <Pagination
          changeSelectedPage={setPage}
          totalPages={totalPages}
        />
      </div>

      <Container fluid style={{ paddingRight: "2rem" }}>
        <Row>
          {patients.map((patient) => (
            <Col md={4} xsm={6} sm={5} lg={2} xlg={2}>
              <Cards data={patient} getAllPatients={getAllPatients} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
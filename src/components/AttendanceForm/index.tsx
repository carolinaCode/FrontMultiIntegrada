import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import api from '../../Axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pagination } from '../Pagination';
import './style.css';

export default function FormAtendimento() {
  const [itens, setItens] = useState([]);
  const [temp, setTemp] = useState<number>();
  const [systolic, setSystolic] = useState<number>();
  const [diastolic, setDiastolic] = useState<number>();
  const [respiratory, setRespiratory] = useState<number>();
  const [pulse, setPulse] = useState<number>();
  const [symptoms, setSymptoms] = useState<number[]>([]);
  const [lastAttendances, setLastAttendances] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [patientsPerPage, setPatientsPerPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { id } = useParams();

  function handleCreateNewAttendance(event: FormEvent) {
    event.preventDefault();

    try {
      api.post('attendance', {
        patient_id: Number(id),
        temperature: temp,
        systolic_pressure: systolic,
        diastolic_pressure: diastolic,
        respiratory_rate: respiratory,
        pulse: pulse,
        symptoms: symptoms,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      }).fire({
        icon: 'success',
        title: 'Paciente atendido com sucesso!'
      });
    } catch(error) {
      console.log(error)
    }

    getAttendances();
  }

  async function getAttendances() {
    try {
      const response = await api.get(`/attendance/200`);
      const response2 = await api.get(`patients/${id}/attendances?page=${page}`);

      setItens(response.data.data.symptoms);
      setLastAttendances(response2.data.data);

      setTotalPages(response2.data.meta.last_page);
    } catch (error) {
      console.log(error);
    }
  }

  function checkCondition(totalSymptoms: any) {
    const result = totalSymptoms / 14 * 100;
    let condition = <Badge pill bg="dark" style={{ marginLeft: "50%", transform: 'translateX(-50%)' }}>Não Atendido</Badge>;

    if (result >= 0 && result <= 39) {
      condition =  <Badge pill bg="success" style={{ marginLeft: "50%", transform: 'translateX(-50%)' }}>Sintomas Insuficientes </Badge>;
    }

    if (result >= 40 && result <= 59) {
      condition =  <Badge pill bg="warning" style={{ marginLeft: "50%", transform: 'translateX(-50%)' }}>Potencial Infectado </Badge>;
    }
    
    if (result >= 60 && result <= 100) {
      condition =  <Badge pill bg="danger" style={{ marginLeft: "50%", transform: 'translateX(-50%)' }}>Possível Infectado</Badge>;
    }

    return condition;
  }

  useEffect(() => {
    getAttendances();
  }, [id, page]);

  if (!itens) {
    return <div className='data-pacienteHeader'>Carregando dados do paciente...</div>;
  }

  return (
    <div className="div-attendance">
      <Form onSubmit={handleCreateNewAttendance}>
        <h1>Formulário de atendimento</h1>

        <div className="form-atender form-atendimento">
          <div className='dados-vitais'>
            <h4>Dados Vitais</h4>

            <label>Pressão Arterial</label>

            <div className='pressao'>
              <FloatingLabel controlId="floatingInputGrid" label="Sistólica">
                <Form.Control onChange={e => setSystolic(Number(e.target.value))} type="number" required/>
              </FloatingLabel>

              <FloatingLabel controlId="floatingInputGrid" label="Diastólica">
                <Form.Control onChange={e => setDiastolic(Number(e.target.value))} type="number" required/>
              </FloatingLabel>
            </div>

            <FloatingLabel controlId="floatingInputGrid" label="Pulsação sanguínea">
              <Form.Control onChange={e => setPulse(Number(e.target.value))} type="number" required/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingInputGrid" label="Respiração">
              <Form.Control onChange={e => setRespiratory(Number(e.target.value))} type="number" required/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingInputGrid" label="Temperatura">
              <Form.Control onChange={e => setTemp(Number(e.target.value))} type="number" required/>
            </FloatingLabel>
          </div>

          <div className='sintomas'>
            <h4>Sintomas</h4>

            <div className='check-button'>
              <Container>
                <Row>
                  {itens.map((data: any) => {
                    const itemId = Number(data['id']);
                    const isChecked = symptoms.includes(itemId);

                    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                      const isChecked = e.target.checked;

                      setSymptoms(prevSelected => {
                        if (isChecked) {
                          return [...prevSelected, itemId];
                        } else {
                          return prevSelected.filter(id => id !== itemId);
                        }
                      });
                    };

                    return (
                      <Col style={{ margin: '0px 40px' }} md={2} sm={4}>
                        <Form.Check checked={isChecked} value={itemId} onChange={handleCheckboxChange} />
                        <p style={{ fontSize: '0.6em' }}>{data.name}</p>
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </div>
          </div>
        </div>

        <div className="d-grid gap-2" id='botaoFinalizar'>
          <Button type='submit' size='lg' >Finalizar o atendimento</Button>
        </div>
      </Form>

      <h1>Últimos atendimentos</h1>

      
        {lastAttendances.length > 0 ? (
          <>
          <div className="last-attendances">
          <Table  striped bordered hover className='table-lastAttendance'>
            <thead>
              <tr>
                <th>Data</th>
                <th>P.Sistólica</th>
                <th>P.Diastólica</th>
                <th>Pulso</th>
                <th>Respiração</th>
                <th>Temperatura</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lastAttendances.map((attendance: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{dayjs(attendance.created_at).format('DD/MM/YYYY')}</td>
                    <td>{attendance.systolic_pressure}</td>
                    <td>{attendance.diastolic_pressure}</td>
                    <td>{attendance.pulse}</td>
                    <td>{attendance.respiratory_rate}</td>
                    <td>{attendance.temperature}</td>
                    <td>{checkCondition(attendance.symptoms.length)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          </div>
          <div className="div-pagination">
        <Pagination
          changeSelectedPage={setPage}
          totalPages={totalPages}
        />
      </div>
     
      </>
        ) : (
          <div className='nao-atendido'>
          <h1><Badge pill bg="dark">Paciente não possui atendimentos</Badge></h1>
          </div>
        )}
      
      
    </div>
    

  );
}

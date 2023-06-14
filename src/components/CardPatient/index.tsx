import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { BsFillTrashFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Toast from 'sweetalert2';
import dayjs from 'dayjs';
import api from '../../Axios';
import ModalEditar from '../EditPatient';
import './style.css';

type Props = {
  data: any;
  getAllPatients: () => void;
}

function Cards({ data, getAllPatients }: Props) {
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleDeletePatient(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Essa ação não poderá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/patients/${id}`);

          getAllPatients();
        } catch (error) {
          console.log(error);

          Toast.fire({
            icon: 'error',
            title: 'Não é possível deletar pacientes com atendimentos!'
          });
        }
      }
    });
  }

  return (
    <div className="cards">
      <Card style={{ width: '100%', height: '90%', margin: '10px' }}>
        <Card.Body>
          <Card.Img
            style={{ width: '90px', height: '90px', borderRadius: "100%", marginLeft: '50%', transform: 'translateX(-50%)', marginTop: '-10px', marginBottom:"7px" }}
            variant="top"
            src={`http://covid-checker.sintegrada.com.br/storage/${data.image}`}

          />

          <Card.Text>
            <div className='infPaciente'>             
                <p><strong>{data.name}</strong></p>
                <p>Idade: {dayjs().year() - dayjs(data.birthdate).year()} anos</p>
                <p>Fone: {data.phone_number}</p>
                <p>CPF: {data.identifier}</p>           
            </div>

          <></>
          </Card.Text>
          
          <div className='botao_card'>
            <Button variant="danger" onClick={() => handleDeletePatient(data.id)}>
              <BsFillTrashFill />
            </Button>{' '}

            <ModalEditar patient={data} getAllPatients={getAllPatients} />{' '}

            <Button variant="dark" href={`/atendimento/${data.id}`}>
              <HiArrowNarrowRight />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;

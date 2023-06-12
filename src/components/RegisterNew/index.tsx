import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import api from '../../Axios';
import {BsPersonPlus} from 'react-icons/bs';
import ReactInputMask from "react-input-mask"
import { ChangeEvent } from 'react';
import dayjs from 'dayjs';
import './style.css';

type Props = {
  getAllPatients: () => void;
}

function ModalCad({ getAllPatients }: Props) {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [age, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [fone, setTelefone] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleCreateNewPatient = async (event: FormEvent) => {
    event.preventDefault();

    if(dayjs(age).isAfter(dayjs())){
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      }).fire({
        icon: 'error',
        title: 'A data de nascimento não pode ser futura'
      });
      return
    }

    try {
      await api.post('patients', {
        name: nome,
        identifier: cpf,
        birthdate: age,
        phone_number: fone,
        image: image
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      getAllPatients();
      handleClose();

      setNome('');
      setIdade('');
      setCpf('');
      setTelefone('');
      setImage(null);

      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      }).fire({
        icon: 'success',
        title: 'Paciente cadastrado com sucesso!'
      });
    } catch (error) {
      console.log(error);

      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      }).fire({
        icon: 'error',
        title: 'Erro ao cadastrar paciente!'
      });
    }
  }

  return (
    <>
      <div className='setModal'>
        <button className='cadButton' onClick={handleShow}>
         Novo  {<BsPersonPlus/>}
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className='tituloForm'>
          <Modal.Title>Cadastrar paciente</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleCreateNewPatient} className="cadastroPaciente">

            <label htmlFor='nomePaciente'>Nome completo</label>
            <input
              onChange={(e) => setNome(e.target.value)}
              id="nomePaciente"
              name="nomePaciente"
              type="text"
              placeholder="Digite o nome do paciente"
              required
            />

            <label htmlFor='nascimentoPaciente'>Data de Nascimento</label>
            <input
              onChange={(e) => setIdade(e.target.value)}
              id="nascimentoPaciente"
              name="nascimentoPaciente"
              type="date"
              required
            />

            <label htmlFor='cpfPaciente'>CPF</label>
            <ReactInputMask
              onChange={(e:ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)}
              mask="999.999.999-99"
              maskChar={null}
              id="cpfPaciente"
              name="cpfPaciente"
              type="text"
              placeholder="CPF do paciente"
              required
            />

            <label htmlFor='telefonePaciente'>Telefone</label>
            <ReactInputMask
              onChange={(event: any) => setTelefone(event.target.value)}
              mask="(99) 99999-9999"
              maskChar={null}
              id="telefonePaciente"
              name="telefonePaciente"
              type="text"
              placeholder="Telefone do paciente"
              value={fone}
              required
            />

            <label htmlFor='fotoPaciente'>Foto</label>
            <input
              onChange={(e:ChangeEvent<any>) => setImage(e.target.files[0])}
              id="fotoPaciente"
              name="fotoPaciente"
              type="file" required
            />

            <div className='botaoModal'>
              <Button variant='primary' type='submit'>Cadastrar</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCad;

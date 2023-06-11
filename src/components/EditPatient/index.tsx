import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { MdModeEditOutline } from 'react-icons/md';
import '../../componentStyle/Modal_Editar.css';
import api from '../../Axios';
import Swal from 'sweetalert2';

type Props = {
  patient: any;
  getAllPatients: () => void;
};

function ModalEditar({ patient, getAllPatients }: Props) {
  const [show, setShow] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientBirthdate, setPatientBirthdate] = useState("");
  const [patientCpf, setPatientCpf] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientPhoto, setPatientPhoto] = useState<File>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleUpdatePatient() {
    try {
      await api.put(`patients/${patient.id}`, {
        name: patientName,
        birthdate: patientBirthdate,
        phone_number: patientPhone,
        identifier: patientCpf,
        image: patientPhoto,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).fire({
        icon: 'success',
        title: 'Paciente editado com sucesso!',
      });

      getAllPatients();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <MdModeEditOutline />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className='tituloForm'>
          <Modal.Title>Editar dados do paciente</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='imagemEditar'>
          <img src={`http://covid-checker.sintegrada.com.br/storage/${patient.image}`} style={{ margin: '-8px 0px -20px 175px', width: "24%", height: "105px", borderRadius: '50%' }} />
          </div>

          <Form className="cadastroPaciente" onSubmit={handleUpdatePatient}>
            <label>Nome completo</label>
            <input
              id="nomePaciente"
              name="nomePaciente"
              type="text"
              placeholder="Digite o nome do paciente"
              value={patient.name}
              onChange={(event) => setPatientName(event.target.value)}
            />

            <label>Data de Nascimento</label>
            <input
              id="nascimentoPaciente"
              name="nascimentoPaciente"
              type="date"
              value={patient.birthdate}
              onChange={(event) => setPatientBirthdate(event.target.value)}
            />

            <label>CPF</label>
            <input
              id="cpfPaciente"
              name="cpfPaciente"
              type="text"
              placeholder="CPF do paciente"
              value={patient.identifier}
              onChange={(event) => setPatientCpf(event.target.value)}
            />

            <label>Telefone</label>
            <input
              id="telefonePaciente"
              name="telefonePaciente"
              type="text"
              placeholder="Telefone do paciente"
              value={patient.phone_number}
              onChange={(event) => setPatientPhone(event.target.value)}
            />

            <label>Foto do paciente</label>
            <input
              id="fotoEditar"
              name="fotoEditar"
              type="file"
              onChange={(event: any) => setPatientPhoto(event.target.files[0])}
            />

            <div></div>
          </Form>
          <div className='botaoModal'>
            <Button className='botaoEditar' variant="primary" onClick={handleClose}>
              Editar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditar;

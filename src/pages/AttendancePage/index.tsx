import Header from "../../components/Header";
import "../../componentStyle/Form_Atendimento.css";
import "../../pageStyle/Atendimento.css";
import FormAtendimento from "../../components/AttendanceForm";
import Informacoes from "../../components/InforBar/BarraDeInformações";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../Axios";

export default function Atendimento() {
  const [patientData, setPatientData] = useState([]);
  const { id } = useParams();

  async function fetchByPatientId() {
    try {
      const response = await api.get(`patients/${id}`);
      setPatientData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchByPatientId();
  }, [id]);

  return (
    <>
      <Header />
      <Informacoes patientDatas={patientData} />
      <FormAtendimento />
    </>
  );
}

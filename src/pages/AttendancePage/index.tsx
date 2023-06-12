import Header from "../../components/Header";
import "../../components/AttendanceForm/style.css";
import "../../components/InforBar/";
import FormAtendimento from "../../components/AttendanceForm";
import Informacoes from "../../components/InforBar";
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

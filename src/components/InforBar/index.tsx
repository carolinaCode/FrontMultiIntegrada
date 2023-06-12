import dayjs from 'dayjs';
import {Button} from 'react-bootstrap';
import {GrLinkPrevious} from 'react-icons/gr'
import {useNavigate} from 'react-router-dom'
import './style.css'
type Props = {
  patientDatas: any;
 }

function Informacoes({patientDatas}:Props){
    const navigate = useNavigate();

    return(
      <>
      <div className='info-all'>
      <div className="info-bar">
      
      <img className="info-photo" 
        src={`http://covid-checker.sintegrada.com.br/storage/${patientDatas.image}`} 
        style={{width:"75px" , height:"75px"}}/>
      <div className="info-details">
        <div className="info-name">{patientDatas.name}</div>
        <div className="info-age">Idade: {dayjs().year() - dayjs(patientDatas.birthdate).year()}</div>
        <div className="info-cpf">CPF: {patientDatas.identifier}</div>
        <div className="info-phone">Telefone: {patientDatas.phone_number}</div>
        <div className='previous'><Button onClick={() => navigate("/")} variant='secundary' title='Voltar para a página inicial'><GrLinkPrevious/></Button></div>
      </div>
    </div>
    </div>
    </>
    )
}
export default Informacoes;
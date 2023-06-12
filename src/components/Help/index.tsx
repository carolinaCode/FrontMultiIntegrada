import Header from "../Header"
import buttonAdd from './Images/botao.png'
import buttonAction from './Images/botoes.png'
import buttonAttendance from './Images/attendances.png'
import table from './Images/table.png'
import './style.css'

export default function Help() {
  return (
    <div>
      <Header/>
    <div className="help-page">
    <h1>Página de Ajuda</h1>
    <p>Bem-vindo à página de ajuda do seu sistema de atendimento de checagem.</p>
    <p>Aqui você encontrará respostas para possíveis dúvidas e orientações sobre como utilizar o sistema de forma eficaz.</p>
    <div className="faq-section">
      <h2> Como registrar um novo paciente?</h2>
      <p>Para registrar um novo paciente, clique no botão <img src={buttonAdd}/>

      que está localizado no canto superior direito da página principal. Preencha os campos necessários, como nome, data de nascimento, CPF, telefone e imagem. Em seguida, clique em "Cadastrar" no canto inferior direito para registrar o paciente no sistema.</p>
    </div>
    <div className="faq-section">
      <h2>Como realizar um atendimento?</h2>
      <p>Após ser cadastrado, os dados do paciente surgirão em um cartão na página principal, nele, são exibidos os dados do paciente e logo abaixo, os botões de ações <img src={buttonAction}/> </p>
      </div><div className="faq-section2">  
      <p>  Para realizar um atendimento, clique no botão <img src={buttonAttendance}/> Você será direcionado a um formulário que deve ser preenchido corretamente com os dados vitais e os sintomas do paciente e para enviar os sintomas, clique no botão com o texto "Finalizar Atendimento" </p>
      </div>
  
    <div className="faq-section3">
      <h2>Como visualizar o histórico de atendimentos de um paciente?</h2>
      <p>Após ser atendido, os valores do atendimento irão para uma tabela abaixo do botão para realizar atendimentos, onde, além dos dados vitais, exibirá o status do paciente</p>
      <p>Exemplo:</p><p> <img src={table}/> </p>
    </div>
    <p>Se você tiver alguma outra pergunta ou precisar de assistência adicional, não hesite em entrar em contato com nossa equipe de suporte.</p>
  </div>
  </div>
  );
}


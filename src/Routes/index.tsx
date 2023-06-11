import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homes from '../pages/HomePage'
import Atendimento from '../pages/AttendancePage'
import Help from '../components/Help/index'


export default function Rotas() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Homes/>}></Route>
                <Route path='/atendimento/:id' element={<Atendimento/>}></Route>
                <Route path='/help' element={<Help/>}></Route>
            </Routes>
        </Router>
    </div>
  )
}

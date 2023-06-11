import '../../componentStyle/Home.css';
import Logo from '../../assets/logo.svg';
import { TfiHelpAlt } from "react-icons/tfi";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';


function Header() {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Ajuda
    </Tooltip>
  );

  return (
    <div>
      <div className="header">
        <Link to="/">
          <img src={Logo}  />
        </Link>

        <OverlayTrigger
          placement="bottom"
          delay={{ show: 200, hide: 100 }}
          overlay={renderTooltip}
        >
          <Link to="/help">
            <a className="ajudar">
              {<TfiHelpAlt />}
            </a>
          </Link>
        </OverlayTrigger>
      </div>
    </div>
  );
}

export default Header;

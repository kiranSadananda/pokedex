import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const CloseBtn = () => (<Link to='/'><div className="float-right mt-5 h2"><FontAwesomeIcon icon={faHome}/></div></Link>)

export default CloseBtn;
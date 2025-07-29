import './LogoComponent.css'
import {Link} from "react-router-dom";

const LogoComponent = () => {
    return (
        <div className={'logo'}>
            <Link to={'/'}><h1>Watch Me</h1></Link>
        </div>
    );
};

export default LogoComponent;
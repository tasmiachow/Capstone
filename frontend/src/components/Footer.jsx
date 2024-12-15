import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/Footer.css';
import { Link} from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="footer">
        <aside>
        <img src="/logo.png"  className="logo" alt='a logo of HandsToWords'/>
        <p className="footer-description">
            <br />A Capstone Project by Tasmia, Michael, Sami, Brianna, and Joseph
        </p>
        <p className='footer-copyright'>Copyright © {new Date().getFullYear()} - All rights reserved</p>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        </aside>
        <nav>
        <div className="footer-icons">
            <a
            href="https://github.com/tasmiachow/Capstone"
            target="_blank"
            rel="noopener noreferrer"
            className="tooltip"
            data-tip="View Repository"
            >
            <GitHubIcon fontSize='large'></GitHubIcon>
            </a>
        </div>
        </nav>
        </footer>

    )
}
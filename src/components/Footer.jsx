import { Link } from 'react-router-dom';

export default function Footer() {
    // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="section-padding">
            <div className="container footer-grid">
                <div className="call-to-action">
                    <p className="cta-text">Are you ready to explore?</p> 
                    <Link to="/adventures" className="button button-primary">Start Your Adventure</Link>
                </div>
                <div className="newsletter">
                    <p className="cta-text">Thank you for stopping by BitSized</p>
                    <p>To keep up with us feel free to</p>
                    <Link to="#" className="button button-secondary">Subscribe to Newsletter</Link>
                </div>
                <div className="social-tags">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                </div>
            </div>
            <div className="footer-bottom container">
                <button className="back-to-top" onClick={scrollToTop}>
                    Top <i className="fas fa-arrow-up"></i>
                </button>
                <p className="copyright">© 2025 Bitsized. All rights reserved.</p>
            </div>
        </footer>
    );
}
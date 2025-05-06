
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTwitter, 
  faLinkedin, 
  faFacebook, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';

export function Footer() {
  return (
    <footer className="bg-gitflash-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="bg-white text-gitflash-primary p-1 rounded">GF</span>
              GitFlash
            </div>
            <p className="text-gray-300 mb-4">
              Der Talent-Marktplatz für die Baubranche und akademische Fachkräfte.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Für Talente</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Wie es funktioniert</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Interviews erkunden</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Jobs finden</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Erfolgsgeschichten</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Für Unternehmen</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Talente finden</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">KI-Interviews erstellen</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Preise & Pakete</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Unternehmensportal</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Über uns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kontakt</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">AGB</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Impressum</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} GitFlash. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}

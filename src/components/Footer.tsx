
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-purple text-white py-12 mt-auto">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ProductWhisperer</h3>
            <p className="text-gray-300 text-sm">
              Your solution for sourcing products from Amazon and Alibaba with automatic pricing adjustments.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Seller Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/import" className="text-gray-300 hover:text-white transition-colors">Import Products</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Seller Dashboard</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing Strategy</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Email: support@productwhisperer.com</li>
              <li className="text-gray-300">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-300">Hours: Mon-Fri 9am-5pm EST</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {currentYear} ProductWhisperer. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

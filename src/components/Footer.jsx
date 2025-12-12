import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
       
          <Link 
            to="/" 
            className="text-xl font-bold text-[#1B3C73] flex items-center gap-2"
          >
            <img src="/logo.png" className="w-7" />
            SCHOLARSTREAM
          </Link>

          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} ScholarStream — All rights reserved.
          </p>

          <div className="flex gap-4 text-gray-600">
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

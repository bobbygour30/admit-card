import { Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <div className="flex items-center mb-2">
              <Mail className="w-4 h-4 mr-2" />
              <span>writetogsgspl@gmail.com</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone className="w-4 h-4 mr-2" />
              <span>01169270767</span>
            </div>
            <div className="flex items-center mr-10">
              <MapPin className="w-10 h-10 mr-2" />
              <span>
                Arpana Bank Colony Phase II, Ram Jaipal Road, Bailey Road
                Danapur, Patna Bihar India - 801503 , Landmark : Kashyap
                Apartment
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  Help Desk
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              Important Information
            </h3>
            <p className="text-sm">
              Please ensure all information provided is accurate. Any
              discrepancy may lead to cancellation of application. For technical
              support, contact our helpdesk.
            </p>
            <div className="mt-3">
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
              >
                Helpdesk
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Exam Portal. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

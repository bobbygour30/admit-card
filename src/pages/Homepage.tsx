
import { Link } from 'react-router-dom';
import { FileText, Upload, CreditCard, Download, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

const Homepage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Computer Based Test (CBT) - 2024</h1>
          <p className="text-xl mb-6">Generate your admit card by completing the registration process</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-800 hover:bg-blue-100 px-6 py-3 rounded-md font-semibold transition-colors duration-200 text-center"
            >
              Register Now
            </Link>
            <Link 
              to="/admit-card" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200 text-center"
            >
              Download Admit Card
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Registration Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProcessCard 
            icon={<FileText className="w-10 h-10 text-blue-600" />}
            title="Step 1: Fill Details"
            description="Complete the registration form with your personal information"
          />
          <ProcessCard 
            icon={<Upload className="w-10 h-10 text-blue-600" />}
            title="Step 2: Upload Documents"
            description="Upload your photo, signature and required documents"
          />
          <ProcessCard 
            icon={<CreditCard className="w-10 h-10 text-blue-600" />}
            title="Step 3: Make Payment"
            description="Pay the registration fee and verify your transaction"
          />
          <ProcessCard 
            icon={<Download className="w-10 h-10 text-blue-600" />}
            title="Step 4: Download Admit Card"
            description="Generate and download your exam admit card"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Important Dates</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateCard 
              icon={<Calendar className="w-5 h-5 text-blue-600" />}
              date="January 15, 2024"
              event="Registration Opens"
            />
            <DateCard 
              icon={<Calendar className="w-5 h-5 text-blue-600" />}
              date="February 28, 2024"
              event="Registration Closes"
            />
            <DateCard 
              icon={<Calendar className="w-5 h-5 text-blue-600" />}
              date="March 5, 2024"
              event="Admit Card Generation Begins"
            />
            <DateCard 
              icon={<Calendar className="w-5 h-5 text-red-600" />}
              date="March 15-30, 2024"
              event="Examination Period"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Important Instructions</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Instruction 
              icon={<AlertCircle className="w-5 h-5 text-red-600" />}
              text="Candidates must reach the examination center at least 1 hour before the exam starts."
            />
            <Instruction 
              icon={<AlertCircle className="w-5 h-5 text-red-600" />}
              text="Valid ID proof is mandatory for entry to the examination hall."
            />
            <Instruction 
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
              text="Ensure your photo and signature are clearly visible on the admit card."
            />
            <Instruction 
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
              text="Keep your admit card safe for future reference."
            />
            <Instruction 
              icon={<AlertCircle className="w-5 h-5 text-red-600" />}
              text="No electronic devices are allowed in the examination hall."
            />
            <Instruction 
              icon={<AlertCircle className="w-5 h-5 text-red-600" />}
              text="Late entry to the examination hall will not be permitted."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface ProcessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface DateCardProps {
  icon: React.ReactNode;
  date: string;
  event: string;
}

const DateCard: React.FC<DateCardProps> = ({ icon, date, event }) => {
  return (
    <div className="flex items-center p-3 border rounded-md">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="font-semibold text-gray-800">{event}</p>
        <p className="text-gray-600 text-sm">{date}</p>
      </div>
    </div>
  );
};

interface InstructionProps {
  icon: React.ReactNode;
  text: string;
}

const Instruction: React.FC<InstructionProps> = ({ icon, text }) => {
  return (
    <div className="flex items-start p-3 border rounded-md">
      <div className="mr-3 mt-0.5">{icon}</div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default Homepage;
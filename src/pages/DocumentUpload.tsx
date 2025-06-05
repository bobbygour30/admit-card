import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../contexts/RegistrationContext';
import { FilePlus, FileText, ChevronRight, AlertCircle } from 'lucide-react';

const DocumentUpload: React.FC = () => {
  const { updateDocuments, registrationData } = useRegistration();
  const navigate = useNavigate();
  
  const [idProof, setIdProof] = useState<string | null>(null);
  const [addressProof, setAddressProof] = useState<string | null>(null);
  const [idProofError, setIdProofError] = useState<string | null>(null);
  const [addressProofError, setAddressProofError] = useState<string | null>(null);
  
  // Redirect if no personal info
  if (!registrationData.personalInfo.name) {
    navigate('/register');
    return null;
  }
  
  const handleIdProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdProofError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 500KB)
    if (file.size > 500 * 1024) {
      setIdProofError('File size should not exceed 500KB');
      return;
    }
    
    // Check file type
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      setIdProofError('Only JPG, PNG and PDF formats are accepted');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setIdProof(result);
      updateDocuments('idProof', result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleAddressProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressProofError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 500KB)
    if (file.size > 500 * 1024) {
      setAddressProofError('File size should not exceed 500KB');
      return;
    }
    
    // Check file type
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      setAddressProofError('Only JPG, PNG and PDF formats are accepted');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAddressProof(result);
      updateDocuments('addressProof', result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate uploads
    if (!idProof) {
      setIdProofError('ID proof is required');
      return;
    }
    
    if (!addressProof) {
      setAddressProofError('Address proof is required');
      return;
    }
    
    // Navigate to payment verification
    navigate('/payment-verification');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FilePlus className="w-6 h-6 mr-2 text-blue-600" />
              Document Upload
            </h2>
            <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-md">
              Application No: {registrationData.applicationNumber}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Please upload clear, legible copies of your documents. Accepted formats are JPG, PNG, and PDF. Maximum file size is 500KB per document.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="border rounded-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  ID Proof (Any one of the following)
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Aadhar Card, PAN Card, Voter ID, Driving License, or Passport
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0 flex justify-center">
                    <div className="w-40 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      {idProof ? (
                        <div className="w-full h-full flex items-center justify-center">
                          {idProof.startsWith('data:image') ? (
                            <img src={idProof} alt="ID Proof" className="max-w-full max-h-full" />
                          ) : (
                            <FileText className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                      ) : (
                        <FileText className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer inline-block transition-colors duration-200">
                      <span>Choose ID Proof</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png, application/pdf"
                        onChange={handleIdProofUpload}
                      />
                    </label>
                    
                    {idProof && (
                      <p className="text-sm text-green-600 mt-2">
                        File uploaded successfully!
                      </p>
                    )}
                    
                    {idProofError && (
                      <p className="text-red-500 text-xs mt-2 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {idProofError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Address Proof (Any one of the following)
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Aadhar Card, Utility Bill, Bank Statement, or Passport
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0 flex justify-center">
                    <div className="w-40 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      {addressProof ? (
                        <div className="w-full h-full flex items-center justify-center">
                          {addressProof.startsWith('data:image') ? (
                            <img src={addressProof} alt="Address Proof" className="max-w-full max-h-full" />
                          ) : (
                            <FileText className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                      ) : (
                        <FileText className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer inline-block transition-colors duration-200">
                      <span>Choose Address Proof</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png, application/pdf"
                        onChange={handleAddressProofUpload}
                      />
                    </label>
                    
                    {addressProof && (
                      <p className="text-sm text-green-600 mt-2">
                        File uploaded successfully!
                      </p>
                    )}
                    
                    {addressProofError && (
                      <p className="text-red-500 text-xs mt-2 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {addressProofError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Back
              </button>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold flex items-center transition-colors duration-200"
              >
                Next: Payment Verification
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
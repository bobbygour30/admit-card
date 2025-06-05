import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../contexts/RegistrationContext';
import { useForm } from 'react-hook-form';
import { ChevronRight, User, FileText, Upload, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  email: string;
  mobile: string;
  address: string;
  aadhaarNumber: string;
  selectedPosts: string[];
  districtPreferences: string[];
}

const postOptions = [
  'State Manager (Sales and Marketing)',
  'District Manager (Agri Business Management)',
  'District Manager (Sales and Marketing)',
  'District Manager (Finance and Accountant)',
  'Assistant Manager',
  'Supervisor',
  'Support Staff',
  'Data Entry Operator',
  'Office Boy'
];

const districtOptions = [
  'Patna',
  'Vaishali',
  'Samasatipur',
  'Begusarai',
  'Nalanda',
  'Buxar',
  'Bhojpur'
];

const RegistrationForm: React.FC = () => {
  const { 
    updatePersonalInfo, 
    updatePhoto, 
    updateSignature, 
    allocateExamCenter, 
    generateApplicationNumber 
  } = useRegistration();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  
  const [photo, setPhoto] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [signatureError, setSignatureError] = useState<string | null>(null);
  const [isAllocating, setIsAllocating] = useState(false);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 200 * 1024) {
      setPhotoError('Photo size should not exceed 200KB');
      return;
    }
    
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setPhotoError('Only JPG and PNG formats are accepted');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhoto(result);
      updatePhoto(result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignatureError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 100 * 1024) {
      setSignatureError('Signature size should not exceed 100KB');
      return;
    }
    
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setSignatureError('Only JPG and PNG formats are accepted');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSignature(result);
      updateSignature(result);
    };
    reader.readAsDataURL(file);
  };
  
  const onSubmit = (data: FormData) => {
    if (!photo) {
      setPhotoError('Photo is required');
      return;
    }
    
    if (!signature) {
      setSignatureError('Signature is required');
      return;
    }
    
    updatePersonalInfo(data);
    
    setIsAllocating(true);
    setTimeout(() => {
      try {
        allocateExamCenter();
        generateApplicationNumber();
        setIsAllocating(false);
        navigate('/upload-documents');
      } catch (error) {
        console.error('Error allocating exam center:', error);
        setIsAllocating(false);
      }
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-600" />
            Registration Form
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b text-gray-700">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded-md ${errors.fatherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register('fatherName', { required: 'Father\'s name is required' })}
                  />
                  {errors.fatherName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fatherName.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded-md ${errors.motherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register('motherName', { required: 'Mother\'s name is required' })}
                  />
                  {errors.motherName && (
                    <p className="text-red-500 text-xs mt-1">{errors.motherName.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className={`w-full p-2 border rounded-md ${errors.dob ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register('dob', { required: 'Date of birth is required' })}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full p-2 border rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register('gender', { required: 'Gender is required' })}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { 
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded-md ${errors.mobile ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register('mobile', { 
                      required: 'Mobile number is required',
                      pattern: { 
                        value: /^[0-9]{10}$/,
                        message: 'Mobile number must be 10 digits'
                      }
                    })}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded-md ${errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register('aadhaarNumber', { 
                      required: 'Aadhaar number is required',
                      pattern: { 
                        value: /^[0-9]{12}$/,
                        message: 'Aadhaar number must be 12 digits'
                      }
                    })}
                  />
                  {errors.aadhaarNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.aadhaarNumber.message}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register('address', { required: 'Address is required' })}
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b text-gray-700">
                Post Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {postOptions.map((post) => (
                  <div key={post} className="flex items-center">
                    <input
                      type="checkbox"
                      id={post}
                      value={post}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      {...register('selectedPosts')}
                    />
                    <label htmlFor={post} className="ml-2 text-sm text-gray-700">
                      {post}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b text-gray-700">
                District Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {districtOptions.map((district) => (
                  <div key={district} className="flex items-center">
                    <input
                      type="checkbox"
                      id={district}
                      value={district}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      {...register('districtPreferences')}
                    />
                    <label htmlFor={district} className="ml-2 text-sm text-gray-700">
                      {district}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b text-gray-700">
                Photo & Signature Upload
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Photo <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    JPG/PNG format, max size 200KB, dimensions 3.5cm x 4.5cm
                  </p>
                  
                  <div className="mb-3 flex justify-center">
                    <div className="w-32 h-40 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      {photo ? (
                        <img src={photo} alt="Uploaded photo" className="max-w-full max-h-full" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer transition-colors duration-200">
                      <span>Choose Photo</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  </div>
                  
                  {photoError && (
                    <p className="text-red-500 text-xs mt-2 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {photoError}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Signature <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    JPG/PNG format, max size 100KB, dimensions 3.5cm x 1.5cm
                  </p>
                  
                  <div className="mb-3 flex justify-center">
                    <div className="w-32 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      {signature ? (
                        <img src={signature} alt="Uploaded signature" className="max-w-full max-h-full" />
                      ) : (
                        <FileText className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer transition-colors duration-200">
                      <span>Choose Signature</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png"
                        onChange={handleSignatureUpload}
                      />
                    </label>
                  </div>
                  
                  {signatureError && (
                    <p className="text-red-500 text-xs mt-2 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {signatureError}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isAllocating}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold flex items-center transition-colors duration-200 ${isAllocating ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isAllocating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Allocating Exam Center...
                  </>
                ) : (
                  <>
                    Next: Upload Documents
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
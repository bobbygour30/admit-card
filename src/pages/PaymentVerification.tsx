import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../contexts/RegistrationContext';
import { CreditCard, CheckCircle, AlertCircle, ChevronRight, X } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const PaymentVerification: React.FC = () => {
  const { updatePaymentStatus, registrationData } = useRegistration();
  const navigate = useNavigate();

  // Generate random QR code value once
  const [qrValue] = useState(
    `upi://pay?pa=examportal@ybl&pn=Exam Portal&tn=ExamFee-${Math.random()
      .toString(36)
      .substring(2, 10)}`
  );

  const [transactionNumber, setTransactionNumber] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [paymentMode, setPaymentMode] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Redirect if no application number
  if (!registrationData.applicationNumber) {
    navigate('/register');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate fields
    if (!transactionNumber.trim()) {
      setError('Transaction number is required');
      return;
    }

    if (!transactionDate.trim()) {
      setError('Transaction date is required');
      return;
    }

    // Simulate payment verification
    setIsSubmitting(true);
    setTimeout(() => {
      // Update payment status in context
      updatePaymentStatus(true, transactionNumber);
      setIsSubmitting(false);

      // Check if user selected Tirhut Union
      if (registrationData.personalInfo?.union === 'Tirhut Union') {
        setShowModal(true);
      } else {
        // For Harit Union or undefined union, navigate to admit card page
        navigate('/admit-card');
      }
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
              Payment Verification
            </h2>
            <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-md">
              Application No: {registrationData.applicationNumber}
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <div className="text-sm text-blue-600">
                    Your Registration and payment is completed. Your admit card will be available soon. Please complete the payment of ₹600 to proceed.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border rounded-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Amount:</p>
                  <p className="font-semibold">₹600.00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application Number:</p>
                  <p className="font-semibold">{registrationData.applicationNumber}</p>
                </div>
                  <div>
                    <p className="text-sm text-gray-600">Candidate Name:</p>
                    <p className="font-semibold">{registrationData.personalInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email:</p>
                    <p className="font-semibold">{registrationData.personalInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border rounded-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment Methods</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div
                    className="border rounded-md p-3 flex items-center cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                    onClick={() => setPaymentMode('upi')}
                  >
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMode"
                      value="upi"
                      checked={paymentMode === 'upi'}
                      onChange={() => setPaymentMode('upi')}
                      className="mr-2"
                    />
                    <label htmlFor="upi" className="cursor-pointer flex-grow">
                      <div className="font-medium">UPI Payment</div>
                      <div className="text-sm text-gray-600">Pay using any UPI app</div>
                    </label>
                  </div>

                  <div
                    className="border rounded-md p-3 flex items-center cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                    onClick={() => setPaymentMode('netbanking')}
                  >
                    <input
                      type="radio"
                      id="netbanking"
                      name="paymentMode"
                      value="netbanking"
                      checked={paymentMode === 'netbanking'}
                      onChange={() => setPaymentMode('netbanking')}
                      className="mr-2"
                    />
                    <label htmlFor="netbanking" className="cursor-pointer flex-grow">
                      <div className="font-medium">Net Banking</div>
                      <div className="text-sm text-gray-600">Pay using internet banking</div>
                    </label>
                  </div>

                  <div
                    className="border rounded-md p-3 flex items-center cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                    onClick={() => setPaymentMode('card')}
                  >
                    <input
                      type="radio"
                      id="card"
                      name="paymentMode"
                      value="card"
                      checked={paymentMode === 'card'}
                      onChange={() => setPaymentMode('card')}
                      className="mr-2"
                    />
                    <label htmlFor="card" className="cursor-pointer flex-grow">
                      <div className="font-medium">Debit/Credit Card</div>
                      <div className="text-sm text-gray-600">Pay using any bank card</div>
                    </label>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h4 className="font-semibold text-yellow-800 mb-2">How to make the payment:</h4>
                  <ol className="list-decimal list-inside text-sm text-yellow-800 space-y-1">
                    <li>Scan the QR code or use the UPI ID: examportal@ybl</li>
                    <li>Make a payment of ₹600.00</li>
                    <li>Note down the transaction number</li>
                    <li>Enter the transaction details below to verify your payment</li>
                  </ol>

                  <div className="mt-4 flex justify-center">
                    <div className="bg-white p-3 border rounded-md">
                      <div className="text-center text-xs mb-2 text-gray-600">Sample QR Code</div>
                      <div className="w-40 h-40 bg-white p-1 border border-gray-300 rounded-md">
                        <QRCodeCanvas value={qrValue} size={160} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Verify Your Payment</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Number / Reference ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={transactionNumber}
                    onChange={(e) => setTransactionNumber(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter transaction number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {error}
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => navigate('/upload-documents')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold flex items-center transition-colors duration-200 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying Payment...
                    </>
                  ) : (
                    <>
                      Next: Generate Admit Card
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Modal for Tirhut Union */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative transform transition-all animate-fadeIn sm:max-w-lg">
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-sm text-gray-600">
                  Your Registration and payment is completed. You will receive your admit card after 18th June 2025 through email.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default PaymentVerification;
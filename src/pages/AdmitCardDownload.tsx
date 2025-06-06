import { useRef, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useRegistration } from "../contexts/RegistrationContext";
import { FileText, Search, Download, Send, AlertCircle } from "lucide-react";
import { generatePDF } from "../utils/pdfGenerator";

const AdmitCardDownload: React.FC = () => {
  const { registrationData } = useRegistration();
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [foundApplication, setFoundApplication] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const admitCardRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    setError(null);

    if (!searchQuery.trim()) {
      setError("Please enter application number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        registrationData.applicationNumber &&
        searchQuery === registrationData.applicationNumber
      ) {
        setFoundApplication(true);
      } else {
        setError(
          "No application found with this number. Please check and try again."
        );
      }
      setLoading(false);
    }, 1000);
  };

  const handleDownload = () => {
    if (admitCardRef.current && registrationData.paymentStatus) {
      generatePDF(admitCardRef.current, registrationData);
    }
  };

  const handleSendEmail = () => {
    setSendingEmail(true);

    setTimeout(() => {
      setEmailSent(true);
      setSendingEmail(false);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {!foundApplication ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-600" />
              Download Admit Card
            </h2>

            <div className="mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Enter your application number to download your admit card.
                      If you have completed the registration and payment
                      process, your admit card will be available here.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Application Number"
                  className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center transition-colors duration-200 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
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
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {error}
                </p>
              )}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Help & Support
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you are facing issues downloading your admit card or have any
                other queries, please contact our support team:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <h4 className="font-medium text-gray-800 mb-1">
                    Email Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    support@examportal.com
                  </p>
                </div>
                <div className="border rounded-md p-3">
                  <h4 className="font-medium text-gray-800 mb-1">
                    Phone Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    +91 1234567890 (10 AM - 6 PM)
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Admit Card
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={handleDownload}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium flex items-center transition-colors duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  {!emailSent ? (
                    <button
                      onClick={handleSendEmail}
                      disabled={sendingEmail}
                      className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center transition-colors duration-200 ${
                        sendingEmail ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {sendingEmail ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Email Admit Card
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center">
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Email Sent!
                    </div>
                  )}
                </div>
              </div>

              <div
                ref={admitCardRef}
                className="border rounded-lg overflow-hidden"
                id="admit-card"
              >
                <div className="bg-gray-100 p-4 border-b">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="mr-4">
                        <img
                          src="/dav-logo.png"
                          alt="College Logo"
                          className="w-20 h-20"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          DAV College Managing Committee
                        </h3>
                        <p className="text-sm text-gray-600">
                          Chitra Gupta Road
                        </p>
                        <p className="text-sm text-gray-600">
                          New Delhi-110055
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        CBT Roll No.: {registrationData.applicationNumber}
                      </p>
                      <p className="text-sm text-gray-600">Admit Card for: Harit Union</p>
                      <p className="text-sm text-gray-600">
                        Aadhaar No.:{" "}
                        {registrationData.personalInfo.aadhaarNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold">
                      Admit Card for Computer Based Test (CBT): June 2025
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-4">

                    <div className="col-span-2">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex">
                          <div className="w-1/2 font-semibold">
                            Centre of CBT Exam
                          </div>
                          <div className="w-1/2">
                            :{" "}
                            {registrationData.examCenter ||
                              "DAV PUBLIC SCHOOL, RANCHI"}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 font-semibold">
                            Shift & Date of CBT exam
                          </div>
                          <div className="w-1/2">
                            :{" "}
                            {registrationData.examShift ||
                              "A (9:00 AM - 10:00 AM, 12-06-2025)"}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 font-semibold">
                            Time of gate-entry
                          </div>
                          <div className="w-1/2">
                            : 30 minutes before shift start time
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 font-semibold">
                            Candidate's Name
                          </div>
                          <div className="w-1/2">
                            : {registrationData.personalInfo.name}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 font-semibold">
                            Date of Birth
                          </div>
                          <div className="w-1/2">
                            : {formatDate(registrationData.personalInfo.dob)}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 font-semibold">Gender</div>
                          <div className="w-1/2">
                            :{" "}
                            {registrationData.personalInfo.gender?.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 font-semibold">
                            Father's/Husband's Name
                          </div>
                          <div className="w-1/2">
                            : {registrationData.personalInfo.fatherName}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 font-semibold">
                            Mother's Name
                          </div>
                          <div className="w-1/2">
                            : {registrationData.personalInfo.motherName}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 font-semibold">
                            Post Applied For
                          </div>
                          <div className="w-1/2">
                            :{" "}
                            {registrationData.personalInfo.selectedPosts?.join(
                              ", "
                            )}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/2 font-semibold">
                            District Preferences
                          </div>
                          <div className="w-1/2">
                            :{" "}
                            {registrationData.personalInfo.districtPreferences?.join(
                              ", "
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-1 flex flex-col items-center justify-start">
                      <div className="border h-40 w-32 mb-4 flex items-center justify-center">
                        {registrationData.photo ? (
                          <img
                            src={registrationData.photo}
                            alt="Candidate Photo"
                            className="max-h-full max-w-full"
                          />
                        ) : (
                          <div className="text-center text-gray-500 text-xs">
                            Candidate Photo
                          </div>
                        )}
                      </div>
                      <div className="border h-16 w-32 flex items-center justify-center">
                        {registrationData.signature ? (
                          <img
                            src={registrationData.signature}
                            alt="Candidate Signature"
                            className="max-h-full max-w-full"
                          />
                        ) : (
                          <div className="text-center text-gray-500 text-xs">
                            Candidate Signature
                          </div>
                        )}
                      </div>
                      <p className="text-xs mt-1 text-gray-600">
                        Signature of the Candidate
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-bold uppercase mb-3">
                      Important Instructions for Candidates:-
                    </h3>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>
                        The Admit Card is provisional, subject to verification
                        of particulars during document verification.
                      </li>
                      <li>
                        Candidates are advised to reach the CBT 2025 exam centre
                        at least 30 minutes before the exam starts, to avoid any
                        unexpected delays.
                      </li>
                      <li>
                        Candidates should report directly to the examination
                        hall/room, as per details mentioned on the Admit Card.
                      </li>
                      <li>
                        No candidate will be allowed entry to the exam lab after
                        commencement of Test.
                      </li>
                      <li>
                        No candidate will be allowed to carry any electronic
                        devices including mobile phones, bluetooth devices,
                        portable music players, calculators etc. inside the
                        examination hall.
                      </li>
                      <li>
                        Candidates are not allowed to carry any personal
                        belongings or prohibited items including electronic
                        devices, mobile phone, calculator etc. inside the
                        examination hall.
                      </li>
                    </ol>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <div>
                      <div className="h-16 border-b border-black w-40">
                        {registrationData.signature && (
                          <img
                            src={registrationData.signature}
                            alt="Candidate Signature"
                            className="h-16"
                          />
                        )}
                      </div>
                      <p className="text-sm mt-1">Signature of the candidate</p>
                    </div>
                    <div>
                      <div className="h-16 border-b border-black w-40"></div>
                      <p className="text-sm mt-1">
                        (To be signed in presence of the Invigilator)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

export default AdmitCardDownload;

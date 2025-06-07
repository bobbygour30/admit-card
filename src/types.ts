export interface PersonalInfo {
  union: string;
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

export interface RegistrationData {
  applicationNumber?: string;
  personalInfo: PersonalInfo;
  examCenter?: string;
  examShift?: string;
  photo?: string | null;
  signature?: string | null;
  paymentStatus?: boolean;
  transactionNumber?: string | null;
  documents?: {
    idProof: string | null;
    addressProof: string | null;
  };
}
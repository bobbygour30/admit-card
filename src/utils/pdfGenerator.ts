import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface RegistrationData {
  personalInfo: {
    union?: string; // Added union field
    name: string;
    fatherName: string;
    motherName: string;
    dob: string;
    gender: string;
    email: string;
    mobile: string;
    address: string;
    aadhaarNumber: string;
    selectedPosts?: string[];
    districtPreferences?: string[];
  };
  photo: string | null;
  signature: string | null;
  examCenter: string | null;
  examShift: string | null;
  applicationNumber: string | null;
  paymentStatus: boolean;
  transactionNumber: string | null;
  documents: {
    idProof: string | null;
    addressProof: string | null;
  };
}

export const generatePDF = async (element: HTMLElement, data: RegistrationData) => {
  try {
    // Send an email with the admit card
    sendAdmitCardEmail(data);
    
    // Generate PDF for download
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allow loading of images from other domains
      logging: false, // Disable logging
      allowTaint: true, // Allow tainted canvas if needed
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`admit_card_${data.applicationNumber}.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating the PDF. Please try again.');
  }
};

const sendAdmitCardEmail = (data: RegistrationData) => {
  // In a real application, you would use a service like EmailJS or an API call
  // to send an email with the admit card details
  console.log('Sending email with admit card to:', data.personalInfo.email);
  
  // This is a mock function that would normally call an email service
  // Example with union field included:
  /*
  emailjs.send('service_id', 'template_id', {
    to_email: data.personalInfo.email,
    to_name: data.personalInfo.name,
    application_number: data.applicationNumber,
    exam_center: data.examCenter,
    exam_date: '12/06/2025',
    exam_shift: data.examShift,
    union: data.personalInfo.union || 'Harit Union' // Include union in email
  });
  */
};
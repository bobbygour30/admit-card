import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface RegistrationData {
  personalInfo: {
    name: string;
    fatherName: string;
    motherName: string;
    dob: string;
    gender: string;
    email: string;
    mobile: string;
    address: string;
    aadhaarNumber?: string;
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

    // Use the A4-sized container for consistent PDF rendering
    const container = element.closest('.admit-card-container') || element;
    const canvas = await html2canvas(container, {
      scale: window.innerWidth < 768 ? 1 : 2, // Optimize for mobile performance
      useCORS: true,
      logging: false,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content exceeds A4 height
    while (heightLeft > 0) {
      pdf.addPage();
      position -= pageHeight;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`admit_card_${data.applicationNumber}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Ensure images are accessible and try again.');
  }
};

const sendAdmitCardEmail = (data: RegistrationData) => {
  console.log('Sending email with admit card to:', data.personalInfo.email);
  // Mock email service
};
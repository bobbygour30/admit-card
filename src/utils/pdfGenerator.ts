import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { RegistrationData } from '../types'; // Import shared type

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
  console.log('Sending email with admit card to:', data.personalInfo.email);
  
  // Mock function for email service
  /*
  emailjs.send('service_id', 'template_id', {
    to_email: data.personalInfo.email,
    to_name: data.personalInfo.name,
    application_number: data.applicationNumber,
    exam_center: data.examCenter,
    exam_date: '12/06/2025',
    exam_shift: data.examShift,
    union: data.personalInfo.union || 'Harit Union'
  });
  */
};
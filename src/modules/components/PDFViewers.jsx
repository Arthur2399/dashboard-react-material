import {  useState } from 'react';
import { PDFViewer, Document, Page } from '@react-pdf/renderer';

export const PDFViewers = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <PDFViewer width="100%" height={600}>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </PDFViewer>
    </div>
  );
};

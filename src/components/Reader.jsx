import React,{useState} from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import pdfDefaultFile from '../pdf/sample.pdf';

export default function Reader() {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');

    const [viewPdf, setViewPdf] = useState(pdfDefaultFile);


    const fileType = ['application/pdf'];
    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    setPdfFileError('');
                }
            }
            else {
                setPdfFile(null);
                setPdfFileError('Please select valid pdf file');
            }
        }
        else {
            console.log('select your file');
        }
    }

    const handlePdfFileSubmit = (e) => {
        e.preventDefault();
        if (pdfFile !== null) {
            setViewPdf(pdfFile);
        }
        else {
            setViewPdf(null);
        }
    }


  return (
    
      <div className='container'>
                                                           
          <form className='form-group' onSubmit={handlePdfFileSubmit}>

         <div id="file-drag">
          
                <input type="file" className='form-control'
                  required onChange={handlePdfFileChange}/>
              </div>

              {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
              <br></br>
              <button type="submit" className='btn btn-success btn-lg'>
                  UPLOAD
              </button>
          </form>
          <br></br>
         
          <div className='pdf-container'>
              {viewPdf && <>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                  <Viewer fileUrl={viewPdf}
                      plugins={[defaultLayoutPluginInstance]} />
              </Worker></>}
          </div>
      </div>

  )
}

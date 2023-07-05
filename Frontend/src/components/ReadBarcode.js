import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import {Html5QrcodeScanner} from "html5-qrcode";
import Scanner  from './Scanner'
import Quagga from 'quagga'
function BarcodeScanner() {
  const [scannerResult  , setScannerResult  ]= useState(null) 
  const onDetected = (res) => {
    setScannerResult(res)
  }
  const start = () => {

    Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
        },
        decoder : {
          readers : ["code_128_reader"]
        }
      }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
          Quagga.onDetected(setScannerResult)
      });

  }

  

  return (
    <div>
        <button onClick={start}></button>
        <Scanner onDetected={onDetected}/>
        <h1>QR CODE SCANNER </h1>
        {
            scannerResult ? <h2> {scannerResult} </h2>: <div></div>
        }
        
      
    </div>
  );
}

export default BarcodeScanner;
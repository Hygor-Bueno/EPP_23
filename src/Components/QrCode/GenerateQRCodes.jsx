import React, { useEffect, useState } from 'react';
import './GenerateQRCodes.css';
import Util from '../../Util/Util';

const OrderList = (props) => {
  const [list, setList] = useState([]);
  // const [size,setSize] = useState([[30,80]]);
  const size = [[60, 80]];
  const util = new Util();
  useEffect(() => {
    let newList = captureCode(props.orders);
    setList(newList);
    props.orders.length > 0 && generateQRCodes(newList);

    function captureCode(array) {
      let tempCode;
      let listCode = [];
      array.forEach(item => {
        if (tempCode !== item.eppIdOrder) {
          tempCode = item.eppIdOrder;
          listCode.push({
            eppIdOrder: item.eppIdOrder,
            nameClient: item.nameClient,
            deliveryStore: item.deliveryStore,
            deliveryDate: item.deliveryDate,
            deliveryHour: item.deliveryHour
          });
        }
      });
      return listCode;
    }
  }, [props]);

  const generateQRCodes = (orders) => {
    orders.forEach((order) => {
      const qrCodeData = order.eppIdOrder;
      const qrCodeSize = 113; // Tamanho do código QR em pixels
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeData}&size=${qrCodeSize}x${qrCodeSize}`;

      const qrCodeImg = new Image();
      qrCodeImg.src = qrCodeUrl;

      // Adicione a imagem ao DOM
      const container = document.getElementById(order.eppIdOrder);
      if (container) {
        container.appendChild(qrCodeImg);
      }
    });
  };
  function printQrcode() {
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
                  <html>
                    <head>
                        <title>Pedido QRCode</title>
                        <style>
                          body{
                            display:flex;
                            justify-content:center;
                            align-items:center;
                            margin:0px;
                            paddin:0px;
                          }
                          #divQRCodeContainer p {
                            
                          }
                          #divQRCodeSubCont{
                              display: flex;
                              flex-direction: column;
                              align-items:center;
                                                      
                            }
                            .QRCodeContainer{
                              background-color:#f9f9f9;                         
                              display: flex;
                              flex-direction: column;
                              justify-content:space-between;
                              align-items:center;
                              page-break-before: always;
                              
                              height: 100vh;
                              width: 100vw;
                              font-size: calc(1rem + 0.5vw); 
                          }
                            #divQRCodeSubCont>div {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                            }

                            #divQRCodeSubCont>div>div>h1,#divQRCodeSubCont>div>div>h2{
                              width: 50%;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                            }
                            #divQRCodeSubCont>div>div{
                                width: 100%;
                                align-items: center;
                                display: flex;
                                justify-content: center;
                            }
                          #divQRCodeSubHead{
                            font-size: calc(4rem + 0.5vw);
                            height:20%;
                          }
                          #divQRCodeSubBody img{
                            width: calc(20rem + 0.5vw)
                          }
                          #divQRCodeSubBody > div{
                                width: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                          }
                          #divQRCodeSubBody{
                            font-size: calc(4rem + 0.5vw);
                            height:80%;
                          }
                          button{
                            display:none;
                            background:black;
                          }
                        </style>
                  </head>
                  <body>
                    ${document.getElementById('divQRCodeSubCont').outerHTML}
                  </body>
                  </html>
        `);
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  }

  return (
    props.printQrcode &&
    <div id='divQRCodeContainer'>
      <div id='divQRCodeSubCont'>
        {list.map((order) => (
          <div key={order.eppIdOrder} className='QRCodeContainer form-control d-flex flex-column'>
            <div id='divQRCodeSubHead' className='d-flex justify-content-between'>

              <h2 className='w-50 d-flex align-items-center justify-content-center'>{order.deliveryHour && order.deliveryHour}</h2>
              <h1 className='w-50 d-flex align-items-center justify-content-center'>{order.nameClient.slice(0, 1)}</h1>
            </div>
            <div id='divQRCodeSubBody' className='d-flex flex-row'>
              <div className='w-50 d-flex flex-column justify-content-center'>
                <div><strong>Nº:</strong> {order.eppIdOrder}</div>
                <div>{order.nameClient && order.nameClient.slice(0, 15)}.</div>
                <div>{order.deliveryStore && util.storeNameForUser(order.deliveryStore)}</div>
                <div>{order.deliveryDate && util.convertDateBR(order.deliveryDate)}</div>
              </div>
              <div className='w-50 d-flex align-items-center justify-content-center' id={order.eppIdOrder}></div>
            </div>
          </div>
        ))}
      </div>
      <div className='d-flex'>
        <button className='btn btn-success mx-1' onClick={() => { printQrcode() }}>Imprimir</button>
        <button className='btn btn-danger mx-1' onClick={() => {
          props.setPrintQrcode(false);
        }}>Fechar</button>
      </div>
    </div>
  );
};

export default OrderList;

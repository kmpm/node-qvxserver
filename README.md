
node-qvxserver
==============

Reads json from lib/test_data.json and serves as a qvx file.


Instructions
------------

Server
* Clone repository
* npm install
* npm start

QlikView
* Edit Script
* Click "Web Files"
* Enter "http://localhost:8000/hello" as URL
* Click "Next"
* Click "Finish"



QlikVew / Qlik Sense Script
----------------------------
```
LOAD AddressNumber, 
     ItemNumber, 
     InvoiceDate, 
     PromisedDeliveryDate, 
     Date, 
     InvoiceNumber, 
     OrderNumber, 
     ItemDesc, 
     SalesQty, 
     OpenQty, 
     OpenOrder, 
     GrossSales, 
     Sales, 
     BackOrder, 
     Cost, 
     Margin, 
     SalesKey, 
     ofDaysLate, 
     ofDaystoShip
FROM
[http://localhost:8000/hello]
(qvx);
```

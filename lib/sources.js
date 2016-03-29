var qvx = require('qvx');
var DataTypes = qvx.DataTypes;
var es = require('event-stream');
var fs = require('fs');
var path = require('path');


exports.test = function (request, reply) {
  var fields = {
    'AddressNumber': {type: Number},
    'ItemNumber': {type: Number, field: 'signed', bytes: 8, decimals: 0},
    'InvoiceDate': {type: Date},
    'PromisedDeliveryDate': {type: Date}, //'2010-11-19T23:00:00.000Z',
    'Date': {type: Date}, //'2010-11-19T23:00:00.000Z',
    'InvoiceNumber': {type: Number},
    'OrderNumber': {type: Number},
    'ItemDesc': {type: String},
    'SalesQty': {type: Number, bytes: 8, field: 'signed', decimals: 0},
    'OpenQty': {type: Number, bytes: 8, field: 'signed', decimals: 0},
    'OpenOrder': {type: Number, field: 'signed', bytes: 8, decimals: 0},
    'GrossSales': {type: Number, field: 'signed', bytes: 8, decimals: 0},
    'Sales': {type: Number, field: 'signed', bytes: 8, decimals: 0},
    'BackOrder': {type: Number, field: 'signed', bytes: 8, decimals: 0},
    'Cost': {type: Number, field: 'bcd', extent: 'fix', decimals: 4, bytes: 18},
    'Margin': {type: Number, field: 'bcd', extent: 'fix', decimals: 4, bytes: 18},
    'SalesKey': {type: String},
    'ofDaysLate': {type: Number, field: 'signed', decimals: 0},
    'ofDaystoShip': {type: Number, field: 'signed', decimals: 0}
  };

  var schema = new qvx.Schema({
    tableName: 'test',
    recordFormat: 'object',
    fields: fields
  });

  var outbound = new qvx.Outbound(schema);
  var dataStream = fs.createReadStream(path.join(__dirname, 'test_data.json'))
  .pipe(es.split())
  .pipe(es.parse())
  .pipe(outbound);

  reply(dataStream)
  .type('application/octet-stream')
  .header('content-disposition', 'attachment; filename=test.qvx;');
};

var qvx = require('qvx');
var DataTypes = qvx.DataTypes;
var es = require('event-stream');
var fs = require('fs');
var path = require('path');


exports.test = function (request, reply) {
  var fields = {
    'AddressNumber': {type: DataTypes.FLOAT(8)},
    'ItemNumber': {type: DataTypes.BIGINT().DECIMALS(0)},
    'InvoiceDate': {type: DataTypes.TIMESTAMP('utf-8', 1)},
    'PromisedDeliveryDate': {type: DataTypes.TIMESTAMP}, //'2010-11-19T23:00:00.000Z',
    'Date': {type: DataTypes.TIMESTAMP}, //'2010-11-19T23:00:00.000Z',
    'InvoiceNumber': {type: DataTypes.FLOAT(8)},
    'OrderNumber': {type: DataTypes.FLOAT(8)},
    'ItemDesc': {type: DataTypes.STRING('utf-8', 4)},
    'SalesQty': {type: DataTypes.BIGINT().DECIMALS(0)},
    'OpenQty': {type: DataTypes.BIGINT().DECIMALS(0)},
    'OpenOrder': {type: DataTypes.BIGINT().DECIMALS(0)},
    'GrossSales': {type: DataTypes.BIGINT().DECIMALS(0)},
    'Sales': {type: DataTypes.BIGINT().DECIMALS(0)},
    'BackOrder': {type: DataTypes.BIGINT().DECIMALS(0)},
    'Cost': {type: DataTypes.BCD(18).DECIMALS(4)},
    'Margin': {type: DataTypes.BCD(18).DECIMALS(4)},
    'SalesKey': {type: DataTypes.STRING('utf-8', 4)},
    'ofDaysLate': {type: DataTypes.BIGINT().DECIMALS(0)},
    'ofDaystoShip': {type: DataTypes.BIGINT().DECIMALS(0)}
  };

  var schema = new qvx.Schema({
    createdAt: '2012-03-06 19:22:15',
    creator: false,
    tableName: 'test',
    recordFormat: 'object',
    fields: fields
  });

  var outbound = new qvx.Outbound(schema);


  var x = fs.createReadStream(path.join(__dirname, 'test_data.json'))
  .pipe(es.split())
  .pipe(es.parse())
  .pipe(outbound);
  // .pipe(join)


  reply(outbound)
  .type('application/octet-stream')
  .header('content-disposition', 'attachment; filename=test.qvx;');
};

//mssql-connection
const mssql = require('mssql');
const config = require('./config/config')

const logger = config.logger
//config gegevens voor de database
const dbConfig = config.dbConfig

function executeQuery(query, callback) {
  logger.info(query)
  var conn = new mssql.ConnectionPool(dbConfig);
  var req = new mssql.Request(conn);

  conn.connect((err) => {
    if (err) {
      logger.error('error', err);
      return;
    }

    req.query(query, (err, result) => {
      if (err) {
        logger.error('error', err);
        callback(err, null, null)
      } else

      //recordset.recordset is van toepassing op GET functies
      //recordset.rowsaffected is van toepassing op INSERT, UPDATE, DELETE functies
      if (result) {
        logger.info(result);
        callback(null, result)
      } 
      conn.close();
    })
  })

}

module.exports = {
  executeQuery
}

const tables = require('./tables')

module.exports = {
  tables,
  getTableOptions: tablename => tables[tablename].options
}
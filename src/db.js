//db
import nedb from 'nedb'
//const path = require('path')

let db = {};

db.templates = new nedb({
  filename: '../data/templates.db',
  autoload: true
});

db.components = new nedb({
  filename: '../data/components.db',
  autoload: true
});

export default db

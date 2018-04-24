//db
import nedb from 'nedb'
const electron = require('electron');
const app = electron.remote.app;
const userData = app.getAppPath('userData');

let db = {};

db.templates = new nedb({
  filename: userData+'/data/templates.db',
  autoload: true
});

db.components = new nedb({
  filename: userData+'/data/components.db',
  autoload: true
});

export default db

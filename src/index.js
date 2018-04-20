import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

/*
import db from './db'

var rec = {
  name: 'bigbounty',
  age: 16
};

db.insert(rec, function(err, newrec) { // Callback is optional
  // newrec is the newly inserted document, including its _id
  // newrec has no key called notToBeSaved since its value was undefined
});

db.find({
  name: 'bigbounty'
}, function(err, docs) {
  // docs is an array containing documents that have name as bigbounty
  // If no document is found, docs is equal to []
  console.info(docs)
});
*/

ReactDOM.render( < App / > , document.getElementById("root"));
registerServiceWorker();

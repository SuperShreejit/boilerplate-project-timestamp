// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", (req, res) => {
  const date = new Date()
  const unix = date.getTime()
  const utc = date.toUTCString()
  res.json({ unix, utc })
})

// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  const dateString = req.params.date
  const isDate = checkDate(dateString)
  if (!isDate) return res.json({ error: "Invalid Date" })

  let unix, utc
  const isUnixDate = checkUnixDate(dateString)
  if (isUnixDate) {
    const date = new Date(+dateString)
    unix = +dateString
    utc = date.toUTCString()
    res.json({ unix, utc })
  }
  else {
    const date = new Date(dateString)
    unix = date.getTime()
    utc = date.toUTCString()
    res.json({ unix, utc })
  }
});

const checkDate = (date) => {
  if (date.match(/^\D/g)) return false
  if (date.match(/\d+[-]\d*|\d*/g)) return true
  return false
}

const checkUnixDate = (date) => {
  if (date.match(/\d+[-]\d*/g)) return false
  if (date.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/gi)) return false
  return true
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', 7371);
app.use(cors());


var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_leeja6',
  password        : '7250',
  database        : 'cs340_leeja6'
});

module.exports.pool = pool;

app.get('/pets', function(req,res,next) {
  var selectQuery = 'SELECT petID, Pets.registrationDate, Pets.name, birthday, animal, breed, personality, adoptable, goal, Pets.shelterID, Shelters.name As shelterName FROM Pets LEFT JOIN Shelters ON Pets.shelterID = Shelters.shelterID';
  if (req.query['short'] == 'true') {
    selectQuery = 'SELECT petID, name FROM Pets';
  }
  pool.query(selectQuery, function(err, rows) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

app.post('/pets', function(req,res,next) {
  pool.query('INSERT INTO Pets (registrationDate, name, birthday, animal, breed, personality, adoptable, goal, shelterID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.registrationDate, req.body.name, req.body.birthday, req.body.animal, req.body.breed, req.body.personality, req.body.adoptable, req.body.goal, req.body.shelterID], function(err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send(String(result.insertId));
  });
});

app.get('/shelters', function(req,res,next) {
  var selectQuery = 'SELECT * FROM Shelters;';
  if (req.query['short'] == 'true') {
    selectQuery = 'SELECT name, shelterID FROM Shelters;';
  }
  pool.query(selectQuery, function(err, rows) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

app.post('/shelters', function(req,res,next) {
  pool.query('INSERT INTO Shelters (registrationDate, name, streetAddress, city, state, phoneNumber, fax, email, sponsorable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.registrationDate, req.body.name, req.body.streetAddress, req.body.city, req.body.state, req.body.phoneNumber, req.body.fax, req.body.email, req.body.sponsorable], function(err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send(String(result.insertId));
  });
});

app.get('/sponsors', function(req,res,next) {
  var selectQuery = 'SELECT * from Sponsors';
  if (req.query['short'] == 'true') {
    selectQuery = 'SELECT firstName, lastName, sponsorID from Sponsors';
  }
  pool.query(selectQuery, function(err, rows) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

app.get('/sponsors', function(req,res,next) {
  var selectQuery = 'SELECT * from Sponsors';
  if (req.query['short'] == 'true') {
    selectQuery = 'SELECT firstName, lastName, sponsorID from Sponsors';
  }
  pool.query(selectQuery, function(err, rows) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

app.delete('/sponsors', function(req,res,next) {
  pool.query('DELETE from Sponsors WHERE sponsorID=?', [req.query.sponsorID], function(err,result){
    if(err){
      next(err);
      return;
    }
    res.send("Deleted "+result.affectedRows+" row(s).")
    })
});

app.post('/sponsors', function(req,res,next) {
  pool.query('INSERT INTO Sponsors (firstName, lastName, anonymous) VALUES (?, ?, ?)', [req.body.firstName, req.body.lastName, req.body.anonymous], function(err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send(String(result.insertId));
  });
});

app.put('/sponsors', function(req,res,next) {
    pool.query("SELECT * FROM Sponsors WHERE sponsorID=?", [req.query.sponsorID], function(err, result){
      if(err){
        next(err);
        return;
      }
      if(result.length == 1){
        var curVals = result[0];
        console.log(req.body.anonymous);
        pool.query("UPDATE Sponsors SET firstName=?, lastName=?, anonymous=? WHERE sponsorID=? ",
          [req.body.firstName || curVals.firstName, req.body.lastName || curVals.lastName, req.body.anonymous || curVals.anonymous, req.query.sponsorID],
          function(err, result){
          if(err){
            next(err);
            return;
          }
          res.send(result);
        });
      }
    })
});

app.get('/shelterSponsorships', function(req,res,next) {
  var selectQuery = 'SELECT Sponsors.sponsorID, firstName, lastName, Shelters.shelterID, name, amount, beginDate, endDate from ShelterSponsorships LEFT JOIN Sponsors ON Sponsors.sponsorID = ShelterSponsorships.sponsorID LEFT JOIN Shelters ON Shelters.shelterID = ShelterSponsorships.shelterID';
  pool.query(selectQuery, function(err, rows) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

app.delete('/shelterSponsorships', function(req,res,next) {
  pool.query('DELETE from ShelterSponsorships WHERE sponsorID=? AND shelterID=?', [req.query.sponsorID, req.query.shelterID], function(err,result){
    if(err){
      next(err);
      return;
    }
    res.send("Deleted "+result.affectedRows+" row(s).")
    })
});

app.post('/shelterSponsorships', function(req,res,next) {
  var insertQuery ='INSERT INTO ShelterSponsorships (sponsorID, shelterID, amount, beginDate, endDate) VALUES (?, ?, ?, ?, ?)';
  pool.query(insertQuery, [req.body.sponsorID, req.body.shelterID, req.body.amount, req.body.beginDate, req.body.endDate], function(err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send(String(result.insertId));
  });
});

app.put('/shelterSponsorships', function(req,res,next) {
    pool.query("SELECT * FROM ShelterSponsorships WHERE sponsorID=? and shelterID=?", [req.query.sponsorID, req.query.shelterID], function(err, result){
      if(err){
        next(err);
        return;
      }
      if(result.length == 1){
        var curVals = result[0];
        pool.query("UPDATE ShelterSponsorships SET amount=?, beginDate=?, endDate=? WHERE sponsorID=? AND shelterID=? ",
          [req.body.amount || curVals.amount, req.body.beginDate || curVals.beginDate, req.body.endDate || curVals.endDate, req.query.sponsorID, req.query.shelterID],
          function(err, result){
          if(err){
            next(err);
            return;
          }
          res.send(result);
        });
      }
    })
});

app.get('/petSponsorships', function(req,res,next) {
  var selectQuery = 'SELECT Sponsors.sponsorID, firstName, lastName, Pets.petID, name, amount, beginDate, endDate from PetSponsorships LEFT JOIN Sponsors ON Sponsors.sponsorID = PetSponsorships.sponsorID LEFT JOIN Pets ON Pets.petID = PetSponsorships.petID';
  pool.query(selectQuery, function(err, rows) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

app.delete('/petSponsorships', function(req,res,next) {
  pool.query('DELETE from PetSponsorships WHERE sponsorID=? AND petID=?', [req.query.sponsorID, req.query.petID], function(err,result){
    if(err){
      next(err);
      return;
    }
    res.send("Deleted "+result.affectedRows+" row(s).")
    })
});

app.post('/petSponsorships', function(req,res,next) {
  var insertQuery ='INSERT INTO PetSponsorships (sponsorID, petID, amount, beginDate, endDate) VALUES (?, ?, ?, ?, ?)';
  pool.query(insertQuery, [req.body.sponsorID, req.body.petID, req.body.amount, req.body.beginDate, req.body.endDate], function(err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send(String(result.insertId));
  });
});

app.put('/petSponsorships', function(req,res,next) {
    pool.query("SELECT * FROM PetSponsorships WHERE sponsorID=? and petID=?", [req.query.sponsorID, req.query.petID], function(err, result){
      if(err){
        next(err);
        return;
      }
      if(result.length == 1){
        var curVals = result[0];
        pool.query("UPDATE PetSponsorships SET amount=?, beginDate=?, endDate=? WHERE sponsorID=? AND petID=? ",
          [req.body.amount || curVals.amount, req.body.beginDate || curVals.beginDate, req.body.endDate || curVals.endDate, req.query.sponsorID, req.query.petID],
          function(err, result){
          if(err){
            next(err);
            return;
          }
          res.send(result);
        });
      }
    })
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

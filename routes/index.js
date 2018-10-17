var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');

var third_party = require('../third_party');
var firebase = third_party.firebase;
var database = firebase.database();


function write_to_fights(uuid, value) {
  console.log(value);
  database.ref('fights/' + uuid).set(value);
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/fights/:uuid', function (req, res, next) {
  database.ref('fights/' + req.params.uuid).once('value').then(function (snapshot) {
    const database_value = snapshot.val();
    if (!database_value) {
      res.status(404).send('404');
    }
    const uuid = database_value.uuid;
    if (req.params.uuid !== uuid) {
      res.status(404).send('404');
    }
    res.render('index', {
      title: 'Express',
      'params': req.param,
      'uuid': uuid,
      'start': database_value.start,
      'name': database_value.name,
      'end': database_value.end,
      'now': new Date().getTime()
    });
  });
});


router.post('/fights/:uuid/stop', function (req, res, next) {
  console.log(req.params);
  database.ref('fights/' + req.params.uuid).once('value').then(function (snapshot) {
    const database_value = snapshot.val();
    var end = new Date();
    var start = database_value.start;
    var uuid = database_value.uuid;
    const value = {
      'end': end.getTime(),
      'start': start,
      'uuid': uuid,
      'name': database_value.name
    };
    write_to_fights(uuid, value);
    res.redirect('/fights/' + uuid);
  });
});

router.post('/fights', function (req, res, next) {
  const name = req.body.name;
  const date = new Date();
  const uuid = uuidv4();

  const path = 'fights/' + uuid;
  const value = {
    'start': date.getTime(),
    'uuid': uuid,
    'name': name,
    'end': null,
  };
  console.log(value);
  write_to_fights(uuid, value);
  res.redirect('/fights/' + uuid);

});

module.exports = router;

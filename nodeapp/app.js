
var express = require('express')
var app = express()
var pg = require('pg')
var Pool = require('pg').Pool;
app.use(express.static('public'))

app.get('/', function(req,res){
 res.sendFile(__dirname + '/index.html');
}); 



var cn = {
    host: '*your instance url*',
    port: 5432,
    database: 'spatialdb',
    user: '*username*',
    password: '*password*'
};

//pg.connect(cn, onConnect);
const pool = new Pool(cn);

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack);
});



//export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
  return pool.connect(callback);
};

app.get('/foo', (req, res) => {
    console.log(req.query)
    pool.query("SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json(lp) As properties FROM rail As lg INNER JOIN (SELECT objectid, tag FROM rail) As lp ON lg.objectid = lp.objectid  ) As f )  As fc;", function(err, res2) {
    if(err) {
    return console.error('error running query', err);
    }else{
      res.send(res2.rows)
    }
    
  
  });
});

app.post('/foo', (req, res) => {
    console.log(req.query)
    var action = "SELECT"
    pool.query("SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json(lp) As properties FROM rail As lg INNER JOIN (SELECT objectid, tag FROM rail) As lp ON lg.objectid = lp.objectid  ) As f )  As fc;", function(err, res2) {
    if(err) {
    return console.error('error running query', err);
    }else{
      res.send(res2.rows)
    }
  });
});
// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/api/users', function(req, res) {
    var action = req.body.action;
    var table = req.body.table;
    var qstring = req.body.qstring;

    if(action="dingus"){
      var sqlAction = "INSERT"
    }
    console.log(req)

    res.send(user_id + ' ' + token + ' ' + geo);
});



//shp2pgsql -s 4326 Maryland_Local_Transit__Charm_City_Circulator_Stops.shp bikedb.busStops | psql -h 34.209.200.70:5432 -d bikedb -U nromano


app.listen(3000, function () {
  console.log('app listening on port 3000!')
})
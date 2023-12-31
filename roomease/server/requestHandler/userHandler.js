var userModel = require('../model/userModel.js');
var dwellingModel = require('../model/dwellingModel.js');
var responseHandler = require('./responseHandler.js');

// This file is responsible for managing all user-related endpoints

module.exports = {
  getRoomies : function(req, res){
    // Called by the GET '/users' endpoint.
    // Retrieves all the roommates from a common dwelling ID.
    // The req.user object is populated through Facebook OAuth
    var dwellingId = req.user.dwelling_id;
    // The convention is to call corresponding model function,
    // and then to handle the response with the responseHandler function
    // which is defined in responseHandler.js 
    userModel.getByDwellingId(dwellingId, function(err, results){
      responseHandler(err, results, res);
    });
  },

  joinDwelling : function(req, res){
    // Called by the POST 'joinDwelling' endpoint.
    // Makes a user join a dwelling

    var submittedDwellingId = req.body.dwellingId;
    var submittedPin = req.body.pin;
    //authenticate dwelling with PIN number
    dwellingModel.getPinByDwellingId(submittedDwellingId, function (err, pin){
      if (!pin) {
        res.send({joined : false, reason : "Invalid dwelling id"});
        return;
      } else if (pin === +submittedPin) {
        userModel.updateDwellingId(req.user.id, submittedDwellingId, function(){
          if (err) {res.send(err)}
          res.send({joined : true});
        })
      } else {
        console.log("pin mismatch", pin, +submittedPin);
        res.send({joined : false, reason : "Invalid PIN"});
        return;
      }
    })
  },
}
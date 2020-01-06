var friends = require("../app/data/friends");

//console.log(friends)
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function(req, res) {
        //console.log(req.body);
        var newSurvey = req.body;

        var BestMatch = {
            name: "",
            photo: "",
            dif: 51
        };

        for (var i = 0; i < friends.length; i++) {
            var dif = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                dif += Math.abs(parseInt(newSurvey.scores[j] - friends[i].scores[j]))
            }
            if (dif < BestMatch.dif) {
                BestMatch.name = friends[i].name;
                BestMatch.photo = friends[i].photo;
                BestMatch.dif = dif;
            }
            console.log(friends[i].name, dif);
        };
        friends.push(newSurvey);
        res.json(BestMatch);
        console.log(BestMatch);

    });
};
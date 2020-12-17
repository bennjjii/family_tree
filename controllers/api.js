const models = require("../models");

exports.get_home = function (req, res) {
    res.render('index', { title: 'Express' });
}

exports.get_peeps = function (req, res) {
    return models.family_member.findAll()
        .then((familymembers) => {
            console.log(familymembers);
            res.json(familymembers);
        })
}
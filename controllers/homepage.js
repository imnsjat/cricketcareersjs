const path = require('path');
const  fs = require('fs');
const Player = require('../models/player');
const { Sequelize, Op } = require('sequelize');
exports.home = (req,res,next)=>{
    res.sendFile(path.join(__dirname,  '../index.html'));
}
exports.edit = (req,res,next)=>{
    res.sendFile(path.join(__dirname,  '../edit.html'));
}
exports.editplayer = (req,res,next)=>{
    
    const playerName = req.params.name;
    // console.log(playerName)
    res.sendFile(path.join(__dirname, `../edit_${playerName}.html`));
}
exports.playerinfo = (req,res,next)=>{
    
    const playerName = req.params.name;
    // console.log(playerName)
    res.sendFile(path.join(__dirname, `../playerinfo_${playerName}.html`));
}


exports.addPlayer = (req, res, next) => {
    const { name, age, photoUrl, birthPlace, description, matches, runs, fifties, centuries, wickets, average } = req.body;
    
    Player.findAll({ where: {name: name} })
        .then(players => {
            // console.log(player[0])
            if (players[0]) {
                const player = players[0];
                player.age = age;
                player.photourl = photoUrl;
                player.birthplace = birthPlace;
                player.description = description;
                player.matches = matches;
                player.runs = runs;
                player.fifties = fifties;
                player.centuries = centuries;
                player.wickets = wickets;
                player.average = average;
                player.save().then(() => res.redirect('/'))
                    .catch(err => console.log(err));
                } else {
                    Player.create({ name: name , age : age , photourl: photoUrl , birthplace : birthPlace , description :description,
                        matches : matches , runs: runs , fifties : fifties , centuries : centuries , wickets : wickets , average : average  })
                    .then(() => res.redirect('/'))
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }
exports.search = (req, res, next) => {
    const query = '%' + req.query.query.trim().toLowerCase() + '%';
    Player.findAll({where : {name : { [Op.like]: query}}})
    .then(players => {
        if (players[0]) {
            const player = players[0].dataValues;
            // console.log(player);
            let template = fs.readFileSync(path.join(__dirname, '../playersinfo_template.html'), 'utf8');
            let updatedHtml = template.replace(/{{name}}/g, player.name)
                                  .replace(/{{age}}/g, player.age)
                                  .replace(/{{photoUrl}}/g, player.photourl)
                                  .replace(/{{birthplace}}/g, player.birthplace)
                                  .replace(/{{matches}}/g, player.matches)
                                  .replace(/{{runs}}/g, player.runs)
                                  .replace(/{{fifties}}/g, player.fifties)
                                  .replace(/{{centuries}}/g, player.centuries)
                                  .replace(/{{wickets}}/g, player.wickets)
                                  .replace(/{{average}}/g, player.average)
                                  .replace(/{{description}}/g, player.description)

            const playername = player.name.trim().replace(/\s/g, '_').toLowerCase();
            fs.writeFileSync(path.join(__dirname, `../playerinfo_${playername}.html`), updatedHtml, 'utf8');

            res.redirect(`/playerinfo_${playername}`);
        } else {
            console.log('No player found with that name');
            res.redirect('/');
        }
    })
    .catch(err => console.log(err));
}
exports.edit = (req, res, next) => {
    const query = '%' + req.query.query.trim().toLowerCase() + '%';
    Player.findAll({where : {name : { [Op.like]: query}}})
    .then(players => {
        if (players[0]) {
            const player = players[0].dataValues;
            // console.log(player);
            let template = fs.readFileSync(path.join(__dirname, '../edit.html'), 'utf8');
            let updatedHtml = template.replace(/{{name}}/g, player.name)
                                  .replace(/{{age}}/g, player.age)
                                  .replace(/{{photourl}}/g, player.photourl)
                                  .replace(/{{birthplace}}/g, player.birthplace)
                                  .replace(/{{matches}}/g, player.matches)
                                  .replace(/{{runs}}/g, player.runs)
                                  .replace(/{{fifties}}/g, player.fifties)
                                  .replace(/{{centuries}}/g, player.centuries)
                                  .replace(/{{wickets}}/g, player.wickets)
                                  .replace(/{{average}}/g, player.average)
                                  .replace(/{{description}}/g, player.description)

            
            const playername = player.name.trim().replace(/\s/g, '_').toLowerCase();
            fs.writeFileSync(path.join(__dirname, `../edit_${playername}.html`), updatedHtml, 'utf8');

            res.redirect(`/edit_${playername}`);
        } else {
            console.log('No player found with that name');
            res.redirect('/');
        }
    })
    .catch(err => console.log(err));
}
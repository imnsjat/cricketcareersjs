const path = require('path');
exports.home = (req,res,next)=>{
    res.sendFile(path.join(__dirname,  '../playerinfo.html'));
}
const express = require('express');
const routing = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const service = require("../service/service");
const create = require("../models/dbsetup");
const Comics = require("../models/comic");
const Features = require("../models/feature");
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,'uploads')
    },
    filename: (req,file,cb) =>{
        cb(null,file.originalname)
    }
});

var upload = multer({
    storage:storage
});

routing.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send({ message: data })
    }).catch((err) => {
        next(err)
    })
})

routing.post("/login", (req, res, next) => {
    let loginObj = req.body
    service.validateLogin(loginObj).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({resp})
        }
    }).catch((err) => {
        next(err)
    })
})

routing.post('/register/:token', (req, res, next) => {
    let registerObj = req.body;
    let token = req.params.token;
    service.getregister(registerObj).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Registered Successfully"})
        }
    }).catch((err) => {
        next(err)
    })
})

routing.put('/:username/submit', (req, res, next) => {
    let comicObj = new Comics(req.body);
    let userName = req.params.username
    service.updatecomics(comicObj,userName).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Created Successfully"})
        }
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getcomics/:username', (req, res, next) => {
    let username = req.params.username
    service.fetchcomics(username).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.put('/createchapter/:username/:title', (req, res, next) => {
    let chapter = req.body;
    let userName = req.params.username
    let title = req.params.title
    service.updatechapter(chapter,userName,title).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Created Successfully"})
        }
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getchapter/:username/:title', (req, res, next) => {
    let username = req.params.username
    let title = req.params.title
    service.fetchchapters(username,title).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.put('/storyoutline/:username/:title', (req, res, next) => {
    let story = req.body;
    let userName = req.params.username
    let title = req.params.title
    service.updatestory(story,userName,title).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Created Successfully"})
        }
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getstory/:username/:title', (req, res, next) => {
    let username = req.params.username
    let title = req.params.title
    service.fetchstory(username,title).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.put('/characterdesign/:username/:title', upload.single('avatar'),(req, res, next) => {
    let featuresObj =  new Features(req.body);
    let userName = req.params.username
    let title = req.params.title
    service.updatecharacters(featuresObj,userName,title).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Created Successfully"})
        }
    }).catch((err) => {
        next(err)
    })
})

 routing.put('/characterimage/:username/:title/:charactername', upload.single('profileimage'),(req, res, next) => {
    const image = req.file
    let userName  = req.params.username;
    let title = req.params.title
    let characterName = req.params.charactername;
    service.updatecharactersimage(image,userName,title,characterName).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Created Successfully"})
        }
    }).catch((err) => {
        next(err)
     })
 })

 routing.put('/avatarimage/:username/:title/:charactername', upload.single('avatar'),(req, res, next) => {
    const image = req.file
    let userName  = req.params.username;
    let title = req.params.title
    let characterName = req.params.charactername
    service.updateavatarimage(image,userName,title,characterName).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Created Successfully"})
        }
    }).catch((err) => {
        next(err)
     })
 })

 routing.put('/createepisode/:username/:title', (req, res, next) => {
    let episode = req.body;
    let chapter = req.params.username
    let title = req.params.title
    service.updateepisode(episode,chapter,title).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Created Successfully"})
        }
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getepisode/:chapter/:title', (req, res, next) => {
    let title = req.params.title
    let chapter = req.params.chapter
    service.fetchepisodes(title,chapter).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.post('/createscenes/:episode/:title/:chapter',(req, res, next) => {
    storyObj = req.body.Scenes;
    let title = req.params.title;
    let episode = req.params.episode;
    let chapter = req.params.chapter;
    service.updatescenestory(storyObj,title,episode,chapter).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Created Successfully"})
        }
    }).catch((err) => {
        next(err)
    })
})

routing.put('/submitoverview/:episode/:title/:chapter',(req, res, next) => {
    let title = req.params.title;
    let episode = req.params.episode;
    let chapter = req.params.chapter;
    let overview = req.body.episodeoverview;
    console.log(overview);
    service.updateoverview(overview,title,episode,chapter).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "updated successfully"})
        }
    }).catch((err) => {
        next(err)
     })
 })


routing.get('/getprofileimage/:title/:charactername' ,(req, res, next) =>{
    let title = req.params.title;
    let charactername = req.params.charactername
    service.getprofileimage(title,charactername).then((resp) =>{
        if(resp){
            for(i of resp){
                let UPLOAD_PATH = i.profileimage.path
                res.setHeader('Content-Type', 'image/jpeg');
                 fs.createReadStream(path.join(UPLOAD_PATH)).pipe(res);
            }
        }
    })
})

routing.get('/getavatarimage/:title/:charactername' ,(req, res, next) =>{
    let title = req.params.title;
    let charactername = req.params.charactername
    service.getavatarimage(title,charactername).then((resp) =>{
        if(resp){
            for(i of resp){
                if(i.avatarimage != null){
                    let UPLOAD_PATH = i.avatarimage.path
                    res.setHeader('Content-Type', 'image/jpeg');
                    fs.createReadStream(path.join(UPLOAD_PATH)).pipe(res);
                }

            }
        }
    })
})

routing.get('/getscenes/:episode/:title/:chapter', (req, res, next) => {
    let episode = req.params.episode
    let title = req.params.title
    let chapter = req.params.chapter
    service.getscenes(title,episode,chapter).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.post('/updatesceneimage/:episode/:scene/:title/:chapter', upload.single('sceneimage'),(req, res, next) => {
    const image = req.file
    let episode  = req.params.episode;
    let scene = req.params.scene
    let title = req.params.title
    let chapter = req.params.chapter
    service.updateSceneimage(image,title,scene,episode,chapter).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "Created Successfully"})
        }
    }).catch((err) => {
        next(err)
     })
 })

 routing.get('/getsceneimage/:title/:episode/:scene' ,(req, res, next) =>{
    let episode = req.params.episode
    let title = req.params.title
    let scene = req.params.scene
    service.getsceneimage(title,episode,scene).then((resp) =>{
        if(resp){
            for(i of resp){
                let UPLOAD_PATH = i.sceneimage.path
                res.setHeader('Content-Type', 'image/jpeg');
                fs.createReadStream(path.join(UPLOAD_PATH)).pipe(res);

            }
        }
    })
})


 routing.get('/getscenesimage/:episode/:title/:scene' ,(req, res, next) =>{
    let episode = req.params.episode
    let title = req.params.title
    let scene = req.params.scene
    service.getscenesimage(title,episode,scene).then((resp) =>{
        if(resp){
            for(i of resp){
                var UPLOAD_PATH = i.sceneimage.path
                res.setHeader('Content-Type', 'image/jpeg');
                fs.createReadStream(path.join(UPLOAD_PATH)).pipe(res);
            }
        }
    })
})

routing.get('/getscenesdata/:episode/:title', (req, res, next) => {
    let title = req.params.title
    let episode = req.params.episode
    service.fetchscenedata(title,episode).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getscenestory/:episode/:title/:chapter', (req, res, next) => {
    let title = req.params.title
    let episode = req.params.episode
    let chapter = req.params.chapter
    service.fetchscenestory(title,episode,chapter).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getepisodeview/:episode/:title/:chapter', (req, res, next) => {
    let title = req.params.title
    let episode = req.params.episode
    let chapter = req.params.chapter
    service.getepisodeview(title,episode,chapter).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getcharacterdetails/:username/:title', (req, res, next) => {
    let username = req.params.username
    let title = req.params.title
    service.getcharacterdetails(username,title).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getcharacterdisplaydetails/:username/:title/:charactername', (req, res, next) => {
    let username = req.params.username;
    let title = req.params.title;
    let charactername = req.params.charactername
    service.getcharacterdisplaydetails(username,title,charactername).then((resp) =>{
        if (resp) {
            res.status(200);
            res.json({resp})            
        }
    }).catch((err) => {
        next(err)
    })
})

routing.put('/updatetitle/:username/:oldtitle/:title',(req, res, next) => {
    let oldtitle = req.params.oldtitle
    let username = req.params.username;
    let newtitle = req.params.title;
    console.log(newtitle);
    service.updatetitle(newtitle, oldtitle, username).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "updated successfully"})
        }
    }).catch((err) => {
        next(err)
     })
 })

 routing.put('/updatechapterTitle/:username/:oldtitle/:chapter/:oldname',(req, res, next) => {
    let title = req.params.oldtitle
    let username = req.params.username;
    let chapter = req.params.chapter;
    let oldname = req.params.oldname;
    service.updateChaptertitle(chapter, title, username, oldname).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "updated successfully"})
        }
    }).catch((err) => {
        next(err)
     })
 })

 routing.put('/updateepisodeTitle/:oldname/:oldtitle/:episode/:chapter',(req, res, next) => {
    let title = req.params.oldtitle
    let oldname = req.params.oldname;
    let episode = req.params.episode;
    let chapter = req.params.chapter
    service.updateEpisodetitle(episode, title, oldname, chapter).then((resp) => {
        if (resp) {
            res.status(200)
            res.json({message : "updated successfully"})
        }
    }).catch((err) => {
        next(err)
     })
 })

routing.get('/getprofile/:title/:name' ,(req, res, next) =>{
    let title = req.params.title;
    let name = req.params.name
    service.getprofile(title, name).then((resp) =>{
        if(resp){
            console.log(resp)
            for(i of resp){
                let UPLOAD_PATH = i.profileimage.path
                res.setHeader('Content-Type', 'image/jpeg');
                 fs.createReadStream(path.join(UPLOAD_PATH)).pipe(res);
            }
        }
    })
})

routing.get('/characternames/:title' ,(req, res, next) =>{
    let title = req.params.title;
    service.getcharacternames(title).then((resp) =>{
        if(resp){
            console.log(resp)
            res.json({resp}) 
        }
    })
})

routing.delete('/deletetitle/:username/:title', (req, res, next) => {
    let username = req.params.username;
    let title = req.params.title;
    service.deleteTitle(username, title).then((resp) => {
        if(resp) {
            res.json({resp})
        }
    })
})

routing.delete('/deletechapter/:title/:chapter', (req, res, next) => {
    let title = req.params.title;
    let chapter = req.params.chapter;
    service.deleteChapter(title, chapter).then((resp) => {
        if(resp) {
            res.json({resp})
        }
    })
})

routing.delete('/deleteepisode/:title/:episode', (req, res, next) => {
    let title = req.params.title;
    let episode = req.params.episode;
    service.deleteEpisode(title, episode).then((resp) => {
        if(resp) {
            res.json({resp})
        }
    })
})

module.exports = routing;
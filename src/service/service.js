const dbLayer = require("../models/model")

let service = {}

service.validateLogin = (loginObj) => {
    return dbLayer.getUser(loginObj).then((response) => {
        if (!response) {
            let err = new Error("User does not exist")
            err.status = 401
            throw err
        }
        else {
            return response
        }
    })
}

service.getregister = (registerObj) => {
    return dbLayer.getregister(registerObj).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot register")
            err.status = 404
            throw err
        }
    })
}

service.updatecomics = (comicObj,userName) => {
    return dbLayer.updatecomics(comicObj,userName).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.fetchcomics =(username) =>{
    return dbLayer.fetchcomics(username).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Not Found")
            err.status = 404
            throw err
        }
    })
}

service.updatechapter = (chapter,userName,title) => {
    return dbLayer.updatechapter(chapter,userName,title).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.fetchchapters =(username,title) =>{
    return dbLayer.fetchchapters(username,title).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Not Found")
            err.status = 404
            throw err
        }
    })
}

service.updatestory = (story,userName,title) => {
    return dbLayer.updatestory(story,userName,title).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.fetchstory =(username,title) =>{
    return dbLayer.fetchstory(username,title).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Empty")
            err.status = 404
            throw err
        }
    })
}

service.updatecharacters = (featuresObj,userName,title) => {
    return dbLayer.updatecharacters(featuresObj,userName,title).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.updatecharactersimage = (imageObj,userName,title,characterName) => {
    return dbLayer.updatecharactersimage(imageObj,userName,title,characterName).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.updateavatarimage = (imageObj,userName,title,characterName) => {
    return dbLayer.updateavatarimage(imageObj,userName,title,characterName).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.updateepisode = (episode,chapter,title) => {
    return dbLayer.updateepisode(episode,chapter,title).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.fetchepisodes =(title,chapter) =>{
    return dbLayer.fetchepisodes(title,chapter).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Not Found")
            err.status = 404
            throw err
        }
    })
}

service.updatescenestory = (storyObj,title,episode,chapter) => {
    return dbLayer.updatescenestory(storyObj,title,episode,chapter).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.updateoverview = (overview,title,episode,chapter) => {
    return dbLayer.updateoverview(overview,title,episode,chapter).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.getprofileimage = (title,charactername) =>{
    return dbLayer.getprofileimage(title,charactername).then((data) =>{
        if (data){
            return data
        }
        else { 
            let err = new Error("Cannot Find")
            err.status = 404
            throw err
        }
    })
}

service.getavatarimage = (title,charactername) =>{
    return dbLayer.getavatarimage(title,charactername).then((data) =>{
        if (data){
            return data
        }
        else { 
            let err = new Error("Cannot Find")
            err.status = 404
            throw err
        }
    })
}

service.getscenes =(title,episode,chapter) =>{
    return dbLayer.getscenes(title,episode,chapter).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Not Found")
            err.status = 404
            throw err
        }
    })
}

service.updateSceneimage = (image,title,scene,episode,chapter) => {
    return dbLayer.updateSceneimage(image,title,scene,episode,chapter).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot Create")
            err.status = 404
            throw err
        }
    })
}

service.getsceneimage = (title,episode,scene) =>{
    return dbLayer.getsceneimage(title,episode,scene).then((data) =>{
        if (data){
            return data
        }
        else { 
            let err = new Error("Cannot Find")
            err.status = 404
            throw err
        }
    })
}


service.getscenesimage = (title,episode,scene) =>{
    return dbLayer.getscenesimage(title,episode,scene).then((data) =>{
        if (data){
            return data
        }
        else { 
            let err = new Error("Cannot Find")
            err.status = 404
            throw err
        }
    })
}

service.fetchscenedata =(title,episode) =>{
    return dbLayer.fetchscenedata(title,episode).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Not Found")
            err.status = 404
            throw err
        }
    })
}

service.fetchscenestory =(title,episode,chapter) =>{
    return dbLayer.fetchscenestory(title,episode,chapter).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Not Found")
            err.status = 404
            throw err
        }
    })
}

service.getepisodeview =(title,episode,chapter) =>{
    return dbLayer.getepisodeview(title,episode,chapter).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Not Found")
            err.status = 404
            throw err
        }
    })
}


service.getcharacterdetails =(username,title) =>{
    return dbLayer.getcharacterdetails(username,title).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Not Found")
            err.status = 404
            throw err
        }
    })
}

service.getcharacterdisplaydetails =(username,title,charactername) =>{
    return dbLayer.getcharacterdisplaydetails(username,title,charactername).then((data) =>{
        if (data) {
            return data
        } else {
            let err = new Error("Not Found")
            err.status = 404
            throw err
        }
    })
}

service.updatetitle = (newtitle, oldtitle, username) => {
    return dbLayer.updatetitle(newtitle, oldtitle, username).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot update")
            err.status = 404
            throw err
        }
    })
}

service.updateChaptertitle = (chapter, title, username, oldname) => {
    return dbLayer.updateChaptertitle(chapter, title, username, oldname).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot update")
            err.status = 404
            throw err
        }
    })
}

service.updateEpisodetitle = (episode, title, oldname, chapter) => {
    return dbLayer.updateEpisodetitle(episode, title, oldname, chapter).then((data) => {
        if (data) {
            return data
        } else {
            let err = new Error("Cannot update")
            err.status = 404
            throw err
        }
    })
}

service.getprofile = (title, name) =>{
    return dbLayer.getprofile(title, name).then((data) =>{
        if (data){
            return data
        }
        else { 
            let err = new Error("Cannot Find")
            err.status = 404
            throw err
        }
    })
}

service.getcharacternames = (title) =>{
    return dbLayer.getcharacternames(title).then((data) =>{
        if (data){
            return data
        }
        else { 
            let err = new Error("Cannot Find")
            err.status = 404
            throw err
        }
    })
}

service.deleteTitle = (username, title) => {
    return dbLayer.deleteTitle(username, title).then((data) => {
        if(data) {
            return data
        }
        else { 
            let err = new Error("Cannot Delete")
            err.status = 404
            throw err
        }
    })
}

service.deleteChapter = (title, chapter) => {
    return dbLayer.deleteChapter(title, chapter).then((data) => {
        if(data) {
            return data
        }
        else { 
            let err = new Error("Cannot Delete")
            err.status = 404
            throw err
        }
    })
}

service.deleteEpisode = (title, episode) => {
    return dbLayer.deleteEpisode(title, episode).then((data) => {
        if(data) {
            return data
        }
        else { 
            let err = new Error("Cannot Delete")
            err.status = 404
            throw err
        }
    })
}

module.exports = service
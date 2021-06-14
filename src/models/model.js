const collection = require("../utilities/connection")

let model = {}


model.getUser = (data) => {
    return collection.getUserCollection().then((collection) => {
        return collection.findOne({ $and: [
            { username : data.username },
            { password : data.password }
          ] }, { _id: 0 })
            .then((data) => {
                return data
            })
    })
}

model.getregister = (registerObj) => {
    return collection.getUserCollection().then((collection) => {
        return collection.findOne({username:registerObj.username},{}).then((data) => {
            if(data){
                let err = new Error("User already exist")
                err.status = 404
                throw err
            }
            else{
                return collection.create(registerObj).then((data1) =>{
                    if (data1){
                        return true
                    }
                    else{
                        return false
                    }
                })
            }
        })

    })
}

model.generateId = () => {
    return collection.getComicCollection().then((collection) => {
        return collection.distinct("characterfeatures.cid").then((cid) => {
            newId = Math.max(...cid)
            return newId > 0 ? newId + 1 : 1001
        })
    })
}

model.updatecomics = (comicObj,username) => {
    return collection.getUserCollection().then((usercollection) => {
        return usercollection.updateOne({username : username},{$push: {comic : comicObj} },{ upsert : true }).then((data) => {
            if (data.nModified > 0){
                return collection.getComicCollection().then((comicollection) => {
                    return comicollection.insertMany({username : username,title : comicObj.title,genre : comicObj.genre,about : comicObj.about}).then((data1) =>{
                        if (data1){
                            return true
                        }
                        else{
                            return false
                        }
                    })
                })
            }
            else{
                return null
            }
        })
    })

}

model.fetchcomics = (username) => {
    return collection.getUserCollection().then((collection) => {
        return collection.findOne({ username : username }, { _id: 0 })
            .then((data) => {
                return data
            })
    })
}

model.updatechapter = (chapter,username,title) => {
    return collection.getComicCollection().then((comiccollection) => {
        return comiccollection.updateOne({$and: [
            { username : username },
            { title : title }
          ]},{$push:{chaptername : chapter.chaptername}},{ upsert : true }).then((data) => {
            if (data.nModified > 0){
                return collection.getChapterCollection().then((chaptercollection) =>{
                    return chaptercollection.insertMany({title : title, chaptername : chapter.chaptername}).then((data1) =>{
                        if (data1){
                            return true
                        }
                        else{
                            return false
                        }
                    })
                })
            }
            else{
                return null
            }
        })
    })
}

model.fetchchapters = (username,title) => {
    return collection.getComicCollection().then((collection) => {
        return collection.findOne({$and: [
            { "username" : username },
            { "title" : title }
          ]}, { _id: 0,"chaptername":1 })
            .then((data) => {
                return data
            })
    })
}

model.updatestory = (story, username, title) => {
    return collection.getComicCollection().then((comiccollection) => {
        return comiccollection.find({$and: [
            {"username": username},
            {"title": title}
        ]}).then((founddata) => {
            if(founddata) {
                return comiccollection.deleteMany({
                    $and: [
                        { username: username },
                        { title: title }
                    ]
                }, { $pull: { storyoutline: story.storyoutline } }).then((deletedata) => {
                    if (deletedata) {
                        return comiccollection.updateOne({
                            $and: [
                                { username: username },
                                { title: title }
                            ]
                        }, { $push: { storyoutline: story.storyoutline } }, { upsert: true }).then((data) => {
                            if (data.nModified > 0) {
                                return data
                            }
                            else {
                                return null
                            }
                        })
                    }
                })
            } else {
                return comiccollection.updateOne({
                    $and: [
                        { username: username },
                        { title: title }
                    ]
                }, { $push: { storyoutline: story.storyoutline } }, { upsert: true }).then((data) => {
                    if (data.nModified > 0) {
                        return data
                    }
                    else {
                        return null
                    }
                })
            }
        })
    })
}

model.fetchstory = (username,title) => {
    return collection.getComicCollection().then((collection) => {
        return collection.find({$and: [
            { username : username },
            { title : title }
          ]}, { _id: 0,storyoutline:1 })
            .then((data) => {
                return data
            })
    })
}

model.updatecharacters = (featuresObj,username,title) => {
    return model.generateId().then((cid) =>{
        featuresObj.cid = cid
        return collection.getComicCollection().then((comiccollection) => {
            return comiccollection.updateOne({$and: [
                { username : username },
                { title : title }
            ]},{$push:{characterfeatures : featuresObj}},{ upsert : true }).then((data) => {
                if (data){
                    return data
                }
                else{
                    return null
                }
            })
        })
    })
}


model.updatecharactersimage = (image,username,title,characterName) => {
    return collection.getImageCollection().then((imagecollection) => {
        return imagecollection.insertMany({profileimage:image,title:title,charactername:characterName,avatarimage:null}).then((data) => {
            if (data){
                return data
            }
            else{
                return null
            }
        })
    })
}

model.updateavatarimage = (image,username,title,characterName) => {
    return collection.getImageCollection().then((imagecollection) => {
        return imagecollection.insertMany({avatarimage:image,title:title,charactername:characterName, profileimage:null}).then((data) => {
            if (data){
                 return data
            }
            else{
                return null
            }
        })
    })
}

model.updateepisode = (episode,chapter,title) => {
    return collection.getChapterCollection().then((chaptercollection) => {
        return collection.getSceneCollection().then((scenecollection) =>{
            return chaptercollection.updateOne({$and: [
                { title : title },
                { chaptername : chapter }
            ]},{$push:{episode : episode.episode}},{ upsert : true }).then((data) => {
                return scenecollection.insertMany({title:title,episode:episode.episode,chapter:chapter}).then((s_data) =>{
                    if (data.nModified > 0){
                        return true
                    }
                    else{
                        return null
                    }
                })
            })
        })
    })
}

model.updateoverview = (overview, title, episode, chapter) => {
    return collection.getEpisodeoverviewCollection().then((episodecollection) => {
        return episodecollection.insertMany({ title: title, chaptername: chapter, episode: episode, episodeoverview: overview }).then((data) => {
            if (data) {
                return true
            }
            else {
                return null
            }
        })
    })
}

model.fetchepisodes = (title,chapter) => {
    return collection.getChapterCollection().then((collection) => {
        return collection.findOne({$and: [
            { title : title },
            { chaptername : chapter }
          ]}, { _id: 0,episode:1 })
            .then((data) => {
                return data
            })
    })
}



model.updatescenestory = (storyObj, title, episode, chapter) => {
    return collection.getEpisodeCollection().then((episodecollection) => {
        return episodecollection.find({
            $and: [
                { title: title },
                { chapter: chapter },
                { episode: episode }
            ]
        }, { _id: 0, scenes: 1 }).then((episodedata) => {
            console.log(episodedata.length);
            if (episodedata > 0) {
                console.log("hello de");
                return episodecollection.deleteMany({
                    $and: [
                        { title: title },
                        { chapter: chapter },
                        { episode: episode }
                    ]
                    }).then((deleteddata) => {
                    if (deleteddata.deletedCount > 0) {
                        return episodecollection.insertMany({ title: title, episode: episode, chapter: chapter, scenes: storyObj }).then((data) => {
                            if (data) {
                                return data
                            }
                            else {
                                return null
                            }
                        })

                    }
                })
            }
            else {
                console.log("hello");
                return episodecollection.insertMany({ title: title, episode: episode, chapter: chapter, scenes: storyObj }).then((data) => {
                    if (data) {
                        return data
                    }
                    else {
                        return null
                    }
                })
            }

        })
    })
}

model.getprofileimage = (title,charactername) => {
    return collection.getImageCollection().then((imagecollection) =>{
        return imagecollection.find({$and: [
            { title : title },
            { charactername : charactername }
          ]},{_id:0,"profileimage":1})
    })
}

model.getavatarimage = (title,charactername) => {
    return collection.getImageCollection().then((imagecollection) =>{
        return imagecollection.find({$and: [
            { title : title },
            { charactername : charactername }
          ]},{_id:0,"avatarimage":1})
    })
}

model.getscenes = (title,episode,chapter) => {
    return collection.getEpisodeCollection().then((collection) => {
        return collection.find({$and: [
            { title : title },
            { episode : episode },
            { chapter : chapter }
          ]}, { _id: 0,"scenes.scene":1 })
            .then((data) => {
                return data
            })
    })
}


model.updateSceneimage = (image,title,scene,episode,chapter) => {
    return collection.getSceneImageCollection().then((imagecollection) => {
        return collection.getSceneCollection().then((scenecollection) =>{
            return imagecollection.insertMany({title:title,episode:episode,chapter:chapter,scenes:scene,sceneimage:image}).then((data) => {
                return scenecollection.updateOne({$and: [
                    {title:title},
                    {episode:episode},
                    {chapter:chapter}
                ]},{$push:{"scenes.scene" : scene}},{ upsert : true }).then((s_data) =>{
                    if (data){
                        return data
                    }
                    else{
                        return null
                    }
                })
            })
        })
    })
}

model.getsceneimage = (title,episode,scene) => {
    return collection.getSceneImageCollection().then((imagecollection) =>{
        return imagecollection.find({$and: [
            { title : title },
            { episode : episode },
            { scenes : scene }
          ]},{_id:0,"sceneimage":1})
    })
}

model.getscenesimage = (title,episode,scene) => {
    return collection.getSceneImageCollection().then((imagecollection) =>{
        return imagecollection.find({$and: [
            { title : title },
            { episode : episode },
            { scenes : scene}
          ]},{_id:0,"sceneimage":1})
    })
}

model.fetchscenedata = (title,episode) => {
    return collection.getSceneCollection().then((collection) => {
        return collection.findOne({$and: [
            { title : title },
            { episode : episode }
          ]}, { _id: 0,scenes:1 })
            .then((data) => {
                return data
            })
    })
}

model.fetchscenestory = (title,episode,chapter) => {
    return collection.getEpisodeCollection().then((collection) => {
        return collection.findOne({$and: [
            { title : title },
            { episode : episode },
            { chapter : chapter }
          ]}, { _id: 0,scenes:1 })
            .then((data) => {
                return data
            })
    })
}

model.getepisodeview = (title,episode,chapter) => {
    return collection.getEpisodeoverviewCollection().then((epicollection) => {
        return epicollection.find({$and: [
            { title : title },
            { episode : episode },
            { chaptername : chapter }
          ]}, { _id: 0,episodeoverview:1 })
            .then((data) => {
                return data
            })
    })
}

model.getcharacterdetails = (username,title) => {
    return collection.getComicCollection().then((collection) => {
        return collection.findOne({$and: [
            { username : username },
            { title : title },
          ]}, { _id: 0,characterfeatures:1 })
            .then((data) => {
                return data
            })
    })
}

model.getcharacterdisplaydetails = (username,title,charactername) => {
    return collection.getComicCollection().then((collection) => {
        return collection.findOne({$and: [
            { username : username },
            { title : title },
            { "characterfeatures.name" : charactername}
          ]}, { _id: 0,characterfeatures:1 })
            .then((data) => {
                return data
            })
    })
}


model.getprofile = (title, name) => {
    return collection.getImageCollection().then((imagecollection) =>{
        return imagecollection.find(
            {$and: [
                { title : title },
                { charactername : name }
              ]},{_id:0,"profileimage":1})
    })
}

model.getcharacternames = (title) => {
    return collection.getImageCollection().then((imagecollection) =>{
        return imagecollection.find(
            { title : title },{_id:0,"charactername":1})
    })
}

model.updatetitle = (newtitle, oldtitle, username) => {
    console.log(newtitle, oldtitle, username);
    return collection.getUserCollection().then((comictitleCollection) => {
        return comictitleCollection.updateOne(
            {"username": username ,"comic.title": oldtitle}
                ,{$set:{"comic.$.title": newtitle}},{strict:false}).then((data) => {
            console.log(data)
            if (data.nModified > 0){
                return collection.getComicCollection().then((comiccollection1) => {
                    return comiccollection1.find({$and:[
                        {"username":username},
                        {"title":oldtitle}
                    ]}).then((data1) => {
                        if(data1) {
                            return collection.getComicCollection().then((comiccollection2) => {
                                return comiccollection2.updateOne(
                                    {"username":username, "title": oldtitle},{$set:{"title":newtitle}},{strict:false}
                                ).then((data3) => {
                                    if(data.nModified > 0) {
                                        return collection.getChapterCollection().then((comiccollection3) => {
                                            return comiccollection3.find({"username":username}).then((data4) => {
                                                if(data4) {
                                                    return collection.getChapterCollection().then((comiccollection4) => {
                                                        return comiccollection4.updateOne(
                                                            {"title": oldtitle},{$set:{"title":newtitle}},{strict:false}
                                                        ).then((data5) => {
                                                            if(data.nModified > 0) {
                                                                return collection.getImageCollection().then((comiccollection4) => {
                                                                    return comiccollection4.find({"username":username}).then((data5) => {
                                                                        if(data5) {
                                                                            return collection.getImageCollection().then((comiccollection5) => {
                                                                                return comiccollection5.updateOne(
                                                                                    {"title": oldtitle},{$set:{"title":newtitle}},{strict:false}
                                                                                ).then((data6) => {
                                                                                    if(data.nModified > 0) {
                                                                                        return collection.getEpisodeCollection().then((comiccollection5) => {
                                                                                            return comiccollection5.find({"username":username}).then((data6) => {
                                                                                                if(data6) {
                                                                                                    return collection.getEpisodeCollection().then((comiccollection6) => {
                                                                                                        return comiccollection6.updateOne(
                                                                                                            {"title": oldtitle},{$set:{"title":newtitle}},{strict:false}
                                                                                                        ).then((data7) => {
                                                                                                            if(data.nModified > 0) {
                                                                                                                return collection.getSceneCollection().then((comiccollection6) => {
                                                                                                                    return comiccollection6.find({"username":username}).then((data7) => {
                                                                                                                        if(data7) {
                                                                                                                            return collection.getSceneCollection().then((comiccollection7) => {
                                                                                                                                return comiccollection7.updateOne(
                                                                                                                                    {"title": oldtitle},{$set:{"title":newtitle}},{strict:false}
                                                                                                                                ).then((data8) => {
                                                                                                                                    if(data.nModified > 0) {
                                                                                                                                        return collection.getEpisodeoverviewCollection().then((comiccollection7) => {
                                                                                                                                            return comiccollection7.find({"username":username}).then((data8) => {
                                                                                                                                                if(data7) {
                                                                                                                                                    return collection.getEpisodeoverviewCollection().then((comiccollection8) => {
                                                                                                                                                        return comiccollection8.updateOne(
                                                                                                                                                            {"title": oldtitle},{$set:{"title":newtitle}},{strict:false}
                                                                                                                                                        ).then((data9) => {
                                                                                                                                                            if(data.nModified > 0) {
                                                                                                                                                                return data
                                                                                                                                                            }
                                                                                                                                                        })
                                                                                                                                                    })
                                                                                                                                                }
                                                                                                                                                else {
                                                                                                                                                    return data
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                        })  
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            })
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            return data
                                                                                                                        }
                                                                                                                    })
                                                                                                                })  
                                                                                                            }
                                                                                                        })
                                                                                                    })
                                                                                                }
                                                                                                else {
                                                                                                    return data
                                                                                                }
                                                                                            })
                                                                                        })
                                                                                    }
                                                                                })
                                                                            })
                                                                        }
                                                                        else {
                                                                            return data
                                                                        }
                                                                    })
                                                                })
                                                            }
                                                        })
                                                    })
                                                }
                                                else {
                                                    return data
                                                }
                                            })
                                        })
                                    }
                                })
                            })
                        }
                        else {
                            return data
                        }
                    })
                })
            }
            else{
                return null
            }
        })
    })
}

model.updateChaptertitle = (chapter, title, username, oldname) => {
    return collection.getComicCollection().then((comiccollection) => {
        return comiccollection.updateOne(
            { "title": title, "chaptername":  oldname },
            { $set: { "chaptername.$": chapter } }, { strict: false }).then((initialdata) => {
                if(initialdata.nModified > 0) {
                    return collection.getChapterCollection().then((chaptercollection) => {
                        return chaptercollection.updateOne(
                            { "title": title },
                            { $set: { "chaptername": chapter } }, { strict: false }).then((data) => {
                                console.log(data.nModified);
                                if (data.nModified > 0) {
                                    return collection.getEpisodeCollection().then((episodecollection) => {
                                        return episodecollection.updateMany(
                                            { "title": title },
                                            { $set: { "chapter": chapter } }, { strict: false }).then((data2) => {
                                                if (data2.nModified > 0) {
                                                    return collection.getSceneCollection().then((scenecollection) => {
                                                        return scenecollection.updateMany(
                                                            { "title": title },
                                                            { $set: { "chapter": chapter } }, { strict: false }).then((data3) => {
                                                                if (data3.nModified > 0) {
                                                                    return collection.getEpisodeoverviewCollection().then((overviewcollection) => {
                                                                        return overviewcollection.updateMany(
                                                                            { "title": title },
                                                                            { $set: { "chaptername": chapter } }, { strict: false }).then((data4) => {
                                                                                if (data4.nModified > 0) {
                                                                                    return collection.getImageCollection().then((imagecollection) => {
                                                                                        return imagecollection.updateMany(
                                                                                            { "title": title },
                                                                                            { $set: { "chaptername": chapter } }, { strict: false }).then((data1) => {
                                                                                                if (data1.nModified > 0) {
                                                                                                    return data
                                                                                                }
                                                                                                else {
                                                                                                    return data
                                                                                                }
                                                                                            })
                                                                                    })
                                                                                }
                                                                            })

                                                                    })
                                                                }
                                                                else {
                                                                    return data
                                                                }
                                                            })

                                                    })
                                                }
                                                else {
                                                    return data
                                                }
                                            })

                                    })


                                }
                                else {
                                    return data
                                }
                            })
                    })
            }
            else {
                return null
            }

        })
    })
}

model.updateEpisodetitle = (episode, title, oldname, chapter) => {
    return collection.getChapterCollection().then((chaptercollection) => {
        return chaptercollection.updateMany(
            { "title": title, "episode":  oldname},
            { $set: { "episode.$": episode } }, { strict: false }).then((data) => {
                if (data.nModified > 0) {
                    return collection.getEpisodeCollection().then((episodecollection) => {
                        return episodecollection.updateMany(
                            { "title": title },
                            { $set: { "episode": episode } }, { strict: false }).then((data2) => {
                                if (data2.nModified > 0) {
                                    return collection.getSceneCollection().then((scenecollection) => {
                                        return scenecollection.updateMany(
                                            { "title": title },
                                            { $set: { "episode": episode } }, { strict: false }).then((data3) => {
                                                if (data3.nModified > 0) {
                                                    return collection.getEpisodeoverviewCollection().then((overviewcollection) => {
                                                        return overviewcollection.updateMany(
                                                            { "title": title },
                                                            { $set: { "episode": episode } }, { strict: false }).then((data4) => {
                                                                if (data4.nModified > 0) {
                                                                    return data
                                                                }
                                                                else {
                                                                    return data
                                                                }
                                                            })
                                                        
                                                    })
                                                }
                                                else {
                                                    return data
                                                }
                                            })
                                        
                                    })
                                }
                                else {
                                    return data
                                }
                            })
                        
                    })
                }
                else {
                    return null
                }
            })
        
    })
}

model.deleteTitle = (username, title) => {
    return collection.getUserCollection().then((usercollection) => {
        return usercollection.updateMany({ "username": username }, { $pull: { comic: {"title": title }} }).then((data2) => {
            if (data2.nModified > 0) {
                return collection.getComicCollection().then((comiccollection) => {
                    return comiccollection.deleteOne({ "username": username, "title": title }).then((data3) => {
                        if (data3.deletedCount > 0) {
                            return collection.getChapterCollection().then((chaptercollection) => {
                                return chaptercollection.deleteOne({ "title": title }).then((data4) => {
                                    if (data4.deletedCount > 0) {
                                        return collection.getEpisodeCollection().then((episodecollection) => {
                                            return episodecollection.deleteOne({ "title": title }).then((data5) => {
                                                if (data5.deletedCount > 0) {
                                                    return collection.getSceneCollection().then((scenecollection) => {
                                                        return scenecollection.deleteOne({ "title": title }).then((data6) => {
                                                            if (data6.deletedCount > 0) {
                                                                return collection.getEpisodeCollection().then((overviewcollection) => {
                                                                    return overviewcollection.deleteOne({ "title": title }).then((data7) => {
                                                                        if (data7.deletedCount > 0) {
                                                                            return collection.getImageCollection().then((imagecollection) => {
                                                                                return imagecollection.deleteOne({ "title": title }).then((data8) => {
                                                                                    if (data8.deletedCount > 0) {
                                                                                        return data2
                                                                                    }
                                                                                    else {
                                                                                        return data2
                                                                                    }
                                                                                })
                                                                            })
                                                                        }
                                                                        else {
                                                                            return data2
                                                                        }
                                                                    })
                                                                })
                                                            }
                                                            else {
                                                                return data2
                                                            }
                                                        })
                                                    })
                                                }
                                                else {
                                                    return data2
                                                }
                                            })
                                        })
                                    }
                                    else {
                                        return data2
                                    }
                                })
                            })
                        }
                        else {
                            return data2
                        }
                    })
                })
            }
            else {
                return null
            }
        })
    })
}

model.deleteChapter = (title, chapter) => {
    return collection.getComicCollection().then((comiccollection) => {
        return comiccollection.updateMany({"title": title}, {$pull: {"chaptername": chapter}}).then((data) => {
            if(data.nModified > 0) {
                return collection.getChapterCollection().then((chaptercollection) => {
                    return chaptercollection.deleteOne({"title": title, "chaptername": chapter}).then((data1) => {
                        if(data1.deletedCount > 0) {
                            return collection.getEpisodeCollection().then((episodecollection) => {
                                return episodecollection.deleteOne({"title": title, "chapter": chapter}).then((data2) => {
                                    if(data2.deletedCount > 0) {
                                        return collection.getSceneCollection().then((scenecollection) => {
                                            return scenecollection.deleteOne({"title": title, "chapter": chapter}).then((data3) => {
                                                if(data3.deletedCount > 0) {
                                                    return collection.getEpisodeoverviewCollection().then((overviewcollection) => {
                                                        return overviewcollection.deleteOne({"title": title, "chaptername": chapter}).then((data4) => {
                                                            if(data4.deletedCount > 0) {
                                                                return data
                                                            }
                                                            else {
                                                                return data
                                                            }
                                                        })
                                                    })
                                                }
                                                else {
                                                    return data
                                                }
                                            })
                                        })
                                    }
                                    else {
                                        return data
                                    }
                                })
                            })
                        }
                        else {
                            return data
                        }
                    })
                })
            }
            else {
                return null
            }
        })
    })
}

model.deleteEpisode = (title, episode) => {
    return collection.getChapterCollection().then((chaptercollection) => {
        return chaptercollection.updateMany({"title": title}, {$pull: {"episode": episode}}).then((data) => {
            if(data.nModified > 0) {
                return collection.getEpisodeCollection().then((episodecollection) => {
                    return episodecollection.deleteOne({"title": title, "episode": episode}).then((data1) => {
                        if(data1.deletedCount > 0) {
                            return collection.getSceneCollection().then((scenecollection) => {
                                return scenecollection.deleteOne({"title": title, "episode": episode}).then((data2) => {
                                    if(data2.deletedCount > 0) {
                                        return collection.getEpisodeoverviewCollection().then((overviewcollection) => {
                                            return overviewcollection.deleteOne({"title": title, "episode": episode}).then((data3) => {
                                                if(data3.nModified > 0) {
                                                    return data
                                                }
                                                else {
                                                    return data
                                                }
                                            })
                                        })
                                    }
                                    else {
                                        return data
                                    }
                                })
                            })
                        }
                        else {
                            return data
                        }
                    })
                })
            }
            else {
                return null
            }
        })
    })
}


module.exports = model
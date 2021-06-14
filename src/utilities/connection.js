const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const { Schema } = require("mongoose");
mongoose.set('useCreateIndex', true)

const userSchema = Schema({
    "firstname": {
        type: String,
        required:true
    },
    "lastname": {
        type: String,
        required:true
    },
    "password": {
        type: String,
        required:true ,

    },
    "confirmpassword": {
        type: String,
        required: true
    },
    "username": {
        type: String,
        required: true
    },
    "emailid": {
        type: String,
        required: true
    },
    "DOB": {
        type: Date,
    },
    "phoneno": {
        type: Number,
    },
    "comic":{
        "title": {
            type: String,
        },
        "genre": {
            type: String,
        },
        "about": {
            type: String,
        }
    }
},{collection:"User"});

const comicSchema = Schema({
    "username": {
        type: String,
    },

    "title": {
        type: String,
    },
    "genre": {
        type: String,
    },
    "about": {
        type: String,
    },
    "storyoutline": {
        type: String,
    },
    "chaptername": {
        type : String
    },
    "characterfeatures":{
            "profileimage" : {},
            "avatarimage" : {},
            "name":{type:String},
            "age":{type:Number},
            "work":{type:String},
            "about":{type:String},
            "role":{type:String},
            "behaviour":{type:String},
            "likes":{type:String},
            "dislikes":{type:String},
            "eyecolor":{type:String},
            "haircolor":{type:String},
            "skintone":{type:String},
            "hairstyle":{type:String},
            "outfit":{type:String},
            "beard":{type:String},
            "height":{type:Number},
            "body":{type:String},
            "family":{type:String},
            "friends":{type:String}   
    },


},{collection:"Comic"});

const chapterSchema = Schema({
    "title": {
        type: String,
    },
    "chaptername": {
        type: String,
    },
    "content": {
        type: String,
    },
    "episode":{
        type : String
    },
},{collection:"Chapter"});

const imageSchema = Schema({
    "title": {
        type: String,
    },
    "charactername": {
        type : String
    },
    "profileimage":{
        
    },
    "avatarimage":{

    }
    
},{collection:"Image"});

const episodeSchema = Schema({
    "title" : {
        type : String
    },
    "episode" : {
        type : String
    }, 
    "chapter":{
        type : String
    },
    "scenes" : {
        type : Array
    }
},{collection : "Episode"})

const sceneimageSchema = Schema({
    "title" : {
        type : String
    },
    "episode" : {
        type : String
    },
    "chapter" : {
        type : String
    },
    "scenes" : {
        type : String
    },
    "sceneimage":{

    }
},{collection : "SceneImage"})

const sceneSchema = Schema({
    "title" : {
        type : String
    },
    "episode" : {
        type : String
    },
    "chapter" :{
        type : String
    },
    "scenes" : {
        "scene": {
            type : String
        }
    },
},{collection : "Scene"})

const EpisodeOverviewSchema = Schema({
    "title": {
        type: String,
    },
    "chaptername": {
        type: String,
    },
    "episode":{
        type : String
    },
    "episodeoverview":{
        type: String
    }
},{collection:"Episodeoverview"});


let connection = {}
connection.getUserCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AdminDB", { useNewUrlParser: true }).then((db) => {
        return db.model("User", userSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getComicCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AdminDB", { useNewUrlParser: true }).then((db) => {
        return db.model("Comic", comicSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getChapterCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AdminDB", { useNewUrlParser: true }).then((db) => {
        return db.model("Chapter", chapterSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getImageCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AdminDB", { useNewUrlParser: true }).then((db) => {
        return db.model("Image", imageSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getEpisodeCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AdminDB", { useNewUrlParser: true }).then((db) => {
        return db.model("Episode", episodeSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getSceneImageCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AdminDB", { useNewUrlParser: true }).then((db) => {
        return db.model("SceneImage", sceneimageSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getSceneCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AdminDB", { useNewUrlParser: true }).then((db) => {
        return db.model("Scene", sceneSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getEpisodeoverviewCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/AdminDB", { useNewUrlParser: true }).then((db) => {
        return db.model("Episodeoverview", EpisodeOverviewSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}



module.exports = connection
const collection =require('../utilities/connection');

const userDb = [
    {
        firstname :"ashwanth",
        lastname :"chandrasekaran",
        username :"admin",
        password :"admin",
        confirmpassword : "admin",
        emailid : "ashwanth@gmail.com",
        phoneno : 1234567890,
        comic : 
            [
                {
                    title : "The Phoenix",
                    genre : "Fantasy",
                    about : "The boy who become phoenix",
                },
            ]
    }
]

const comicDb  = [
    {
        username : "admin",
        title : "PeterPan",
        genre : "Fantasy",
        about : "The fairy and the pirates",
        storyoutline : "QWERTYUIOP",
        chaptername : "The haunting of pirates",
        characterfeatures : 
            [
                {
                    name: "PeterPan",
                    age: 10,
                    work: "Fairy",
                    about: "pirate fairy",
                    role: "guide",
                    behaviour: "kind",
                    likes: "children",
                    dislikes: "pirates",
                    eyecolor: "green",
                    haircolor: "brown",
                    skintone: "white",
                    hairstyle: "hatty",
                    outfit: "green dress",
                    beard: "no",
                    height: 5.5,
                    body:   "40",
                    family: "Tinker Bell",
                    friends: "Bella"
                }
            ],

    }
]

const chapterDb  = [
    {
        title : "PeterPan",
        chaptername : "The haunting of pirates",
        content : "The ajkbdsjkbcljsvckdsjlvcskjdkhj",
        episode : "The Tinker"
    }
]

const imageDb = [
    {
        title : "PeterPan",
        profileimage: "C:/fakepath/Legend.jpg",
        avatarimage: "C:/fakepath/Legend.jpg"    
    },
]

const episodeDb = [
    {
        title : "PeterPan",
        episode : "The Tinker",
        scenes : [
            {
                location : "The Pixie Hallow",
                scene : "The Intro",
                conversation : "hello there mate"
            }
        ]
    }
]

const sceneimageDb = [
    {
        title : "PeterPan",
        episode : "The Tinker",
        scenes : "Pirtaes",
        sceneimage: "C:/fakepath/Legend.jpg", 
    },
]

const sceneDb = [
    {
        title : "PeterPan",
        episode : "The Tinker",
        scenes : 
            [
                {
                    scene : "Something"
                }
            ]
    },
]

const EpisodeoverviewDb = [
    {
        title : "PeterPan",
        chaptername: "The haunting of pirates",
        episode : "The Tinker",
        episodeoverview: "Once upon a time..."
    }
]

exports.setupDb = () => {
    return collection.getUserCollection().then((userdata) =>{
        return collection.getComicCollection().then((comicdata) =>{
            return collection.getChapterCollection().then((chapterdata) =>{
                return collection.getImageCollection().then((imagedata) =>{
                    return collection.getEpisodeCollection().then((episodedata) => {
                        return collection.getSceneImageCollection().then((sceneimagedata) => {
                            return collection.getSceneCollection().then((scenedata) => {
                                return collection.getEpisodeoverviewCollection().then((episodeviewdata) =>{
                                    return userdata.deleteMany().then(() =>{
                                        return comicdata.deleteMany().then(() =>{
                                            return chapterdata.deleteMany().then(() =>{
                                                return imagedata.deleteMany().then(() =>{
                                                    return episodedata.deleteMany().then(() =>{
                                                        return sceneimagedata.deleteMany().then(() =>{
                                                            return scenedata.deleteMany().then(() =>{
                                                                return episodeviewdata.deleteMany().then(() =>{
                                                                    return userdata.insertMany(userDb).then((data) =>{
                                                                        return comicdata.insertMany(comicDb).then((comicData) =>{
                                                                            return chapterdata.insertMany(chapterDb).then((chapterData) =>{
                                                                                return imagedata.insertMany(imageDb).then((imageData) =>{
                                                                                    return episodedata.insertMany(episodeDb).then((episodeData) =>{  
                                                                                        return sceneimagedata.insertMany(sceneimageDb).then((sceneimageData) =>{
                                                                                            return scenedata.insertMany(sceneDb).then((sceneData) =>{
                                                                                                return episodeviewdata.insertMany(EpisodeoverviewDb).then((episodeviewdata) =>{
                                                                                                    if(data,comicData){
                                                                                                        return "Successfully added"
                                                                                                    }
                                                                                                    else{
                                                                                                        let err = new Error("The data cannot be inserted");
                                                                                                        err.status=404;
                                                                                                        throw err;
                                                                                                    }
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })  
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
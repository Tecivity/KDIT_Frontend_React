class Post{
    constructor(id,userUID,content,voteUp,voteDown,timeStamp,subCom,subComUID,bannerURL){
        this.id = id
        this.userUID = userUID
        this.content = content
        this.voteUp = voteUp
        this.voteDown = voteDown
        this.timeStamp = timeStamp
        this.subCom = subCom
        this.subComUID = subComUID
        this.bannerURL = bannerURL
    }
}

module.exports = Post
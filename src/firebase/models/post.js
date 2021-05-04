export default class Post{
    constructor(id,userUID,content,voteUp,voteDown,timeStamp,subComUID,bannerURL){
        this.id = id
        this.userUID = userUID
        this.content = content
        this.voteUp = voteUp
        this.voteDown = voteDown
        this.timeStamp = timeStamp
        this.subComUID = subComUID
        this.bannerURL = bannerURL
    }
}
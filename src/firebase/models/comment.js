export default class Comment{
    constructor(id,postId,userId,content,timeStamp,voteUp,voteDown){
        this.id = id 
        this.postId = postId
        this.content = content
        this.userId = userId
        this.timeStamp = timeStamp
        this.voteUp = voteUp
        this.voteDown = voteDown
    }
}
class User{
    constructor(id,totalVote,bio,displayName,photoURL,email,role,bannerURL){
        this.id = id
        this.totalVote = totalVote
        this.bio = bio
        this.displayName = displayName
        this.photoURL = photoURL
        this.email = email
        this.role = role
        this.bannerURL = bannerURL
    }
}

module.exports = User
import firebase from '../firebase'

class CommentService {
    getCommentSize(id) {
        return firebase
            .firestore()
            .collection('comments')
            .where('postUID', '==', id)
            .get()
            .then(snap => {
                return(snap.size)
            })
    }

    addComment(newComment){
        return firebase
        .firestore()
        .collection("comments")
        .add(newComment)
        .then((result) => {
          return result
        });

    }
}

export default new CommentService()
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
}

export default new CommentService()
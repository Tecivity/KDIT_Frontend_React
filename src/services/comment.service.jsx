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

    deleteComment(id) {
        return firebase
            .firestore()
            .collection('comments')
            .doc(id)
            .delete(data => {
                return ({ message: 'deleted comment.', data: data })
            })
    }
}

export default new CommentService()
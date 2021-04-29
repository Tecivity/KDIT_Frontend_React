import firebase from '../firebase'
import { PostModel } from '../firebase/models'

class PostService {

    async getAllPost() {
        const postsArray = []
        await firebase
            .firestore()
            .collection('posts')
            .onSnapshot((querySnapshot) => {
                // const postsArray = []
                querySnapshot.forEach((doc) => {
                    const post = new PostModel(
                        doc.id,
                        doc.data().userUID,
                        doc.data().content,
                        doc.data().voteUp,
                        doc.data().voteDown,
                        doc.data().timeStamp,
                        doc.data().subCom,
                        doc.data().subComUID,
                    );
                    postsArray.push(post);
                })
            })
        return postsArray
    }
}

export default new PostService()
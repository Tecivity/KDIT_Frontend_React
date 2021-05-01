import firebase from '../firebase'
import { PostModel } from '../firebase/models'

class PostService {

    getAllPost() {
        return firebase
            .firestore()
            .collection('posts')
            .onSnapshot((querySnapshot) => {
                const postsArray = []
                querySnapshot.forEach((doc) => {
                    postsArray.push({ id: doc.id, ...doc.data() });
                })
                return (postsArray)
            })
    }

    getUserPost(id){
        return firebase
			.firestore()
			.collection('posts')
			.where('userUID', '==', id)
			.onSnapshot((querySnapshot) => {
                const postsArray = [];
				querySnapshot.forEach((doc) => {
					postsArray.push({ id: doc.id, ...doc.data() });
				});
				return (postsArray)
			});
    }

    deletePost(id) {
        return firebase
            .firestore()
            .collection('posts')
            .doc(id)
            .delete(data => {
                return ({ message: 'deleted post.', data: data })
            })
    }
}

export default new PostService()
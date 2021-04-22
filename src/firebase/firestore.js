import firebase from '../firebase'
import { PostModel } from './models'

class PostService {
    getAllPosts() {
        const ref = firebase.firestore().collection('posts')

        ref.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            console.log(items)
            return (items)
        })

    }
}

export default new PostService
import firebase from '../firebase'
import { User } from '../firebase/models'

class UserService {

    getUser(id){
        return firebase
			.firestore()
			.collection('users')
			.doc(id)
			.get()
			.then((doc) => {
				const pUser = new User(
					doc.id,
					doc.data().totalVote,
					doc.data().bio,
					doc.data().displayName,
					doc.data().photoURL,
					doc.data().email
				);
				return pUser
			})
			.catch((err) => {
				return err
			});
    }
}

export default new UserService()
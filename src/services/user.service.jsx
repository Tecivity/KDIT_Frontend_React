import firebase from '../firebase'

class UserService {

    getUser(id){
        return firebase
			.firestore()
			.collection('users')
			.doc(id)
			.get()
			.then((doc) => {
				return({id:doc.id, ...doc.data()})
			})
			.catch((err) => {
				return err
			});
    }
}

export default new UserService()
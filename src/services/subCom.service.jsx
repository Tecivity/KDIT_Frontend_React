import firebase from '../firebase'

class SubComService {
    getSubCom(id){
        return firebase
			.firestore()
			.collection('sub-community')
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

export default new SubComService()
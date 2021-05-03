import firebase from '../firebase'

class SubComService {
    getSubCom(id){
        return firebase
			.firestore()
			.collection('sub_community')
			.doc(id)
			.get()
			.then((doc) => {
				return({id:doc.id, ...doc.data()})
			})
			.catch((err) => {
				return err
			});
    }
	
	deleteSubCom(id) {
        return firebase
            .firestore()
            .collection('sub_community')
            .doc(id)
            .delete(data => {
                return ({ message: 'deleted post.', data: data })
            })
    }

	updateSubCom(id,data){
		return firebase
			.firestore()
			.collection('sub_community')
			.doc(id)
			.update(data)
			.then(result=>{
				return result
			})
	}
}

export default new SubComService()
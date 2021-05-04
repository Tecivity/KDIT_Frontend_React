import firebase from '../firebase'

class ReportService {
    getAllReport() {
        return firebase
            .firestore()
            .collection('reports')
            .onSnapshot((querySnapshot) => {
                const reportsArray = []
                querySnapshot.forEach((doc) => {
                    reportsArray.push({ id: doc.id, ...doc.data() });
                })
                return (reportsArray)
            })
    }
}

export default new ReportService()
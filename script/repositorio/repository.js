import admin from 'firebase-admin';

export class ComprasRepositorio{
     findByUserUid(uid){
        return admin.firestore()
        .collection('comprasProduto')
        .where('user.uid', '==', uid)
        .get()
        .then(snapshot=>{
            return snapshot.docs.map(doc=>({
                ...doc.data(),
                uid: doc.id
            }))
        })
     }
}
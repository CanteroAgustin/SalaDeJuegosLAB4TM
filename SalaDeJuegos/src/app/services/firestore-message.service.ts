import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PptResult } from '../components/juegos/piedra-papel-tijera/pptResult';
import { Message } from '../modules/chat/models/message';

@Injectable({
  providedIn: 'root'
})
export class FirestoreMessageService {

  collection: AngularFirestoreCollection<any> | undefined;

  constructor(private firestore: AngularFirestore) {

  }

  create(msg: Message, collectionPath: string): any {
    this.collection = this.firestore.collection(collectionPath);
    return this.collection.add({ ...msg });
  }

  getAll(collectionPath: string): AngularFirestoreCollection<Message> {
    this.collection = this.firestore.collection(collectionPath);
    return this.collection;
  }

  delete(id: any, collectionPath: string): Promise<void> {
    this.collection = this.firestore.collection(collectionPath);
    return this.collection.doc(id).delete();
  }

  update(id: any, datos: any, collectionPath: string): Promise<void> {
    this.collection = this.firestore.collection(collectionPath);
    return this.collection.doc(id).update(datos);
  }

  saveResutGame(datos: any, collectionPath: string) {
    this.collection = this.firestore.collection(collectionPath);
    return this.collection.add({ ...datos });
  }

  getResultGame(collectionPath: string): AngularFirestoreCollection<any> {
    this.collection = this.firestore.collection(collectionPath);
    return this.collection;
  }

  savePptResult(datos: PptResult, collectionPath: string) {
    const doc = datos.email ? datos.email : '';
    this.firestore.collection(collectionPath).doc(doc).set(Object.assign({}, datos))
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  getPptResult(collectionPath: string, user: string | null | undefined) {
    let usuario = user ? user : '';
    return this.firestore.collection(collectionPath).doc(usuario).get();
  }

  getPptResults(collectionPath: string) {
    return this.firestore.collection(collectionPath).get();
  }
}

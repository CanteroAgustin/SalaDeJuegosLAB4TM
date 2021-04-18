import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../modules/chat/models/message';

@Injectable({
  providedIn: 'root'
})
export class FirestoreMessageService {

  collection: AngularFirestoreCollection<Message> | undefined;

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

}

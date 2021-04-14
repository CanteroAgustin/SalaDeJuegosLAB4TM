import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../modules/chat/models/message';

@Injectable({
  providedIn: 'root'
})
export class FirestoreMessageService {

  collectionPath = '/messages';
  collection: AngularFirestoreCollection<Message>;

  constructor(private firestore: AngularFirestore) { 
    this.collection = this.firestore.collection(this.collectionPath);
  }

  create(msg: Message): any {
    return this.collection.add({ ...msg });
  }

  getAll(): AngularFirestoreCollection<Message> {
    return this.collection;
  }

  delete(id: any): Promise<void> {
    return this.collection.doc(id).delete();
  }

  update(id: any, datos: any): Promise<void> {
    return this.collection.doc(id).update(datos);
  }

}

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

  Crear(msg: Message): any {
    return this.collection.add({ ...msg });
  }

  ObtenerTodos(): AngularFirestoreCollection<Message> {
    return this.collection;
  }

  BorrarMensaje(id: any): Promise<void> {
    return this.collection.doc(id).delete();
  }

  ModificarMensaje(id: any, datos: any): Promise<void> {
    return this.collection.doc(id).update(datos);
  }

}

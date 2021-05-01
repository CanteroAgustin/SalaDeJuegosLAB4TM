import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  path = 'https://api.unsplash.com/photos/random/?client_id=Y9kJSUv6zxE3yQjZogmRhWqEsQdWhDinabd9Pbv6bic&count=5';

  constructor(private http: HttpClient) { }

  getCards() {
    return this.http.get<[]>(this.path);
  }
}

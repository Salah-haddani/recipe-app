import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  emitStatusChange(recipeId: string, isAvailable: boolean) {
    this.socket.emit('updateRecipeStatus', { recipeId, isAvailable });
  }

  onStatusChange(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('recipeStatusChanged', (data: any) => observer.next(data));
    });
  }
}

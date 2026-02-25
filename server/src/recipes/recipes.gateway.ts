import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class RecipesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updateRecipeStatus')
  handleStatusUpdate(
    @MessageBody() data: { recipeId: string; isAvailable: boolean },
  ) {
    this.server.emit('recipeStatusChanged', data);
  }
}

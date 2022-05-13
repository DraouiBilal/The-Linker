import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { UserInterface } from 'src/auth/interfaces/user.interfaces';
import { UsersService } from 'src/users/users.service';
import { ChatRepository } from './chat.repository';
import { SendMessageDto } from './dto/send-message.dto';
import {Socket} from 'socket.io'
import { UseGuards } from '@nestjs/common';
import { WsGuard } from './Guards/WsGuard.guard';
import { GetUser } from './get-user.decorator';
import * as Neode from 'neode'
import { GetMessagesDto } from './dto/get-messages.dto';


@UseGuards(WsGuard)
@WebSocketGateway(5001, { namespace: 'chat',cors:'*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  private socketToUser:any

  constructor(
    private usersService:UsersService,
    @InjectRepository(ChatRepository) private chatRepository: ChatRepository
  ){}

  afterInit() {
    this.socketToUser = {}
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const id : string = client.handshake.query.id as string
    
    if(!id)
    return "User not connected"
    this.socketToUser[id] = client
    const user: Neode.Node<UserInterface> = await this.usersService.getUserFromID(id)
    
    if(!user)
      throw new WsException("User not found")
    
    const friends: UserInterface[] = await this.usersService.getAllFriends(user)
    
    friends.forEach(friend => {
      const friendSocket:Socket = this.socketToUser[friend.id]
      
      if(friendSocket)
        friendSocket.emit("friendConnected",{id: user.properties().id})
    })
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const id : string = client.handshake.query.id as string
    if(!id)
      return "User not connected"
    
    const key:string = Object.keys(this.socketToUser).find(k=>this.socketToUser[k] && this.socketToUser[k].id===client.id);
    this.socketToUser[key] = null

    this.socketToUser[id] = client
    const user: Neode.Node<UserInterface> = await this.usersService.getUserFromID(id)
    
    if(!user)
      throw new WsException("User not found")
    
    const friends: UserInterface[] = await this.usersService.getAllFriends(user)
    friends.forEach(friend => {
      const friendSocket:Socket = this.socketToUser[friend.id]
      if(friendSocket)
        friendSocket.emit("friendDisonnected",{id: user.properties().id})
    })
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket, 
    @MessageBody() sendMessageDto: SendMessageDto, 
    @GetUser() userNode:Neode.Node<UserInterface>
  ): Promise<void> {
    
    if(this.socketToUser[sendMessageDto.to])
      this.socketToUser[sendMessageDto.to].emit("message",{
        from:userNode.properties().id,
        ...sendMessageDto
      })
    try{
      const user:UserInterface = await userNode.toJson()
      await this.chatRepository.createMessage(sendMessageDto,user)
    }catch(err: unknown) {
      throw new WsException('Unable to store message in database');
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
      @ConnectedSocket() client: Socket,
      @MessageBody() getMessageDto: GetMessagesDto,
      @GetUser() userNode:Neode.Node<UserInterface>
  ): Promise<void>{
    const messages = await this.chatRepository.getMessages(userNode,getMessageDto)
    client.emit("getMessages",{messages})
  }

  @SubscribeMessage('getFriends')
  async handleGetFriends(
      @ConnectedSocket() client: Socket,
      @GetUser() userNode:Neode.Node<UserInterface>
  ): Promise<void>{
      const friends = await this.chatRepository.getFriends(userNode)
      const connectedFriends = friends.map(friend => ({
        ...friend,
        connected: this.socketToUser[friend.id] ? true : false
      }))
      client.emit("getFriends",{friends: connectedFriends})
  }
}

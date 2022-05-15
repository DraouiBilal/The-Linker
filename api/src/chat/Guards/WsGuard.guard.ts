import { ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import * as Neode from 'neode'
import UserSchema from "src/auth/dto/user.model";

@Injectable()
export class WsGuard extends AuthGuard('WebSocketStrategy') {

  constructor(){
    super()
  }
  
  getRequest(context:ExecutionContext){
    return context.switchToWs().getClient().handshake
  }
}
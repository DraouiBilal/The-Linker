import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserInterface } from "../auth/interfaces/user.interfaces";
import * as Neode from "neode"

export const GetUser = createParamDecorator((_data, ctx:ExecutionContext) => {
    const client = ctx.switchToWs().getClient()   
    const userNode:Neode.Node<UserInterface> = client.handshake.user;
    return userNode;
})
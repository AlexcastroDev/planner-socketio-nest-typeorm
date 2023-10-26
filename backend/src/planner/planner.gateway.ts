import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { usersDb } from "src/Database/users.db";
import { SocketMessage } from "src/Dtos/SocketMessage";
import { PlannerService } from "./planner.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class PlannerGateway {
  constructor(private readonly plannerService: PlannerService) {}

  @SubscribeMessage("vote")
  async handleVote(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.data.id) {
      return SocketMessage.authError();
    }

    const estimated = Number(data);
    if (isNaN(estimated)) {
      return SocketMessage.text("Invalid vote");
    }
    const userVote = this.plannerService.findByUserId(client.data.id);

    if (userVote) {
      await this.plannerService.update({
        userId: client.data.id,
        estimated,
      }, client.data.id);

      return SocketMessage.Ok();
    }

    await this.plannerService.create({
      userId: client.data.id,
      estimated,
    });
    return SocketMessage.Ok();
  }

  @SubscribeMessage("identity")
  async handleIdentity(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const user = usersDb.find((user) => user.id === data);
    if (!user) {
      return SocketMessage.authError();
    }

    client.data.id = user.id;
    client.data.name = user.name;

    return SocketMessage.Ok();
  }
}

import React from "react";
import { io, Socket } from "socket.io-client";

export function useSocket() {
  const [webSocketClient, setWebSocketClient] = React.useState<Socket | null>(
    null,
  );
  React.useEffect(() => {
    const ws = io("ws://localhost:3000");
    const user = new URLSearchParams(window.location.search).get("user");

    ws.on("connect", () => {
      setWebSocketClient(ws);
      user && ws.emitWithAck("identity", user);
    });
  }, []);

  const handleVote = (vote: number) => {
    webSocketClient?.emitWithAck("vote", vote);
  };

  return {
    handleVote,
  };
}

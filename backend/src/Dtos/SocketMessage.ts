export class SocketMessage {
  static Ok() {
    return {
      data: "ok",
    };
  }

  static text(text: string) {
    const data = JSON.stringify({
      data: text,
    });

    return data;
  }

  static authError() {
    const data = JSON.stringify({
      error: "User not found",
    });

    return data;
  }
}

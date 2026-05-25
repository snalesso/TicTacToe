namespace TicTacToe.Chat;

public record ChatRoomMessage(
    long Id,
    long AuthorId,
    DateTime Timestamp,
    string Text);
namespace TicTacToe.Chat;

public record ChatRoomMessage(
    long Id,
    long AuthorId,
    // Aligned with ChatMessage.Timestamp — DateTimeOffset is the explicit UTC-safe contract
    DateTimeOffset Timestamp,
    string Text);
namespace TicTacToe.Chat;

public record ChatRoomOption(
    long Id,
    string Name,
    string Description,
    bool IsAccessible = true);
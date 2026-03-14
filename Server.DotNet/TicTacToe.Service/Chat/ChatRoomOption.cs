namespace TicTacToe.Chat;

public record ChatRoomOption(
    ulong Id,
    string Name,
    string Description,
    bool IsAccessible);
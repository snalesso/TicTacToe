namespace TicTacToe;

public class User
{
    public ulong Id { get; init; }
    public string Username { get; init; } = string.Empty;
}

public class ChatRoom
{
    public ulong Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
}

public class ChatMessage
{
    public ulong Id { get; init; }
    public ulong ChatRoomId { get; init; }
    public ulong UserId { get; init; }
    public string Text { get; init; } = string.Empty;
    public DateTime Time { get; init; }
}
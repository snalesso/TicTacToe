using TicTacToe.Users;

namespace TicTacToe.Chat;

public class ChatMessage
{
    public const string TABLE_NAME = "ChatMessages";

    public required long Id { get; init; }
    public required long ChatRoomId { get; init; }
    public required long AuthorId { get; init; }

    public const int TEXT_MAX_LENGTH = 360;
    public required string Text { get; init; }

    public required DateTime Time { get; init; }

    #region navigation properties

    public ChatRoom Room { get; set; } = null!;
    public User Author { get; set; } = null!;

    #endregion navigation properties
}

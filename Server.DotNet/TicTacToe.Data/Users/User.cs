using TicTacToe.Chat;

namespace TicTacToe.Users;

public class User
{
    public required long Id { get; init; }
    public required string Username { get; set; }

    #region navigation properties

    public ICollection<ChatMessage> Messages { get; set; } = null!;

    #endregion navigation properties
}
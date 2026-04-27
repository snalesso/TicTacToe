namespace TicTacToe.Chat;

public class ChatRoom
{
    public required long Id { get; init; }
    public required string Name { get; set; }
    public required string Description { get; set; }

    #region navigation properties

    public ICollection<ChatMessage> Messages { get; set; } = null!;

    #endregion navigation properties
}

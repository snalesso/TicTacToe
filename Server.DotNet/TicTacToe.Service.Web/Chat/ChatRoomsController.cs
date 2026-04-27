using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Chat;

[ApiController]
[Route("chat/rooms")]
public class ChatRoomsController : ControllerBase
{
    private readonly ChatRoomOptionProvider _options;

    public ChatRoomsController(ChatRoomOptionProvider options)
    {
        _options = options ?? throw new ArgumentNullException(nameof(options));
    }

    [HttpGet]
    public async Task<IReadOnlyList<ChatRoomOption>> GetAllAsync(CancellationToken ct = default)
    {
        //yield return new ChatRoomOption(1, "Public", "Everyone is welcome!", true);
        //yield return new ChatRoomOption(2, "Support", "Got in troubles?", false);
        //yield return new ChatRoomOption(3, "Devs", "Madness room", false);
        return await _options.GetAllAsync(ct);
    }
}

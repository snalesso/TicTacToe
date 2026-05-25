using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Chat;

[ApiController]
[Route("chat/rooms")]
public class ChatRoomsController : ControllerBase
{
    private readonly ChatRoomOptionProvider _options;

    public ChatRoomsController(ChatRoomOptionProvider options)
    {
        this._options = options ?? throw new ArgumentNullException(nameof(options));
    }

    [HttpGet]
    public async Task<IReadOnlyList<ChatRoomOption>> GetAllAsync(CancellationToken ct = default)
    {
        return await this._options.GetAllAsync(ct);
    }
}

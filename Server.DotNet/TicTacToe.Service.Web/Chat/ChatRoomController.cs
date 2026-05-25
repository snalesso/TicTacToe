using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Chat;

[ApiController]
[Route("chat/rooms/{roomId}")]
public class ChatRoomController : ControllerBase
{
    private readonly ChatRoomMessagesProvider _messages;

    public ChatRoomController(ChatRoomMessagesProvider messages)
    {
        this._messages = messages ?? throw new ArgumentNullException(nameof(messages));
    }

    //[HttpGet("users")]
    //public async Task<IReadOnlyList<ChatRoomOption>> GetUsersAsync([FromRoute] long roomId, CancellationToken ct = default)
    //{
    //    return await _messages.GetAllAsync(ct);
    //}

    [HttpGet("messages")]
    public async Task<IReadOnlyList<ChatRoomMessage>> GetMessagesAsync([FromRoute] long roomId, CancellationToken ct = default)
    {
        return await this._messages.GetAllAsync(roomId, ct);
    }
}

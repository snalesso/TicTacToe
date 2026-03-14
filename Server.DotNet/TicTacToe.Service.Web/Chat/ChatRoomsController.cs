using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Chat;

[ApiController]
[Route("chat/rooms")]
public class ChatRoomsController : ControllerBase
{
    [HttpGet]
    public IEnumerable<ChatRoomOption> GetAll()
    {
        yield return new ChatRoomOption(1, "Public", "Everyone is welcome!", true);
        yield return new ChatRoomOption(2, "Support", "Got in troubles?", false);
        yield return new ChatRoomOption(3, "Devs", "Madness room", false);
    }
}

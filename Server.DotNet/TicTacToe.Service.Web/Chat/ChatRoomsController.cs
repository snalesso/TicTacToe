using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Chat;

[ApiController]
[Route("[controller]")]
public class ChatRoomsController : ControllerBase
{
    [HttpGet]
    public IEnumerable<ChatRoomOption> GetAll()
    {
        yield return new ChatRoomOption(1, "Public", "Everyone is welcome!");
        yield return new ChatRoomOption(2, "Support", "Need help?");
        yield return new ChatRoomOption(3, "Devs", "Madness room");
    }
}

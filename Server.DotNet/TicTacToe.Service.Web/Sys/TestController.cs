using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Sys;

[ApiController]
[Route("[Controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok("hello");
}
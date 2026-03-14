using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Sys;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok("hello");
}
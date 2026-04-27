using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Sys;

[ApiController]
[Route("[Controller]")]
public class SystemController : ControllerBase
{
    public SystemController()
    {
    }

    [HttpGet("app-name")]
    public ContentResult GetAppName()
    {
        return Content("About text", Microsoft.Net.Http.Headers.MediaTypeHeaderValue.Parse("text/plain"));
    }

    [HttpGet("info")]
    public SystemInfo GetInfo() => SystemInfo.Instance;
}

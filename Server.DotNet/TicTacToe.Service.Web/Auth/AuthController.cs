using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Auth;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        this._authService = authService ?? throw new ArgumentNullException(nameof(authService));
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserResponse>> RegisterAsync([FromBody] RegisterRequest request, CancellationToken ct = default)
    {
        var result = await this._authService.RegisterAsync(request.Username, request.Password, ct);
        if (result.Status == RegisterStatus.UsernameTaken)
            return this.Conflict("Username is already taken.");

        var user = result.User!;
        return this.Ok(new UserResponse(user.Id, user.Username));
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserResponse>> LoginAsync([FromBody] LoginRequest request, CancellationToken ct = default)
    {
        var result = await this._authService.LoginAsync(request.Username, request.Password, ct);
        if (result.Status == LoginStatus.InvalidCredentials)
            return this.Unauthorized("Invalid username or password.");

        var user = result.User!;
        return this.Ok(new UserResponse(user.Id, user.Username));
    }
}

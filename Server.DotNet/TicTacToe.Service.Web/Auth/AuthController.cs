using Microsoft.AspNetCore.Mvc;

namespace TicTacToe.Auth;

[ApiController]
[Route("auth")]
public class AuthController(AuthService authService, JwtTokenService jwtTokenService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> RegisterAsync([FromBody] RegisterRequest request, CancellationToken ct = default)
    {
        var result = await authService.RegisterAsync(request.Username, request.Password, ct);
        if (result.Status == RegisterStatus.UsernameTaken)
            return this.Conflict("Username is already taken.");

        var user = result.User!;
        var token = jwtTokenService.GenerateToken(user);
        return this.Ok(new AuthResponse(user.Id, user.Username, token));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> LoginAsync([FromBody] LoginRequest request, CancellationToken ct = default)
    {
        var result = await authService.LoginAsync(request.Username, request.Password, ct);
        if (result.Status == LoginStatus.InvalidCredentials)
            return this.Unauthorized("Invalid username or password.");

        var user = result.User!;
        var token = jwtTokenService.GenerateToken(user);
        return this.Ok(new AuthResponse(user.Id, user.Username, token));
    }
}

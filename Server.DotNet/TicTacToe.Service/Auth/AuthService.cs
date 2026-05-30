using Microsoft.EntityFrameworkCore;
using TicTacToe.Pgs;
using TicTacToe.Users;

namespace TicTacToe.Auth;

public class AuthService(TicTacToePgsDbContext db)
{
    public async Task<RegisterResult> RegisterAsync(string username, string password, CancellationToken ct = default)
    {
        var usernameExists = await db.Users.AnyAsync(u => u.Username == username, ct);
        if (usernameExists)
            return new RegisterResult(RegisterStatus.UsernameTaken, null);

        var user = new User
        {
            Id = default,
            Username = username,
            Password = password
        };

        db.Users.Add(user);
        await db.SaveChangesAsync(ct);

        return new RegisterResult(RegisterStatus.Success, new AuthenticatedUser(user.Id, user.Username));
    }

    public async Task<LoginResult> LoginAsync(string username, string password, CancellationToken ct = default)
    {
        var user = await db.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Username == username && u.Password == password, ct);

        if (user is null)
            return new LoginResult(LoginStatus.InvalidCredentials, null);

        return new LoginResult(LoginStatus.Success, new AuthenticatedUser(user.Id, user.Username));
    }
}
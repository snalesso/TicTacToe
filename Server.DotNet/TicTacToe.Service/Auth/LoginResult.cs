namespace TicTacToe.Auth;

public record LoginResult(LoginStatus Status, AuthenticatedUser? User);

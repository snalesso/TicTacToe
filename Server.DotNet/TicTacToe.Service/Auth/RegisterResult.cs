namespace TicTacToe.Auth;

public record RegisterResult(RegisterStatus Status, AuthenticatedUser? User);

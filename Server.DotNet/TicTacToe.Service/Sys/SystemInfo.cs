namespace TicTacToe.Sys;

public sealed class SystemInfo
{
    public static readonly SystemInfo Instance = new();

    private SystemInfo() { }

    public string Name => "Tic Tac Toe";
    public string Version => "0.0.1";
}
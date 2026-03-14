using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace TicTacToe.Queue;

public class QueueHub : Hub
{
    public const string QUEUE_GROUP_KEY = "queue";

    private static readonly ConcurrentDictionary<string, string> _connections = new();

    public void Register(string connectionId, string playerName) => _connections[connectionId] = playerName;
    // public bool TryGetName(string connectionId, out string? playerName) => _connections.TryGetValue(connectionId, out playerName);
    public void Remove(string connectionId) => _connections.TryRemove(connectionId, out _);

    public override async Task OnConnectedAsync()
    {
        var httpCtx = Context.GetHttpContext();
        if (httpCtx is null
            || !httpCtx.Request.Query.TryGetValue("name", out var nameValues)
            || nameValues.Count != 1)
        {
            Context.Abort();
            return;
        }

        var clientName = nameValues[0];
        if (string.IsNullOrWhiteSpace(clientName))
        {
            Context.Abort();
            return;
        }

        // store validated name in your own user registry
        this.Register(Context.ConnectionId, clientName);

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        this.Remove(Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
        await this.BroadcastMembersChangedAsync(Context.ConnectionId);
    }

    private async Task BroadcastMembersChangedAsync(string connectionId)
    {
        // foreach (var conn in _connections)
        // {
        //     if (!this.TryGetName())
        //     var count = Groups.(playerId, out var connections)
        //         ? connections.Count
        //         : 0;
        //     await Clients.Group(playerId).SendAsync("PlayerJoined", playerId);
        // }
    }
}

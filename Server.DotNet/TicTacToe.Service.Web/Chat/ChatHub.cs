using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace TicTacToe.Chat;

public class ChatHub : Hub
{
    // // chatId -> set of connectionIds
    private static readonly ConcurrentDictionary<string, HashSet<string>> _chats = new();

    [HubMethodName("Join")]
    public async Task JoinAsync(string chatId)
    {
        var connectionId = this.Context.ConnectionId;
        var chatConnections = _chats.GetOrAdd(chatId, _ => []);

        lock (chatConnections)
        {
            chatConnections.Add(connectionId);
        }

        await this.Groups.AddToGroupAsync(connectionId, chatId);

        await this.Clients.Group(chatId).SendAsync("ReceiveChatSize", chatConnections.Count);

        await this.BroadcastChatSize(chatId);
    }

    [HubMethodName("Leave")]
    public async Task LeaveAsync(string chatId)
    {
        var connectionId = this.Context.ConnectionId;
        if (!_chats.TryGetValue(chatId, out var connections))
            return;

        lock (connections)
        {
            connections.Remove(connectionId);
        }

        await this.Groups.RemoveFromGroupAsync(connectionId, chatId);
        await this.BroadcastChatSize(chatId);
    }

    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        foreach (var (chatId, connections) in _chats)
        {
            bool removed;
            lock (connections)
            {
                removed = connections.Remove(this.Context.ConnectionId);
            }

            if (!removed)
                continue;

            await this.BroadcastChatSize(chatId);
        }

        await base.OnDisconnectedAsync(exception);
    }

    private async Task BroadcastChatSize(string chatId)
    {
        var count = _chats.TryGetValue(chatId, out var connections)
            ? connections.Count
            : 0;

        await this.Clients.Group(chatId)
            .SendAsync("ChatSizeUpdated", count);
    }
}
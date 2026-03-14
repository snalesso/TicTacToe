using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace TicTacToe.Chat;

public class ChatHub : Hub
{
    // // chatId -> set of connectionIds
    private static readonly ConcurrentDictionary<string, HashSet<string>> Chats = new();

    [HubMethodName("Join")]
    public async Task JoinAsync(string chatId)
    {
        var connectionId = Context.ConnectionId;
        var chatConnections = Chats.GetOrAdd(chatId, _ => []);

        lock (chatConnections)
        {
            chatConnections.Add(connectionId);
        }

        await Groups.AddToGroupAsync(connectionId, chatId);

        await Clients.Group(chatId).SendAsync("ReceiveChatSize", chatConnections.Count);

        await BroadcastChatSize(chatId);
    }

    [HubMethodName("Leave")]
    public async Task LeaveAsync(string chatId)
    {
        var connectionId = Context.ConnectionId;
        if (!Chats.TryGetValue(chatId, out var connections))
            return;

        lock (connections)
        {
            connections.Remove(connectionId);
        }

        await Groups.RemoveFromGroupAsync(connectionId, chatId);
        await BroadcastChatSize(chatId);
    }

    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        foreach (var (chatId, connections) in Chats)
        {
            bool removed;
            lock (connections)
            {
                removed = connections.Remove(Context.ConnectionId);
            }

            if (!removed)
                continue;

            await BroadcastChatSize(chatId);
        }

        await base.OnDisconnectedAsync(exception);
    }

    private async Task BroadcastChatSize(string chatId)
    {
        var count = Chats.TryGetValue(chatId, out var connections)
            ? connections.Count
            : 0;

        await Clients.Group(chatId)
            .SendAsync("ChatSizeUpdated", count);
    }
}
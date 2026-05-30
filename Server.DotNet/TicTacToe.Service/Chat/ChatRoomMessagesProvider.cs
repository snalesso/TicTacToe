using Microsoft.EntityFrameworkCore;
using TicTacToe.Pgs;

namespace TicTacToe.Chat;

public class ChatRoomMessagesProvider(TicTacToePgsDbContext db)
{
    public async Task<IReadOnlyList<ChatRoomMessage>> GetAllAsync(long roomId, CancellationToken ct = default)
        => await db.ChatMessages
            .AsNoTracking()
            .Where(x => x.ChatRoomId == roomId)
            // OrderByDescending+Take fetches the last N messages efficiently (newest-first),  then OrderBy re-applies ascending order for display.
            // Both sorts are intentional — do not remove either.
            .OrderByDescending(x => x.Timestamp)
            .Take(40)
            .OrderBy(x => x.Timestamp)
            .Select(x => new ChatRoomMessage(x.Id, x.AuthorId, x.Timestamp, x.Text))
            .ToListAsync(ct);
}
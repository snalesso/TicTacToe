using Microsoft.EntityFrameworkCore;
using TicTacToe.Pgs;

namespace TicTacToe.Chat;

public class ChatRoomOptionProvider(TicTacToePgsDbContext db)
{
    public async Task<IReadOnlyList<ChatRoomOption>> GetAllAsync(CancellationToken ct = default)
        => await db.ChatRooms
            .AsNoTracking()
            .Select(x => new ChatRoomOption(x.Id, x.Name, x.Description))
            .ToListAsync(ct);

    public async Task<ChatRoomOption?> GetByIdAsync(long id, CancellationToken ct = default)
        => await db.ChatRooms
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new ChatRoomOption(x.Id, x.Name, x.Description))
            .FirstOrDefaultAsync(ct);
}
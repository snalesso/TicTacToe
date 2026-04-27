using Microsoft.EntityFrameworkCore;
using TicTacToe.Pgs;

namespace TicTacToe.Chat;

public class ChatRoomOptionProvider
{
    private readonly TicTacToePgsDbContext _db;

    public ChatRoomOptionProvider(TicTacToePgsDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<ChatRoomOption>> GetAllAsync(CancellationToken ct = default)
    {
        return await _db.ChatRooms
            .AsNoTracking()
            .Select(x => new ChatRoomOption(x.Id, x.Name, x.Description))
            .ToListAsync(ct);
    }

    public async Task<ChatRoomOption?> GetByIdAsync(long id, CancellationToken ct = default)
    {
        return await _db.ChatRooms
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new ChatRoomOption(x.Id, x.Name, x.Description))
            .FirstOrDefaultAsync(ct);
    }
}
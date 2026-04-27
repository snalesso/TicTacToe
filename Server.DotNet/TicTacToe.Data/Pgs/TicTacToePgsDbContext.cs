using Microsoft.EntityFrameworkCore;
using TicTacToe.Chat;
using TicTacToe.Users;

namespace TicTacToe.Pgs;

public class TicTacToePgsDbContext : DbContext
{
    public const string DefaultPgsConnectionStringKey = "DefaultPgsConnection";

    public TicTacToePgsDbContext(DbContextOptions<TicTacToePgsDbContext> options) : base(options)
    {
        // this.Database.EnsureCreated();
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<ChatRoom> ChatRooms => Set<ChatRoom>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new ChatMessagePgsConfiguration());
    }

    //public static string GetSqlite3DbFileName()
    //{
    //    const Environment.SpecialFolder folder = Environment.SpecialFolder.LocalApplicationData;
    //    var appDataFolderPath = Environment.GetFolderPath(folder);
    //    var dbFileName = Path.Combine(appDataFolderPath, "TicTacToe", DbFileName);
    //    return DbFileName;
    //}
}
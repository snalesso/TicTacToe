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

    public DbSet<User> Users => this.Set<User>();
    public DbSet<ChatRoom> ChatRooms => this.Set<ChatRoom>();
    public DbSet<ChatMessage> ChatMessages => this.Set<ChatMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Scans the assembly for all IEntityTypeConfiguration<T> implementations automatically,
        // picking up ChatRoom and User configurations added in Improvement 5
        // TODO: consider registering configurations explicitly if startup performance becomes a concern
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TicTacToePgsDbContext).Assembly);
    }

    //public static string GetSqlite3DbFileName()
    //{
    //    const Environment.SpecialFolder folder = Environment.SpecialFolder.LocalApplicationData;
    //    var appDataFolderPath = Environment.GetFolderPath(folder);
    //    var dbFileName = Path.Combine(appDataFolderPath, "TicTacToe", DbFileName);
    //    return DbFileName;
    //}
}
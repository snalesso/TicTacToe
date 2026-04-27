using Microsoft.EntityFrameworkCore;
using TicTacToe.Chat;
using TicTacToe.Users;

namespace TicTacToe.Sqlite;

public class TicTacToeSqliteDbContext : DbContext
{
    public const string SqliteDbFileName = "sqlite3.db";
    public const string DefaultSqliteDbFilePath = @$".\..\..\Data\{SqliteDbFileName}";
    public const string DefaultSqliteConnectionString = @$"Data Source={DefaultSqliteDbFilePath}";
    public const string DefaultSqliteConnectionStringKey = "DefaultSqliteConnection";

    public TicTacToeSqliteDbContext(DbContextOptions<TicTacToeSqliteDbContext> options) : base(options)
    {
        // this.Database.EnsureCreated();
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<ChatRoom> ChatRooms => Set<ChatRoom>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        base.OnConfiguring(options);

        if (options.IsConfigured)
            return;

        options.UseSqlite(DefaultSqliteConnectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new ChatMessageSqliteConfiguration());
    }

    //public static string GetSqlite3DbFileName()
    //{
    //    const Environment.SpecialFolder folder = Environment.SpecialFolder.LocalApplicationData;
    //    var appDataFolderPath = Environment.GetFolderPath(folder);
    //    var dbFileName = Path.Combine(appDataFolderPath, "TicTacToe", DbFileName);
    //    return DbFileName;
    //}
}
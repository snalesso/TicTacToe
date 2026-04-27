using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TicTacToe.Sqlite;

public class TicTacToeSqliteDbContextFactory : IDesignTimeDbContextFactory<TicTacToeSqliteDbContext>
{
    public TicTacToeSqliteDbContext CreateDbContext(string[] args)
    {
        //var dbFileName = TicTacToeDbContext.GetSqlite3DbFileName();
        var dbCtxBuilder = new DbContextOptionsBuilder<TicTacToeSqliteDbContext>().UseSqlite(TicTacToeSqliteDbContext.DefaultSqliteConnectionString);
        return new TicTacToeSqliteDbContext(dbCtxBuilder.Options);
    }
}
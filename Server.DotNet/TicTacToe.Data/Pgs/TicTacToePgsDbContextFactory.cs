//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Design;

//namespace TicTacToe.Postgres;

//public class TicTacToePgsDbContextFactory : IDesignTimeDbContextFactory<TicTacToePgsDbContext>
//{
//    public TicTacToePgsDbContext CreateDbContext(string[] args)
//    {
//        //var dbFileName = TicTacToeDbContext.GetSqlite3DbFileName();
//        var dbCtxBuilder = new DbContextOptionsBuilder<TicTacToePgsDbContext>().UseNpgsql(b => b.ConfigureDataSource(x => x.TicTacToePgsDbContext.DefaultPgsConnectionString);
//        return new TicTacToePgsDbContext(dbCtxBuilder.Options);
//    }

//    //public static IConfiguration BuildConfiguration()
//    //{
//    //    var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
//    //        ?? throw new Exception("Environment variable \"ASPNETCORE_ENVIRONMENT\" not found.");
//    //    return new ConfigurationBuilder()
//    //        .SetBasePath(Directory.GetCurrentDirectory())
//    //        .AddJsonFile("appsettings.json")
//    //        .AddJsonFile($"appsettings.{environment}.json", optional: true)
//    //        .AddEnvironmentVariables()
//    //        .Build();
//    //}
//}
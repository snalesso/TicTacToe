using Microsoft.EntityFrameworkCore;
using TicTacToe.Chat;
using TicTacToe.Composition;
using TicTacToe.Pgs;

var builder = WebApplication.CreateBuilder(args);

var builderServices = builder.Services;

builderServices
    //.AddDbContext<TicTacToeSqliteDbContext>(options =>
    //{
    //    var connectionString = builder.Configuration.GetConnectionString(TicTacToeSqliteDbContext.DefaultSqliteConnectionStringKey);
    //    options.UseSqlite(connectionString);
    //})
    // DbContextPool reuses context instances across requests instead of allocating new ones — significant throughput gain
    .AddDbContextPool<TicTacToePgsDbContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString(TicTacToePgsDbContext.DefaultPgsConnectionStringKey);
        options
            .UseNpgsql(connectionString, npgsql =>
                // Retries automatically on transient PostgreSQL failures (network blips, connection pool exhaustion)
                npgsql.EnableRetryOnFailure(maxRetryCount: 5))
            // Maps all table/column names to snake_case — PostgreSQL convention, avoids quoting issues in raw SQL.
            .UseSnakeCaseNamingConvention();
    })
    .RegisterServices();

builderServices.AddSignalR();
builderServices.AddControllers();
builderServices.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy => policy
        // .WithOrigins("http://localhost:4200")
        .SetIsOriginAllowed(_ => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

var app = builder.Build();

// Order is critical: CORS -> Routing -> MapHub
app.UseCors("CorsPolicy");
app.UseRouting();
app.MapHub<ChatHub>("/chat");
app.MapControllers();

await app.RunAsync();

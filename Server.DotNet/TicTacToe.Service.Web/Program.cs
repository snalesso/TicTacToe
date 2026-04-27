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
    .AddDbContext<TicTacToePgsDbContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString(TicTacToePgsDbContext.DefaultPgsConnectionStringKey);
        options.UseNpgsql(connectionString);
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

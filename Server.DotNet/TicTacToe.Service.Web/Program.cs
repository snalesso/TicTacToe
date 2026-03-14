var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddControllers();
//builder.Services.AddDbContext<TicTacToeDbContext>(options =>
//{
//    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//    options.UseSqlite(connectionString);
//});

builder.Services.AddCors(options =>
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
app.MapControllers();

await app.RunAsync();

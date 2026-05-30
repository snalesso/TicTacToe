using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TicTacToe.Auth;
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

var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtSecret = jwtSection["Secret"] ?? throw new InvalidOperationException("JWT secret is not configured.");

builderServices
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSection["Issuer"],
            ValidAudience = jwtSection["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
            ClockSkew = TimeSpan.Zero
        };
    });

builderServices.AddAuthorization();
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

// Order is critical: CORS -> Authentication -> Authorization -> Routing -> MapHub
app.UseCors("CorsPolicy");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapHub<ChatHub>("/chat");
app.MapControllers();

await app.RunAsync();

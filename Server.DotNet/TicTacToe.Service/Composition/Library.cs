using Microsoft.Extensions.DependencyInjection;
using TicTacToe.Auth;
using TicTacToe.Chat;

namespace TicTacToe.Composition;

public static class Library
{
    public static IServiceCollection RegisterServices(this IServiceCollection services)
        => services
            .AddScoped<AuthService>()
            .AddScoped<JwtTokenService>()
            .AddScoped<ChatRoomOptionProvider>()
            .AddScoped<ChatRoomMessagesProvider>();
}

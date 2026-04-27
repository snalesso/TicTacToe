using Microsoft.Extensions.DependencyInjection;
using TicTacToe.Chat;

namespace TicTacToe.Composition;

public static class Library
{
    public static IServiceCollection RegisterServices(this IServiceCollection services)
    {
        return services.AddScoped<ChatRoomOptionProvider>();
    }
}

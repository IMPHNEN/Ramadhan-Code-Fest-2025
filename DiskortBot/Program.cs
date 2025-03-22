using Discord.Interactions;
using Discord.WebSocket;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

using DiskortBot.Services;

var builder = Host.CreateApplicationBuilder(args);

builder.Configuration.AddUserSecrets<Program>();

builder.Services.AddSingleton(new DiscordSocketClient(
    new DiscordSocketConfig
    {
        GatewayIntents = Discord.GatewayIntents.Guilds | Discord.GatewayIntents.GuildMembers,
        LogGatewayIntentWarnings = true,
        AlwaysDownloadUsers = true,
        LogLevel = Discord.LogSeverity.Info
    }
));

builder.Services.AddSingleton<InteractionService>(provider =>
    {
        var client = provider.GetRequiredService<DiscordSocketClient>();
        return new InteractionService(client);
    }
);

builder.Services.Configure<InteractionServiceConfig>(options =>
    {
        options.LogLevel = Discord.LogSeverity.Info;
        options.DefaultRunMode = RunMode.Async;
    }
);

builder.Services.AddHttpClient<StableDiffusionService>((provider, client) =>
    {
        var config = provider.GetRequiredService<IConfiguration>();
        client.BaseAddress = new Uri(config["StableDiffusion:Uri"]!);
        client.Timeout = TimeSpan.FromMinutes(5);
    }
);

builder.Services.AddHostedService<AppService>();

var host = builder.Build();

await host.RunAsync();

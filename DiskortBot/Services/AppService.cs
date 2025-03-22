namespace DiskortBot.Services;

using Discord;
using Discord.Interactions;
using Discord.WebSocket;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Reflection;

public class AppService : IHostedService
{
    private readonly DiscordSocketClient _client;
    private readonly InteractionService _interactions;
    private readonly IConfiguration _config;
    private readonly IServiceProvider _services;
    private readonly ILogger<AppService> _logger;

    public AppService(
        DiscordSocketClient client,
        InteractionService interactions,
        IConfiguration config,
        IServiceProvider services,
        ILogger<AppService> logger)
    {
        _client = client;
        _interactions = interactions;
        _config = config;
        _services = services;
        _logger = logger;

        _client.Log += LogAsync;
        _interactions.Log += LogAsync;
        _client.Ready += ReadyAsync;
        _client.InteractionCreated += HandleInteraction;
    }

    private async Task ReadyAsync()
    {
        _logger.LogInformation($"Client connected as {_client.CurrentUser.Username}");
        await RegisterCommandsAsync();
    }

    private async Task RegisterCommandsAsync()
    {
        await _interactions.AddModulesAsync(Assembly.GetEntryAssembly(), _services);
        await _interactions.RegisterCommandsGloballyAsync();
        _logger.LogInformation($"Registered {_interactions.Modules.Count()} modules");
    }

    private async Task HandleInteraction(SocketInteraction interaction)
    {
        var context = new SocketInteractionContext(_client, interaction);
        await _interactions.ExecuteCommandAsync(context, _services);
    }

    private Task LogAsync(LogMessage log)
    {
        _logger.LogInformation(log.ToString());
        return Task.CompletedTask;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await _client.LoginAsync(TokenType.Bot, _config["App:Token"]);
        await _client.StartAsync();
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _client.LogoutAsync();
        await _client.StopAsync();
    }
}

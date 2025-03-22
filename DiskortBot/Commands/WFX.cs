namespace DiskortBot.Commands;

using System.Text.RegularExpressions;
using Discord;
using Discord.Interactions;

using DiskortBot.Services;

[Group("wfx", "WFX commands")]
public class WFX : InteractionModuleBase<SocketInteractionContext>
{
    private readonly StableDiffusionService _sdService;

    public WFX(StableDiffusionService sdService)
    {
        _sdService = sdService;
    }

    [SlashCommand("generate", "Generate image")]
    public async Task Generate(
        [Summary("prompt", "Prompt Input")] string prompt,
        [Summary("negative", "Negative Prompt Input")] string negativePrompt = "lowres, bad anatomy, bad hands, text, error, missing finger, extra digits, fewer digits, cropped, worst quality, low quality, low score, bad score, average score, signature, watermark, username, blurry",
        [Summary("ratio", "Ratio Image (ex: 1024x1024)")] string ratio = "1024x1024",
        [Summary("steps", "Steps (min: 1, max: 50)")] int steps = 25,
        [Summary("cfg", "CFG Scale")] double cfg = 6.0,
        [Summary("seeds", "Seeds")] int seeds = -1)
    {
        await DeferAsync();

        try
        {
            var dimension = GetDimension(ratio);
            var image = await _sdService.GenerateAsync(new(
                prompt,
                negativePrompt,
                width: dimension.Width,
                height: dimension.Height,
                steps: steps,
                cfg: cfg,
                seed: seeds
            ));

            var embed = new EmbedBuilder()
                .WithTitle("🎨 WFX Generate")
                .WithDescription($"📣 {steps} steps, {cfg} cfg, {dimension.Width}x{dimension.Height} ratio, {image.Info.Seed} seed")
                .WithColor(Color.Blue)
                .WithFooter($"Requested by {Context.User.Username}", Context.User.GetAvatarUrl())
                .Build();

            await FollowupWithFileAsync(
                new FileAttachment(new MemoryStream(image.Image), "generated.png"),
                embed: embed
            );
        }
        catch (Exception error)
        {
            await FollowupAsync($"Exception: {error.Message}");
        }
    }

    [SlashCommand("ping", "Test connection")]
    public async Task Ping()
    {
        await DeferAsync();

        if (await _sdService.Ping())
        {
            await FollowupAsync("Connection Ok!");
        }
        else
        {
            await FollowupAsync("Disconnected :(");
        }
    }

    [SlashCommand("analyze", "Analize metadata image")]
    public async Task Analyze([Summary("image", "Image that you want to analyze")] IAttachment media)
    {
        if (!media.ContentType.StartsWith("image/"))
        {
            await RespondAsync("⚠️ Only supported image");
            return;
        }


        await DeferAsync();

        try
        {
            var metadata = await _sdService.GetMetadata(media.Url, $"/tmp/{media.Id}.png");

            var embed = new EmbedBuilder()
                .WithTitle("🎨 WFX Analyze")
                .WithImageUrl(media.Url)
                .WithDescription($"__{metadata}__")
                .WithFooter($"Requested by {Context.User.Username}", Context.User.GetAvatarUrl())
                .WithColor(Color.Blue)
                .Build();

            await FollowupAsync(embed: embed);
        }
        catch (Exception error)
        {
            await FollowupAsync($"Exception: {error}");
        }
    }

    private record Dimension(int Width, int Height);

    private Dimension GetDimension(string ratio)
    {
        Match patern = Regex.Match(ratio, @"(\d+)x(\d+)");

        if (!patern.Success)
        {
            throw new Exception("Width/Height must be a Int!");
        }

        return new(int.Parse(patern.Groups[1].Value), int.Parse(patern.Groups[2].Value));
    }
}

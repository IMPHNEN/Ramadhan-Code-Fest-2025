namespace DiskortBot.Services;

using System.Text;
using System.Text.Json;
using System.Net.Http.Json;
using Microsoft.Extensions.Logging;
using MetadataExtractor;

public class StableDiffusionResultInfo
{
    public long Seed { set; get; }
}

public class StableDiffusionConfig
{
    public string Prompt { set; get; }
    public string NegativePrompt { set; get; }
    public int Steps { set; get; }
    public double CfgScale { set; get; }
    public int Width { set; get; }
    public int Height { set; get; }
    public long Seed { set; get; }
    public string SamplerName { set; get; }

    public StableDiffusionConfig(
        string prompt,
        string negativePrompt,
        int steps = 24,
        double cfg = 6.0,
        int width = 1024,
        int height = 1024,
        long seed = -1,
        string samplerName = "Euler a")
    {
        Prompt = prompt;
        NegativePrompt = negativePrompt;
        Steps = steps;
        CfgScale = cfg;
        Width = width;
        Height = height;
        Seed = seed;
        SamplerName = samplerName;
    }
}

public class StableDiffusionService : IDisposable
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<StableDiffusionService> _logger;

    public StableDiffusionService(
        HttpClient httpClient,
        ILogger<StableDiffusionService> logger)
    {
        _logger = logger;
        _httpClient = httpClient;
    }

    private record GenerationResponse(string[] Images, string Info);

    public record StableDiffusionResult(byte[] Image, StableDiffusionResultInfo Info);

    public async Task<StableDiffusionResult> GenerateAsync(StableDiffusionConfig config)
    {
        var opt = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
        };
        var payload = JsonSerializer.Serialize(config, opt);

        var content = new StringContent(payload, Encoding.UTF8, "application/json");
        content.Headers.ContentLength = payload.Length;

        var response = await _httpClient.PostAsync("/sdapi/v1/txt2img", content);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<GenerationResponse>();

        return new(
            Convert.FromBase64String(result!.Images[0]),
            JsonSerializer.Deserialize<StableDiffusionResultInfo>(result!.Info, opt)!
        );
    }

    public async Task<bool> Ping()
    {
        try
        {
            var response = await _httpClient.GetAsync("/internal/ping");
            response.EnsureSuccessStatusCode();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<string> GetMetadata(string url, string path)
    {
        await DownloadMedia(url, path);

        var directories = ImageMetadataReader.ReadMetadata(path);

        foreach (var directory in directories)
        {
            if (directory.Name == "PNG-tEXt")
            {
                var metadata = directory.Tags[0];
                return metadata.Description ?? "Failed to extract metadata";
            }
        }

        File.Delete(path);

        return "Failed to find metadata";
    }

    private async Task DownloadMedia(string url, string path)
    {
        var image = await _httpClient.GetByteArrayAsync(url);
        await File.WriteAllBytesAsync(path, image);
    }

    public void Dispose()
    {
        _httpClient?.Dispose();
    }
}

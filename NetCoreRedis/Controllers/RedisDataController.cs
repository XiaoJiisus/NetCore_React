using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using NetCoreRedis.Models;

namespace NetCoreRedis.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RedisDataController : ControllerBase
{
    private readonly ILogger<RedisDataController> _logger;

    public RedisDataController(ILogger<RedisDataController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Route("savetoredis/{description}")]
    public async Task<IActionResult> SaveToRedis(string description)
    {
        var redisDb = RedisDb.Connection.GetDatabase();
        await redisDb.StringSetAsync(description, DateTime.Now.ToString());

        return StatusCode(StatusCodes.Status200OK, "Ok");
    }

    [HttpGet]
    [Route("getredisdata")]
    public IActionResult GetRedisdata()
    {
        var keys = RedisDb.Connection.GetServer("localhost", 6379).Keys();
        var values = RedisDb.Connection.GetDatabase();
        var redisDbLst = new List<RedisDbModel>();
        var counter = 1;

        foreach (var k in keys)
        {
            redisDbLst.Add(new RedisDbModel
            {
                counterInt = counter,
                descriptionStr = k,
                savedDtb = Convert.ToDateTime(values.StringGet(k))
            });

            counter ++;
        }

        // Console.WriteLine($"{System.Text.Json.JsonSerializer.Serialize(redisDbLst)}");
        return StatusCode(StatusCodes.Status200OK, redisDbLst.OrderByDescending(x => x.savedDtb).ToList());
    }

    [HttpDelete]
    [Route("deleterediskey/{description}")]
    public async Task<IActionResult> DeleteRedisKey(string description)
    {
        var redisDb = RedisDb.Connection.GetDatabase();
        await redisDb.KeyDeleteAsync(description);
        return StatusCode(StatusCodes.Status200OK, "Ok");
    }
}

public class RedisDb
{
    private static Lazy<ConnectionMultiplexer> _lazyConnection;

    public static ConnectionMultiplexer Connection
    {
        get
        {
            return _lazyConnection.Value;
        }
    }

    static RedisDb()
    {
        _lazyConnection = new Lazy<ConnectionMultiplexer>(() =>
            ConnectionMultiplexer.Connect("localhost")
        );
    }
}
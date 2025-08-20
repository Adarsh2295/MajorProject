using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            _logger.LogInformation("Ping endpoint called");
            return Ok(new
            {
                message = "Pong! Backend is running.",
                timestamp = DateTime.UtcNow,
                version = "1.0.0",
                environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"
            });
        }

        [HttpGet("health")]
        public IActionResult Health()
        {
            _logger.LogInformation("Health check endpoint called");
            
            // You can add more sophisticated health checks here
            // For now, just return basic health information
            return Ok(new
            {
                status = "Healthy",
                timestamp = DateTime.UtcNow,
                uptime = Environment.TickCount64,
                server = Environment.MachineName,
                dotNetVersion = Environment.Version.ToString(),
                workingSet = Environment.WorkingSet,
                checks = new
                {
                    database = "Connected", // You could add actual DB health check here
                    memory = "OK",
                    disk = "OK"
                }
            });
        }

        [HttpGet("cors-test")]
        public IActionResult CorsTest()
        {
            _logger.LogInformation("CORS test endpoint called");
            return Ok(new
            {
                message = "CORS is working correctly!",
                origin = Request.Headers["Origin"].FirstOrDefault() ?? "No origin header",
                timestamp = DateTime.UtcNow
            });
        }
    }
}

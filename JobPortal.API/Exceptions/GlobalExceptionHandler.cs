using System.Net;
using System.Text.Json;

namespace JobPortal.API.Exceptions
{
    public class GlobalExceptionHandler
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var statusCode = HttpStatusCode.InternalServerError; // 500 Internal Server Error
            var message = "An unexpected error occurred.";

            if (exception is JobPortalException jobPortalException)
            {
                statusCode = HttpStatusCode.BadRequest; // 400 Bad Request for custom business logic errors
                message = jobPortalException.Message;
            }
            else if (exception is UnauthorizedAccessException)
            {
                statusCode = HttpStatusCode.Unauthorized; // 401 Unauthorized
                message = "Unauthorized access.";
            }
            // Add more specific exception handling here if needed

            context.Response.StatusCode = (int)statusCode;

            var response = new
            {
                Message = message,
                StatusCode = (int)statusCode,
                Details = exception.Message // Include exception message for development/debugging
            };

            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}

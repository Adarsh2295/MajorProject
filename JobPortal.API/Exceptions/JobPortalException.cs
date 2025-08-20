namespace JobPortal.API.Exceptions
{
    public class JobPortalException : Exception
    {
        public JobPortalException() { }

        public JobPortalException(string message) : base(message) { }

        public JobPortalException(string message, Exception innerException) : base(message, innerException) { }
    }
}

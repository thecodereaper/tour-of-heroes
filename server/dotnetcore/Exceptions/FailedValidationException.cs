using System;

namespace dotnetcore.Exceptions
{
    internal sealed class FailedValidationException : Exception
    {
        public FailedValidationException() { }

        public FailedValidationException(string message)
            : base(message) { }

        public FailedValidationException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}

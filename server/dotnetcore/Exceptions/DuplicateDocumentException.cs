using System;

namespace dotnetcore.Exceptions
{
    internal sealed class DuplicateDocumentException : Exception
    {
        public DuplicateDocumentException() { }

        public DuplicateDocumentException(string message)
            : base(message) { }

        public DuplicateDocumentException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}

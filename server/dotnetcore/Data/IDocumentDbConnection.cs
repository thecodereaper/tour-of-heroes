using System.Collections.Generic;
using Microsoft.Azure.Documents.Client;

namespace dotnetcore.Data
{
    public interface IDocumentDbConnection
    {
        IDictionary<string, string> Collections { get; }

        string Database { get; }

        DocumentClient DocumentClient { get; }
    }
}

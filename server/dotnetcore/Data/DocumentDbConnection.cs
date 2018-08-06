using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;

namespace dotnetcore.Data
{
    internal sealed class DocumentDbConnection : IDocumentDbConnection
    {
        public DocumentDbConnection(IConfiguration configuration)
        {
            IEnumerable<IConfigurationSection> collections = configuration.GetSection("DocumentDbCollection").GetChildren();
            Collections = new Dictionary<string, string>();

            foreach (IConfigurationSection collection in collections)
                Collections.Add(collection.Key, collection.Value);

            Uri endpoint = new Uri(configuration["DocumentDbEndpoint"]);
            ConnectionPolicy connectionPolicy = new ConnectionPolicy { EnableEndpointDiscovery = false };

            Database = configuration["DocumentDbName"];
            DocumentClient = new DocumentClient(endpoint, configuration["DocumentDbKey"], connectionPolicy);

            CreateDatabase().Wait();
            CreateCollections().Wait();
        }

        public string Database { get; }
        public IDictionary<string, string> Collections { get; }
        public DocumentClient DocumentClient { get; }

        private async Task CreateDatabase()
        {
            try
            {
                await DocumentClient.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(Database));
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode != HttpStatusCode.NotFound)
                    throw;

                await DocumentClient.CreateDatabaseAsync(new Database { Id = Database });
            }
        }

        private async Task CreateCollections()
        {
            foreach (KeyValuePair<string, string> collection in Collections)
            {
                try
                {
                    Uri uri = UriFactory.CreateDocumentCollectionUri(Database, collection.Value);
                    await DocumentClient.ReadDocumentCollectionAsync(uri);
                }
                catch (DocumentClientException e)
                {
                    if (e.StatusCode != HttpStatusCode.NotFound)
                        throw;

                    await DocumentClient.CreateDocumentCollectionAsync(
                        UriFactory.CreateDatabaseUri(Database),
                        new DocumentCollection { Id = collection.Value },
                        new RequestOptions { OfferThroughput = 1000 }
                    );
                }
            }
        }
    }
}

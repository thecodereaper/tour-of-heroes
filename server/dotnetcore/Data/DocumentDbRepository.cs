using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;

namespace dotnetcore.Data
{
    internal sealed class DocumentDbRepository : IDocumentDbRepository
    {
        private readonly DocumentClient _documentClient;
        private readonly IDocumentDbConnection _documentDbConnection;

        public DocumentDbRepository(IDocumentDbConnection documentDbConnection)
        {
            _documentDbConnection = documentDbConnection;
            _documentClient = _documentDbConnection.DocumentClient;
        }

        public async Task<T> Get<T>(string id)
        {
            try
            {
                Document document = await _documentClient.ReadDocumentAsync(CreateDocumentUri<T>(id));
                return (T)(dynamic)document;
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode != HttpStatusCode.NotFound)
                    throw;

                return (T)(dynamic)null;
            }
        }

        public async Task<IEnumerable<T>> Get<T>()
        {
            return await GetAll<T>();
        }

        public async Task<IEnumerable<T>> Get<T>(Expression<Func<T, bool>> predicate)
        {
            return await GetAll(predicate);
        }

        public async Task<T> Create<T>(T item)
        {
            Document document = await _documentClient.CreateDocumentAsync(CreateDocumentUri<T>(), item);
            return (T)(dynamic)document;
        }

        public async Task<T> Update<T>(T item)
        {
            IDocument itemDocument = (IDocument)item;
            AccessCondition accessCondition = new AccessCondition { Condition = itemDocument.Version, Type = AccessConditionType.IfMatch };
            RequestOptions requestOptions = new RequestOptions { AccessCondition = accessCondition };
            Document document = await _documentClient.ReplaceDocumentAsync(CreateDocumentUri<T>(itemDocument.Id), item, requestOptions);

            return (T)(dynamic)document;
        }

        public async Task<bool> Delete<T>(string id)
        {
            await _documentClient.DeleteDocumentAsync(CreateDocumentUri<T>(id));
            return true;
        }

        private async Task<IEnumerable<T>> GetAll<T>(Expression<Func<T, bool>> predicate = null)
        {
            Uri uri = CreateDocumentUri<T>();
            FeedOptions feedOptions = new FeedOptions { MaxItemCount = -1 };

            IDocumentQuery<T> query = predicate == null
                ? _documentClient.CreateDocumentQuery<T>(uri, feedOptions).AsDocumentQuery()
                : _documentClient.CreateDocumentQuery<T>(uri, feedOptions).Where(predicate).AsDocumentQuery();

            List<T> results = new List<T>();

            while (query.HasMoreResults)
                results.AddRange(await query.ExecuteNextAsync<T>());

            return results;
        }

        private Uri CreateDocumentUri<T>(string id = null)
        {
            string collection = _documentDbConnection.Collections.SingleOrDefault(c => c.Key == typeof(T).FullName).Value;

            return string.IsNullOrEmpty(id)
                ? UriFactory.CreateDocumentCollectionUri(_documentDbConnection.Database, collection)
                : UriFactory.CreateDocumentUri(_documentDbConnection.Database, collection, id);
        }
    }
}

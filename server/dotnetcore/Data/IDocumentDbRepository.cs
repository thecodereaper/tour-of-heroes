using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace dotnetcore.Data
{
    internal interface IDocumentDbRepository
    {
        Task<T> Get<T>(string id);

        Task<IEnumerable<T>> Get<T>();

        Task<IEnumerable<T>> Get<T>(Expression<Func<T, bool>> predicate);

        Task<T> Create<T>(T item);

        Task<T> Update<T>(T item);

        Task<bool> Delete<T>(string id);
    }
}

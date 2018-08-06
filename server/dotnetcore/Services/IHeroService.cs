using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetcore.Models;
using dotnetcore.Models.Commands;

namespace dotnetcore.Services
{
    public interface IHeroService
    {
        Task<IEnumerable<Hero>> GetAll();

        Task<Hero> GetOne(string id);

        Task<IEnumerable<Hero>> SearchByName(string name);

        Task<Hero> Create(CreateHeroCommand command);

        Task ChangeName(string id, ChangeHeroNameCommand command);

        Task Delete(string id);
    }
}

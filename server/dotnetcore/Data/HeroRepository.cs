using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetcore.Models;

namespace dotnetcore.Data
{
    internal sealed class HeroRepository : IHeroRepository
    {
        private readonly IDocumentDbRepository _documentDbRepository;

        public HeroRepository(IDocumentDbRepository documentDbRepository)
        {
            _documentDbRepository = documentDbRepository;
        }

        public Task<IEnumerable<Hero>> FetchAll()
        {
            return _documentDbRepository.Get<Hero>();
        }

        public Task<Hero> FindOneById(string id)
        {
            return _documentDbRepository.Get<Hero>(id);
        }

        public Task<IEnumerable<Hero>> FindByName(string name)
        {
            return _documentDbRepository.Get<Hero>(h => h.Name.ToLower().Contains(name));
        }

        public Task<Hero> Create(Hero hero)
        {
            return _documentDbRepository.Create(hero);
        }

        public Task<Hero> Update(Hero hero)
        {
            return _documentDbRepository.Update(hero);
        }

        public Task<bool> Delete(string id)
        {
            return _documentDbRepository.Delete<Hero>(id);
        }

        public async Task<bool> IsDuplicate(Hero hero)
        {
            IEnumerable<Hero> countries = await _documentDbRepository
                .Get<Hero>(h =>
                    h.Name == hero.Name &&
                    h.Id != hero.Id
                );

            return countries.Any();
        }
    }
}

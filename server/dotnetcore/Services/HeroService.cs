using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetcore.Data;
using dotnetcore.Exceptions;
using dotnetcore.Models;
using dotnetcore.Models.Commands;

namespace dotnetcore.Services
{
    internal sealed class HeroService : IHeroService
    {
        private readonly IHeroRepository _heroRepository;

        public HeroService(IHeroRepository heroRepository)
        {
            _heroRepository = heroRepository;
        }

        public async Task<IEnumerable<Hero>> GetAll()
        {
            return await _heroRepository.FetchAll();
        }

        public async Task<Hero> GetOne(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentNullException(nameof(id));

            Hero hero = await _heroRepository.FindOneById(id);

            if (hero == null)
                throw new DocumentNotFoundException();

            return hero;
        }

        public async Task<IEnumerable<Hero>> SearchByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentNullException(nameof(name));

            return await _heroRepository.FindByName(name.ToLower().Trim());
        }

        public async Task<Hero> Create(CreateHeroCommand command)
        {
            if (command == null)
                throw new ArgumentNullException(nameof(command));

            if (!command.IsValid())
                throw new FailedValidationException();

            Hero hero = new Hero(string.Empty, command.Name);

            if (await _heroRepository.IsDuplicate(hero))
                throw new DuplicateDocumentException();

            return await _heroRepository.Create(hero);
        }

        public async Task ChangeName(string id, ChangeHeroNameCommand command)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentNullException(nameof(id));

            if (command == null)
                throw new ArgumentNullException(nameof(command));

            if (command.Id != id)
                throw new InvalidOperationException();

            if (!command.IsValid())
                throw new FailedValidationException();

            Hero hero = await _heroRepository.FindOneById(id);

            if (hero == null)
                throw new DocumentNotFoundException();

            hero.ChangeName(command.Name);

            if (await _heroRepository.IsDuplicate(hero))
                throw new DuplicateDocumentException();

            await _heroRepository.Update(hero);
        }

        public async Task Delete(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentNullException(nameof(id));

            Hero hero = await _heroRepository.FindOneById(id);

            if (hero == null)
                throw new DocumentNotFoundException();

            await _heroRepository.Delete(id);
        }
    }
}

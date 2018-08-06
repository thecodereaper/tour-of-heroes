namespace dotnetcore.Models.Commands
{
    public sealed class CreateHeroCommand
    {
        public CreateHeroCommand(string name)
        {
            this.Name = name;
        }

        public string Name { get; }

        public bool IsValid()
        {
            return !string.IsNullOrWhiteSpace(Name);
        }
    }
}

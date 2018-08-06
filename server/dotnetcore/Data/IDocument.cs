namespace dotnetcore.Data
{
    public interface IDocument
    {
        string Id { get; set; }

        string Version { get; set; }
    }
}

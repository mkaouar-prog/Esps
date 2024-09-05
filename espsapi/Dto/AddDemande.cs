namespace espsapi.Dto
{
    public class AddDemande
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public string referance { get; set; }
        public int status { get; set; } = 0;
    }
}

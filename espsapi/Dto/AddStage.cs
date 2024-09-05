using espsapi.Models;
namespace espsapi.Dto
{
    public class AddStage
    {
        public int Id { get; set; }

        public string Ref { get; set; }
        public string Societe { get; set; }

        public string Titre { get; set; }

        public string Description { get; set; }

        public string ImgUrl { get; set; }
    }
}

namespace espsapi.Models
{
    public class UserDetails
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        
        public string Photo { get; set; }

        public int Ville { get; set; }

        public string LinkedinUrl { get; set; }

        public int Status { get; set; }
        public int Telephone { get; set; }

        public DateTime Dispo { get; set; }
        public int Categorie { get; set; }
        
        public string UrlCv { get; set; }
        public string UrlLettre { get; set; }

        public User User { get; set; }
    }
}



using System.Text.Json.Serialization;

namespace espsapi.Models
{
    public class User 
    {

        
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
        [JsonIgnore] public string Password { get; set; }
        public int Role { get; set; } = 0;
        public UserDetails UserDetails { get; set; }
        
    }
}

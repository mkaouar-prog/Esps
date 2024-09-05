namespace espsapi.Dto
{
    public class RegisterDto
    {
        public string Name { set; get; }
        public string Email { set; get; }
        public string Password { set; get; }

        public int Role { get; set; } 
    }
}

using espsapi.Data;
using espsapi.Interfaces;
using espsapi.Models;

namespace espsapi.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext context)
        {
            _context = context;
        }

        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }
        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }
        public User GetById(int id)
        {
            
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public IEnumerable<User> GetAll()
        {
            // Assuming you have a DbSet<User> in your DbContext
            return _context.Users.ToList();
        }


        public void Delete(int id)
        {
            var userToDelete = _context.Users.FirstOrDefault(u => u.Id == id);

            if (userToDelete != null)
            {
                _context.Users.Remove(userToDelete);
                _context.SaveChanges();
            }
            else
            {
                throw new InvalidOperationException("User not found");
            }
        }

    }
}

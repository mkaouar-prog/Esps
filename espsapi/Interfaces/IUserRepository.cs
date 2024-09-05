using espsapi.Models;

namespace espsapi.Interfaces
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        User GetById(int id);

        void Delete(int userId);
        IEnumerable<User> GetAll();
    }
}

using espsapi.Models;

namespace espsapi.Interfaces
{
    public interface IUserDetailsRepository
    {
        UserDetails Create(UserDetails userdetails);
        UserDetails GetById(int id);

        UserDetails Update(UserDetails userdetails, int id);

        void Delete(int userId);
        IEnumerable<UserDetails> GetAll();
    }
}

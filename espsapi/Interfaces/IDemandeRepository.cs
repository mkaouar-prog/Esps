using espsapi.Models;

namespace espsapi.Interfaces
{
    public interface IDemandeRepository
    {
        Demande Add(Demande demande);
        bool Verify(int userid, string refe);
        Demande GetById(int id);
        Demande Update(Demande demande, int id);

        IEnumerable<Demande> GetAll();
    }
}

using espsapi.Data;
using espsapi.Interfaces;
using espsapi.Models;

namespace espsapi.Repository
{
    public class DemandeRepository : IDemandeRepository
    {

        private readonly UserContext _context;
        public DemandeRepository(UserContext context)
        {
            _context = context;

        }

        public Demande Add(Demande demande)
        {
            _context.Demandes.Add(demande);
            _context.SaveChanges();

            return demande;
        }
        public bool Verify(int userId, string referance)
        {
           
            bool x = _context.Demandes.Any(u => u.userId == userId && u.referance == referance);

            
            return x;
        }


        public IEnumerable<Demande> GetAll()
        {

            return _context.Demandes.ToList();
        }
        public Demande GetById(int id)
        {
            return _context.Demandes.FirstOrDefault(u => u.Id == id);
        }
        public Demande Update(Demande demande, int id)
        {
            var existingDemande = _context.Demandes.FirstOrDefault(u => u.Id == id);
            if (existingDemande != null)
            {
                // Update properties
                existingDemande.userId = demande.userId;
                existingDemande.referance = demande.referance;
                existingDemande.status = demande.status;
               
                

                _context.SaveChanges();
            }

            return existingDemande;
        }

    }
}

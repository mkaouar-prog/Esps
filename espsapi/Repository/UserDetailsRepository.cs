using espsapi.Data;
using espsapi.Interfaces;
using espsapi.Models;

namespace espsapi.Repository
{
    public class UserDetailsRepository : IUserDetailsRepository
    {
        private readonly UserContext _context;
        public UserDetailsRepository(UserContext context)
        {
            _context = context;
        }
        
        public UserDetails Create(UserDetails userdetails)
        {
           
            _context.UserDetails.Add(userdetails);
            _context.SaveChanges();

            return userdetails;
        }
        public UserDetails GetById(int id)
        {
            return _context.UserDetails.FirstOrDefault(u => u.UserId == id);
        }

        public IEnumerable<UserDetails> GetAll()
        {
           
            return _context.UserDetails.ToList();
        }
        public void Delete(int id)
        {
            var userToDelete = _context.UserDetails.FirstOrDefault(u => u.UserId == id);

            if (userToDelete != null)
            {
                _context.UserDetails.Remove(userToDelete);
                _context.SaveChanges();
            }
            else
            {
                throw new InvalidOperationException("User not found");
            }
        }


        public UserDetails Update(UserDetails userDetails , int id)
        {
            var existingUserDetails = _context.UserDetails.FirstOrDefault(u => u.UserId == id);
            if (existingUserDetails != null)
            {
                // Update properties
                existingUserDetails.UserId = userDetails.UserId;
                existingUserDetails.Photo = userDetails.Photo;
                existingUserDetails.Ville = userDetails.Ville;
                existingUserDetails.LinkedinUrl = userDetails.LinkedinUrl;
                existingUserDetails.Status = userDetails.Status;
                existingUserDetails.Telephone = userDetails.Telephone;
                existingUserDetails.Dispo = userDetails.Dispo;
                existingUserDetails.Categorie = userDetails.Categorie;
                existingUserDetails.UrlCv = userDetails.UrlCv;
                existingUserDetails.UrlLettre = userDetails.UrlLettre;

                _context.SaveChanges();
            }

            return existingUserDetails;
        }



    }
}

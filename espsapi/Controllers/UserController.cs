using espsapi.Dto;
using espsapi.Helpers;
using espsapi.Interfaces;
using espsapi.Models;
using Microsoft.AspNetCore.Mvc;

namespace espsapi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserDetailsRepository _repository;
        private readonly JwtService _jwtService;
        private readonly IUserRepository _context;
        public UserController(IUserDetailsRepository repository, JwtService jwtService, IUserRepository context)
        {
            _repository = repository;
            _jwtService = jwtService;
            _context = context;
        }
        [HttpPost("user/{id}/create")]
        [Produces("application/json")]
        public IActionResult Crreate(int id , CreateDto dto)
        {
            var userdetails = new UserDetails
            {
                UserId = id ,
                Photo = dto.Photo,
                Ville = dto.Ville,
                LinkedinUrl = dto.LinkedinUrl,
                Status = dto.Status,
                Telephone = dto.Telephone,
                Dispo = dto.Dispo,
                Categorie = dto.Categorie,
                UrlCv = dto.UrlCv,
                UrlLettre = dto.UrlLettre,


                
       
        


       
       

    

        



    };

            var createdUserDetails = _repository.Create(userdetails);

            // Correct the action name to "Crreate" in CreatedAtAction
            return CreatedAtAction(nameof(Crreate), new { id = createdUserDetails.UserId }, new { message = "ajouté avec succès", userDetails = createdUserDetails });
        }
        [HttpPut("user/{id}/update")]
        [Produces("application/json")]
        public IActionResult Update(int id, UpdateDto dto)
        {
            var existingUserDetails = _repository.GetById(dto.UserId);

            if (existingUserDetails == null)
            {
                return NotFound(new { message = "Utilisateur non trouvé" });
            }

            // Update properties
            existingUserDetails.UserId = existingUserDetails.UserId;
            existingUserDetails.Photo = dto.Photo;
            existingUserDetails.Ville = dto.Ville;
            existingUserDetails.LinkedinUrl = dto.LinkedinUrl;
            existingUserDetails.Status = dto.Status;
            existingUserDetails.Telephone = dto.Telephone;
            existingUserDetails.Dispo = dto.Dispo;
            existingUserDetails.Categorie = dto.Categorie;
            existingUserDetails.UrlCv = dto.UrlCv;
            existingUserDetails.UrlLettre = dto.UrlLettre;

            _repository.Update(existingUserDetails,id);

            return Ok(new { message = "Mise à jour réussie", userDetails = existingUserDetails });
        }


        [HttpGet("user/{id}/info")]
        public IActionResult get(int id)
        {
            try
            {
                

                var userdetails = _repository.GetById(id);

                if (userdetails != null)
                {
                    // Return the user details as a response
                    return Ok(userdetails);
                }
                else
                {
                    // If user details were not found, return a not found response
                    return NotFound();
                }
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
        
        [HttpGet("usersDetails")]
        public IActionResult UsersDetails()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);


               

                var allUsers = _repository.GetAll();

                return Ok(allUsers);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
       



    }
}

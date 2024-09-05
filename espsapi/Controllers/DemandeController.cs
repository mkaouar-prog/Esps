using espsapi.Dto;
using espsapi.Interfaces;
using espsapi.Models;
using Microsoft.AspNetCore.Mvc;

namespace espsapi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class DemandeController : Controller
    {
        private readonly IDemandeRepository _repository;
        public DemandeController(IDemandeRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("demande/add")]
        [Produces("application/json")]
        public IActionResult Add(AddDemande dto)
        {
            
            var demande = new Demande
            {
                userId = dto.userId,
                referance = dto.referance,
                status = dto.status,
                



            };
            if (!_repository.Verify(dto.userId, dto.referance))
            {

                var AddedDemande = _repository.Add(demande);


                return Ok(new { message = "x", demande = AddedDemande });
            }
            else
                return Ok("y");
        }
        [HttpGet("demande/all")]
        public IActionResult Demandes()
        {
            try
            {




                var allDemandes = _repository.GetAll();

                return Ok(allDemandes);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPut("demande/{id}/update")]
        [Produces("application/json")]
        public IActionResult Update(int id, UpdateStatus dto)
        {
            var existingDemande = _repository.GetById(id);

            if (existingDemande == null)
            {
                return NotFound(new { message = "Demande non trouvé" });
            }

            // Update properties
          
            existingDemande.status = dto.status;
         
          

            _repository.Update(existingDemande, id);

            return Ok(new { message = "Mise à jour réussie", demande = existingDemande });
        }


    }
}

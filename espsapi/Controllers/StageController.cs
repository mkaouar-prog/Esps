using espsapi.Dto;
using espsapi.Helpers;
using espsapi.Interfaces;
using espsapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace espsapi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class StageController : Controller
    {
        private readonly IStageRepository _repository;
       public StageController(IStageRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("stage/add")]
        [Produces("application/json")]
        public IActionResult Add(AddStage dto)
        {
            var stage = new Stage
            {
               Ref = dto.Ref,
               Societe = dto.Societe,
               Titre = dto.Titre,
               Description = dto.Description,
               ImgUrl = dto.ImgUrl,
            


            };

            var AddedStage = _repository.Add(stage);


            return Ok(new { message = "Mise à jour réussie", stage = AddedStage });
        }
        [HttpGet("stages")]
        public IActionResult Stages()
        {
            try
            {
           



                var allStages = _repository.GetAll();

                return Ok(allStages);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }



        [HttpDelete("stage/{id}/delete")]
        public IActionResult Delete(int id)
        {
            try
            {
              
                var stageToDelete = _repository.GetById(id);

                if (stageToDelete == null)
                {
                    return NotFound("stage not found");
                }
                else
                {


                    _repository.Delete(id);



                }

                

                return Ok(new { message = "success" });
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }



    }
}

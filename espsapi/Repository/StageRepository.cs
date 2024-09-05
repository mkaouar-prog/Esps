using espsapi.Data;
using espsapi.Interfaces;
using espsapi.Models;

namespace espsapi.Repository
{
    public class StageRepository : IStageRepository 
    {
        private readonly UserContext _context;
        public StageRepository(UserContext context) {
            _context = context;

        }

        public Stage Add(Stage stage)
        {
            _context.Stages.Add(stage);
            _context.SaveChanges();

            return stage;
        }
        public Stage GetById(int id)
        {
            return _context.Stages.FirstOrDefault(u => u.Id == id);
        }
        public IEnumerable<Stage> GetAll()
        {
           
            return _context.Stages.ToList();
        }


        public void Delete(int id)
        {
            var stageToDelete = _context.Stages.FirstOrDefault(u => u.Id == id);

            if (stageToDelete != null)
            {
                _context.Stages.Remove(stageToDelete);
                _context.SaveChanges();
            }
            else
            {
                throw new InvalidOperationException("Stage not found");
            }
        }
    }
}

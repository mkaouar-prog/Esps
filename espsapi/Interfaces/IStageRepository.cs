using espsapi.Models;
namespace espsapi.Interfaces
{
    public interface IStageRepository
    {
        Stage Add(Stage stage);
        IEnumerable<Stage> GetAll();

        Stage GetById(int id);
        void Delete(int id);
    }
}

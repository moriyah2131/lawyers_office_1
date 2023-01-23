using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IactionsBll
    {
        public List<ActionsDTO> GetAll();
        public ActionsDTO GetById(int id);
        Task<List<int>> postAsync(PostActionDTO obj, int bagID);
        public Task<ActionsDTO> putAsync(ActionsDTO obj);
        public ActionsDTO delete(int id);
        Task<List<ActionsDTO>> GetTasksByIdAsync(int id, int userID);
        Task<List<ActionsDTO>> GetTasksByUserIdAsync(int personId, string userType);
        Task<List<ActionsDTO>> putListAsync(int bagID, string userType, List<ActionsDTO> objs);
        Task DeleteListAsync(List<int> tasksIDs);
    }
}

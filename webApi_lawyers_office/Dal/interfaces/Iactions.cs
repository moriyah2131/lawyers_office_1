using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Iactions
    {
        public List<ActionsDto> GetAll();
        public ActionsDto GetById(int id);
        public ActionsDto post(ActionsDto obj);
        public ActionsDto put(ActionsDto obj);
        public ActionsDto delete(int id);
        Task<List<ActionsDto>> GetTasksByIdAsync(int bagID, int userID);
        Task<List<ActionsDto>> PutListAsync(int bagID, string userType, List<ActionsDto> objs);
        Task DeleteListAsync(List<int> tasksIDs);
    }
}

using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IactionsBll
    {
        public List<ActionsDto> GetAll();
        public ActionsDto GetById(int id);
        public ActionsDto post(ActionsDto obj);
        public ActionsDto put(ActionsDto obj);
        public ActionsDto delete(int id);
        Task<List<ActionsDto>> GetTasksByIdAsync(int id, int userID);
        Task<List<ActionsDto>> putListAsync(int bagID, string userType, List<ActionsDto> objs);
        Task DeleteListAsync(List<int> tasksIDs);

    }
}

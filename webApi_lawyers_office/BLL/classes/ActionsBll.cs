using BLL.interfaces;
using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.classes
{

    public class ActionsBll : IactionsBll
    {  
        public Iactions dal;
        public ActionsBll(Iactions _dal)
        {
            dal = _dal;
        }

        public List<ActionsDTO> GetAll()
        {
            return dal.GetAll();
        }

        public ActionsDTO GetById(int id)
        {
            return dal.GetById(id);
        }

        public async Task<List<ActionsDTO>> GetTasksByIdAsync(int id, int userID)
        {
            return await dal.GetTasksByIdAsync(id, userID);
        }

        public async Task<List<ActionsDTO>> GetTasksByUserIdAsync(int personId, string userType)
        {
            return await dal.GetTasksByUserIdAsync(personId, userType);
        }

        public async Task<List<int>> postAsync(PostActionDTO obj, int bagID)
        {
            return await dal.postAsync(obj, bagID);
        }

        public async Task<ActionsDTO> putAsync(ActionsDTO obj)
        {
            return await dal.putAsync(obj);
        }

        public async Task<List<ActionsDTO>> putListAsync(int bagID, string userType, List<ActionsDTO> objs)
        {
            return await dal.PutListAsync(bagID, userType, objs);
        }

        public ActionsDTO delete(int id)
        {
            return dal.delete(id);
        }

        public async Task DeleteListAsync(List<int> tasksIDs)
        {
            await dal.DeleteListAsync(tasksIDs);
        }
    }
}

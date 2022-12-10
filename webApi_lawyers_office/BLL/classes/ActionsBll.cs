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

        public List<ActionsDto> GetAll()
        {
            return dal.GetAll();
        }

        public ActionsDto GetById(int id)
        {
            return dal.GetById(id);
        }

        public async Task<List<ActionsDto>> GetTasksByIdAsync(int id, int userID)
        {
            return await dal.GetTasksByIdAsync(id, userID);
        }

        public ActionsDto post(ActionsDto obj)
        {
            return dal.post(obj);
        }

        public ActionsDto put(ActionsDto obj)
        {
            return dal.put(obj);
        }

        public async Task<List<ActionsDto>> putListAsync(int bagID, string userType, List<ActionsDto> objs)
        {
            return await dal.PutListAsync(bagID, userType, objs);
        }

        public ActionsDto delete(int id)
        {
            return dal.delete(id);
        }

        public async Task DeleteListAsync(List<int> tasksIDs)
        {
            await dal.DeleteListAsync(tasksIDs);
        }
    }
}

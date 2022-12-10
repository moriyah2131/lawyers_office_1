using Dal.converters;
using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Action = Dal.models.Action;

namespace Dal.functions
{
    public class ActionsFunc : Iactions
    {
        Layers_OfficeContext db;
        public ActionsFunc(Layers_OfficeContext _db)
        {
            db = _db;
        }

        public List<ActionsDto> GetAll()
        {
            return ActionsConverter.toDtoList(db.Actions.ToList());
        }

        public ActionsDto GetById(int id)
        {
            try
            {
                return ActionsConverter.toDto(db.Actions.First(obj => obj.Id == id));
            }
            catch
            {
                return null;
            }
        }
        
        public async Task<List<ActionsDto>> GetTasksByIdAsync(int bagID, int userID)
        {
            Bag bag = await db.Bags.Include(b => b.ActionsToBags).Include(b => b.BagsToPeople).FirstOrDefaultAsync(obj => obj.Id == bagID);
            ICollection<BagsToPerson> btp = bag.BagsToPeople;
            string userType = "";
            foreach (BagsToPerson b in btp)
            {
                if (b.PersonId == userID)
                    userType = b.PersonType;
            }
            List<ActionsToBag> atbs = await db.ActionsToBags.Where(item => item.BagId == bagID).ToListAsync();
            List<ActionsDto> actions = new();

            foreach (ActionsToBag atb in bag.ActionsToBags)
            {
                Action actionToAdd = await db.Actions.Select(a => a)
                    .Include(a => a.ActionPattern).Include(a => a.ActionPattern.Link)
                    .Where(a => a.Id == atb.ActionId && (a.whom_for_id == null && a.ActionPattern.WhomFor == userType || a.whom_for_id == userID))
                    .FirstOrDefaultAsync();

                if (actionToAdd != null)
                    actions.Add(ActionsConverter.toDto(actionToAdd));
            }
            return actions;
        }
        public ActionsDto post(ActionsDto obj)
        {
            try
            {
                models.Action newObj = db.Actions.Add(ActionsConverter.toDal(obj)).Entity;
                db.SaveChanges();
                return ActionsConverter.toDto(newObj);
            }
            catch
            {
                throw;
            }

        }

        public ActionsDto put(ActionsDto obj)
        {
            try
            {
                models.Action objToUpdate = db.Actions.First(item => item.Id == obj.Id);
                
                objToUpdate.Id = obj.Id;
                objToUpdate.ActionPatternId = obj.ActionPatternId;
                objToUpdate.Comments = obj.Comments;
                objToUpdate.DeadLine = obj.DeadLine;
                objToUpdate.ActionState = obj.ActionState;
                objToUpdate.ActionFileId = obj.ActionFileId;
                objToUpdate.ActionPriority = obj.ActionPriority;
                objToUpdate.CreatedDate = obj.CreatedDate;

                db.SaveChanges();
                return ActionsConverter.toDto(objToUpdate);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ActionsDto>> PutListAsync(int bagID, string userType, List<ActionsDto> objs)
        {
            List<Action> updatedActions = new();
            foreach (var obj in objs)
            { 
                Action objToUpdate = await db.Actions.FirstOrDefaultAsync(item => item.Id == obj.Id);
                if (objToUpdate == null) continue;

                objToUpdate.ActionPatternId = obj.ActionPatternId;
                objToUpdate.Comments = obj.Comments;
                objToUpdate.DeadLine = obj.DeadLine;
                objToUpdate.ActionState = obj.ActionState;
                objToUpdate.ActionFileId = obj.ActionFileId;
                objToUpdate.ActionPriority = obj.ActionPriority;
                objToUpdate.CreatedDate = obj.CreatedDate;
                if (objToUpdate.ActionPattern != null) 
                { 
                    objToUpdate.ActionPattern.ActionPatternName = obj.ActionPatternName;
                    objToUpdate.ActionPattern.Discription = obj.Discription;
                    if (objToUpdate.ActionPattern.Link != null)
                    {
                        objToUpdate.ActionPattern.Link.LinkName = obj.LinkName;
                        objToUpdate.ActionPattern.Link.SiteAddress = obj.SiteAddress;
                    }
                }
                updatedActions.Add(objToUpdate);
            }
            db.UpdateRange(updatedActions);
            await db.SaveChangesAsync();
            return ActionsConverter.toDtoList(updatedActions);
        }

        public ActionsDto delete(int id)
        {
            try
            {
                models.Action objToRemove = db.Actions.First(item=> item.Id==id);
                db.Actions.Remove(objToRemove);
                db.SaveChanges();
                return ActionsConverter.toDto(objToRemove);
            }
            catch
            {
                throw;
            }
        }
        public async Task DeleteListAsync(List<int> tasksIDs)
        {
            List<ActionsToBag> actionsToBagToDelete = new();
            List<Action> actionsToDelete = new();
            foreach (int taskID in tasksIDs)
            {
                actionsToBagToDelete.Add( await db.ActionsToBags.FirstOrDefaultAsync(item => item.ActionId == taskID));
                actionsToDelete.Add( await db.Actions.FirstOrDefaultAsync(item => item.Id == taskID));
            }  
            db.ActionsToBags.RemoveRange(actionsToBagToDelete);
            await db.SaveChangesAsync();

            db.Actions.RemoveRange(actionsToDelete);
            await db.SaveChangesAsync();
        }

    }
}

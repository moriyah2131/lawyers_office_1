using Dal.converters;
using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using Microsoft.EntityFrameworkCore;
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

        public List<ActionsDTO> GetAll()
        {
            return ActionsConverter.toDtoList(db.Actions.ToList());
        }

        public ActionsDTO GetById(int id)
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
        
        public async Task<List<ActionsDTO>> GetTasksByIdAsync(int bagID, int userID)
        {
            Bag bag = await db.Bags.Include(b => b.ActionsToBags).Include(b => b.BagsToPeople).FirstOrDefaultAsync(obj => obj.Id == bagID);
            ICollection<BagsToPerson> btp = bag.BagsToPeople;
            string userType = "";
            foreach (BagsToPerson b in btp)
            {
                if (b.PersonId == userID)
                    userType = b.PersonType;
            }
            if (userType == "")
                userType = "lawyer";

            //List<ActionsToBag> atbs = await db.ActionsToBags.Where(item => item.BagId == bagID).ToListAsync();
            List<ActionsDTO> actions = new();

            foreach (ActionsToBag atb in bag.ActionsToBags)
            {
                Action actionToAdd = await db.Actions.Select(a => a)
                    .Include(a => a.ActionPattern).Include(a => a.ActionPattern.Link)
                    .Where(a => a.Id == atb.ActionId && (a.whom_for_id == userID
                        || a.ActionPattern.WhomFor == userType)
                       )
                    .FirstOrDefaultAsync();

                if (actionToAdd != null)
                    actions.Add(ActionsConverter.toDto(actionToAdd));
            }
            return actions;
        }

        public async Task<List<ActionsDTO>> GetTasksByUserIdAsync(int personId, string userType)
        {
            //This function needs to be updated:
            // 1. You need to collect all bags this person participates at,
            // 2. For each bag, save the person's current userType,
            // 3. Fins person's tasks according to his userType (and not just personID)
            //Comment: Maybe you thought to obliterate (להכחיד) that optin anyway? 🤔

            List<Action> actions = await db.Actions.Include(a => a.ActionPattern).Where(a => a.whom_for_id == personId || a.ActionPattern.WhomFor == userType).ToListAsync();
            List<Bag> bags = new List<Bag>();
            ActionsToBag currentAtb;

            foreach (Action action in actions)
            {
                currentAtb = await db.ActionsToBags.FirstOrDefaultAsync(atb => atb.ActionId == action.Id);
                if (currentAtb != null)
                    bags.Add(await db.Bags.FirstOrDefaultAsync(b => b.Id == currentAtb.BagId));
            }
            return ActionsConverter.toDtoList(actions, bags);
        }
        public async Task<List<int>> postAsync(PostActionDTO obj, int bagID)
        {
            Link link = null;
            if(obj.Action.LinkID != null && obj.Action.LinkID > 0)
            {
                link = await db.Links.FirstOrDefaultAsync(l=>l.Id == obj.Action.LinkID);
            }
            else if (obj.Action.LinkName != null && obj.Action.SiteAddress != null)
            {
                link = db.Links.Add(new () { LinkName = obj.Action.LinkName, SiteAddress = obj.Action.SiteAddress }).Entity;
                await db.SaveChangesAsync();
            }

            ActionPattern ap = db.ActionPatterns.Add(new () { ActionPatternName = obj.Action.ActionPatternName, Discription = obj.Action.Discription, LinkId = link?.Id }).Entity;
            await db.SaveChangesAsync();   
                
            List<int> IDs = new();

            foreach (int whom_for_id in obj.WhomForIDs)
            {
                 Action action = db.Actions.Add(new () { Comments = obj.Action.Comments, DeadLine = obj.Action.DeadLine, ActionState = obj.Action.ActionState, ActionPriority = obj.Action.ActionPriority, ActionPatternId = ap.Id, whom_for_id = whom_for_id }).Entity;
                 await db.SaveChangesAsync();
                
                 await db.ActionsToBags.AddAsync(new () { ActionId = action.Id, BagId = bagID });
                 await db.SaveChangesAsync();

                 IDs.Add(action.Id);
            }
            return IDs;

        }

        public async Task<ActionsDTO> putAsync(ActionsDTO obj)
        {
            try
            {
                Action objToUpdate = db.Actions.First(item => item.Id == obj.Id);
                
                objToUpdate.Comments = obj.Comments;
                objToUpdate.DeadLine = obj.DeadLine;
                objToUpdate.ActionPriority = obj.ActionPriority;

                /* Link */
                Link link = null;
                if(obj.LinkID != null && obj.LinkID > 0)
                {
                    link = await db.Links.FirstOrDefaultAsync(l => l.Id == obj.LinkID);
                }
                else if ((obj.LinkID == null || obj.LinkID <= 0) && (obj.LinkName != null && obj.SiteAddress != null))
                {
                    link = db.Links.Add(new() { LinkName = obj.LinkName, SiteAddress = obj.SiteAddress }).Entity;
                    await db.SaveChangesAsync();
                }

                /* ActionPattern */
                ActionPattern ap = await db.ActionPatterns.FirstOrDefaultAsync(a => a.Id == obj.ActionPatternId);
                ap.ActionPatternName = obj.ActionPatternName;
                ap.Discription = obj.Discription;
                ap.LinkId = link?.Id;

                await db.SaveChangesAsync();
                return ActionsConverter.toDto(objToUpdate);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ActionsDTO>> PutListAsync(int bagID, string userType, List<ActionsDTO> objs)
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

        public ActionsDTO delete(int id)
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

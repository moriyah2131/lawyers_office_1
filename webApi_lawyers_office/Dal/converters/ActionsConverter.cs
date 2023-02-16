using System.Collections.Generic;
using Dal.models;
using EntitiesDTO;

namespace Dal.converters
{
    public class ActionsConverter
    {
        public static ActionsDTO toDto(models.Action obj)
        {
            return new ActionsDTO { 
                Id= obj.Id,
                ActionPatternId= obj.ActionPatternId,
                Comments= obj.Comments,
                DeadLine= obj.DeadLine,
                ActionState= obj.ActionState,
                ActionFileId = obj.ActionFileId,
                ActionPriority = obj.ActionPriority,
                CreatedDate = obj.CreatedDate, 
                ActionPatternName = obj.ActionPattern?.ActionPatternName,
                Discription = obj.ActionPattern?.Discription,
                LinkName = obj.ActionPattern?.Link?.LinkName,
                SiteAddress = obj.ActionPattern?.Link?.SiteAddress,
            };
        }
        public static models.Action toDal(ActionsDTO obj)
        {
            return new models.Action {
                Id = obj.Id,
                ActionPatternId = obj.ActionPatternId,
                Comments = obj.Comments,
                DeadLine = obj.DeadLine,
                ActionState = obj.ActionState,
                ActionFileId = obj.ActionFileId,
                ActionPriority = obj.ActionPriority,
                CreatedDate = obj.CreatedDate,
                //ActionPattern = new() { ActionPatternName = obj.ActionPatternName },
            };
        }
        public static List<ActionsDTO> toDtoList(List<models.Action> objList)
        {
            List<ActionsDTO> l = new List<ActionsDTO>();
            foreach (models.Action item in objList)
            {
                l.Add(toDto(item));
            }
            return l;
        }
        public static List<ActionsDTO> toDtoList(List<models.Action> objList, List<Bag> expandList)
        {
            List<ActionsDTO> l = new List<ActionsDTO>();
            for (int i = 0; i < objList.Count; i++)
            {
                ActionsDTO newAction = toDto(objList[i]);
                if(i < expandList.Count)
                    newAction.Bag = new BagInfoDto() { Id = expandList[i].Id, BagName = expandList[i].BagName };
                l.Add(newAction);
            }
            return l;
        }
        public static List<models.Action> toDalList(List<ActionsDTO> objList)
        {
            List<models.Action> l = new List<models.Action>();
            foreach (ActionsDTO item in objList)
            {
                l.Add(toDal(item));
            }
            return l;
        }
    }
}

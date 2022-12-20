using System.Collections.Generic;

namespace EntitiesDTO
{
    public class PostActionDTO
    {
        public ActionsDTO Action { get; set; }
        public List<int> WhomForIDs { get; set; }
    }
}

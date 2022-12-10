using System.Collections.Generic;

namespace EntitiesDTO
{
    public class AccountDTO
    {
        public int PersonId { get; set; }
        public string Name { get; set; }
        public string UserType { get; set; }
        public IEnumerable<int> BagsIDs { get; set; }
        public bool IsFirstVisit { get; set; } = false;
    }
}

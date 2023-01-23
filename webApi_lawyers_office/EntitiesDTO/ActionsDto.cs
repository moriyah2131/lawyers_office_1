using System;

namespace EntitiesDTO
{
    public class ActionsDTO
    {
        public int Id { get; set; }
        /* ActionPattern */
        public int? ActionPatternId { get; set; }
        public string? ActionPatternName { get; set; }
        public string? Discription { get; set; }
        /* Link */
        public int? LinkID { get; set; }
        public string? LinkName { get; set; }
        public string? SiteAddress { get; set; }
        /* Action details */
        public string? Comments { get; set; }
        public DateTime? DeadLine { get; set; }
        public string ActionState { get; set; }
        public int? ActionFileId { get; set; }
        public int ActionPriority { get; set; }
        public DateTime CreatedDate { get; set; }
        /* Bag */
        public BagInfoDto? Bag { get; set; }
    }
}

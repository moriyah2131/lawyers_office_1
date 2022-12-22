using System;
using System.Collections.Generic;

namespace EntitiesDTO
{
    public enum EBagState { IN_PROCCESS = 0, CLOSED = 1, PENDING = 2, STUCK = 4}
    public class GetBagDTO
    {
        public int Id { get; set; }
        public string BagName { get; set; }
        public EBagState BagState { get; set; }
        public DateTime LastOpen { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? CloseDate { get; set; } = null;
        public List<ShortPersonDTO>? Buyers { get; set; }
        public List<ShortPersonDTO>? Sellers { get; set; }
        public List<ShortPersonDTO>? Agents { get; set; }
        public AssetDTO? Asset { get; set; } = null;
    }
}

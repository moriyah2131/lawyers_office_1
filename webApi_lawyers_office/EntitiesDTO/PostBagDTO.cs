using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesDTO
{
    public class PostBagDTO
    {
        public AssetDTO Asset { get; set; }
        public ICollection<ShortPersonDTO> Participants { get; set; }
    }
}

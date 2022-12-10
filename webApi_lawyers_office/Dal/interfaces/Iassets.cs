using Dal.models;
using EntitiesDTO;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Iassets
    {
        Task deleteByIdAsync(Bag bagToDekete);
        Task<int> PostAsync(AssetDTO asset);
        Task<int> PutAsync(int bagId, AssetDTO asset);
    }
}

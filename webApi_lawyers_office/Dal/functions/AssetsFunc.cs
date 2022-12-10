using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Dal.functions
{
    public class AssetsFunc: Iassets
    {
        Layers_OfficeContext db;
        public AssetsFunc(Layers_OfficeContext _db)
        {
            db = _db;
        }

        public async Task deleteByIdAsync(Bag bagToDelete)
        {
            Asset objToRemove = bagToDelete.Asset;
            db.Assets.Remove(objToRemove);
            await db.SaveChangesAsync();
        }

        public async Task<int> PostAsync(AssetDTO asset)
        {
            var newAsset = new Asset()
            {
                AssetAddress = asset.AssetAddress,
                BlockOrBook = asset.BlockOrBook,
                OtherDetails = asset.OtherDetails,
                PlotOrPage = asset.PlotOrPage,
                SubPlot = asset.SubPlot,
                TikMinhal = asset.TikMinhal,
            };
            await db.Assets.AddAsync(newAsset);
            await db.SaveChangesAsync();
            return newAsset.Id;
        }

        public async Task<int> PutAsync(int bagId, AssetDTO asset)
        {
            Bag bag = await db.Bags.Include(b => b.Asset).FirstOrDefaultAsync(a => a.Id == bagId) ?? throw new Exception("Asset doesn't exist!");
            Asset objToUpdate = bag.Asset;
            objToUpdate.SubPlot = asset.SubPlot;
            objToUpdate.AssetAddress = asset.AssetAddress;
            objToUpdate.OtherDetails = asset.OtherDetails;
            objToUpdate.PlotOrPage = asset.PlotOrPage;
            objToUpdate.BlockOrBook = asset.BlockOrBook;
            objToUpdate.TikMinhal = asset.TikMinhal;

            db.Assets.Update(objToUpdate);
            await db.SaveChangesAsync();
            return objToUpdate.Id;
        }
    }
}

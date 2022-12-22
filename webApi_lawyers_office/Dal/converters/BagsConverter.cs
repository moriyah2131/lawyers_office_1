using System.Collections.Generic;
using Dal.models;
using EntitiesDTO;

namespace Dal.converters
{
    public class BagsConverter
    {
        public static GetBagDTO toDto(models.Bag obj)
        {
            return new GetBagDTO()
            {
                BagName = obj.BagName,
                Id = obj.Id,
                LastOpen = obj.LastOpen,
                BagState = obj.BagState switch
                {
                    0 => EBagState.IN_PROCCESS,
                    1 => EBagState.CLOSED,
                    2 => EBagState.PENDING,
                    4 => EBagState.STUCK,
                    _ => EBagState.IN_PROCCESS
                },
                OpenDate = obj.open_date,
                CloseDate = obj.DateClose ?? null,
                Asset = obj.Asset != null ? new()
                {
                    AssetAddress = obj.Asset.AssetAddress,
                    Id = obj.Asset.Id,
                    BlockOrBook = obj.Asset.BlockOrBook,
                    OtherDetails = obj.Asset.OtherDetails,
                    PlotOrPage = obj.Asset.PlotOrPage,
                    SubPlot = obj.Asset.SubPlot,
                    TikMinhal = obj.Asset.TikMinhal
                } : null,
            };
        }
        public static models.Bag toDal(GetBagDTO obj)
        {
            return new models.Bag
            {
                LastOpen = obj.LastOpen,
                Id = obj.Id,
                BagName = obj.BagName,
                BagState = obj.BagState switch
                {
                    EBagState.IN_PROCCESS => 0,
                    EBagState.PENDING => 1,
                    EBagState.STUCK => 2,
                    EBagState.CLOSED => 3,
                    _ => 0
                },
                open_date = obj.OpenDate,
                DateClose = obj.CloseDate,
                AssetId = obj.Asset?.Id ?? 0,
            };
        }
        public static List<GetBagDTO> toDtoList(List<models.Bag> objList)
        {
            List<GetBagDTO> l = new List<GetBagDTO>();
            foreach (models.Bag item in objList)
            {
                l.Add(toDto(item));
            }
            return l;
        }
        public static List<models.Bag> toDalList(List<GetBagDTO> objList)
        {
            List<Bag> l = new List<Bag>();
            foreach (GetBagDTO item in objList)
            {
                l.Add(toDal(item));
            }
            return l;
        }
    }
}

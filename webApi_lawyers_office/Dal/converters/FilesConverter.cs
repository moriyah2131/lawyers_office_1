using System.Collections.Generic;
using Dal.models;
using EntitiesDTO;

namespace Dal.converters
{
    public class FilesConverter
    {
        public static FilesDto toDto(File obj)
        {
            return new FilesDto { 
                Id = obj.Id,
                BagId = obj.BagId,
                FilePatternId = obj.FilePatternId,
                Document = obj.Document,
                CreatorId = obj.CreatorId,
                FileName = obj.FileName,
                UploadingDate = obj.UploadingDate,
                Access = obj.Access
                //FileType = obj.FileType,
            };
        }
        public static  File toDal(FilesDto obj)
        {
            return new File {
                FilePatternId = obj.FilePatternId,
                BagId = obj.BagId,
                Document = obj.Document,
                CreatorId = obj.CreatorId,
                FileName = obj.FileName,
                UploadingDate = obj.UploadingDate,
                Access = obj.Access
                //FileType = obj.FileType,
            };
        }
        public static List<FilesDto> toDtoList(List<File> objList)
        {
            List<FilesDto> l = new List<FilesDto>();
            foreach (File item in objList)
            {
                l.Add(toDto(item));
            }
            return l;
        }
        public static List<File> toDalList(List<FilesDto> objList)
        {
            List<File> l = new List<File>();
            foreach (FilesDto item in objList)
            {
                l.Add(toDal(item));
            }
            return l;
        }
    }
}

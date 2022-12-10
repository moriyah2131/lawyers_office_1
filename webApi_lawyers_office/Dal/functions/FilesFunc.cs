using Dal.converters;
using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Dal.functions
{
    public class FilesFunc : Ifiles
    {
        Layers_OfficeContext db;
        public FilesFunc(Layers_OfficeContext _db)
        {
            db = _db;
        }

        public List<FilesDto> GetAll()
        {
            return FilesConverter.toDtoList(db.Files.ToList());
        }

        public FilesDto GetById(int id)
        {
            try
            {
                return FilesConverter.toDto(db.Files.First(obj => obj.Id == id));
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<FilesDto>> GetByBagId(int bagID, int creatorID)
        {
            return FilesConverter.toDtoList(await db.Files.Select(obj => obj).Include(obj => obj.FilePattern).Where(obj => obj.BagId == bagID && (obj.CreatorId == creatorID || obj.FilePattern.Access == 3)).ToListAsync());
        }

        public async Task<List<FilesDto>> GetAllByBagId(int bagID)
        {
            return FilesConverter.toDtoList(await db.Files.Where(obj => obj.BagId == bagID).ToListAsync());
        }

        public async Task post(FilesDto obj)
        {
            await db.Files.AddAsync(FilesConverter.toDal(obj));
            await db.SaveChangesAsync();
        }

        public async Task<FilesDto> PutAsync(FilesDto obj)
        {
            File objToUpdate = await db.Files.FirstOrDefaultAsync(item => item.Id == obj.Id) ?? throw new KeyNotFoundException("File doesn't exist in db.");

            objToUpdate.FilePatternId = obj.FilePatternId;
            objToUpdate.BagId = obj.BagId;
            objToUpdate.Document = obj.Document;
            objToUpdate.CreatorId = obj.CreatorId;
            objToUpdate.FileName = obj.FileName;
            objToUpdate.UploadingDate = obj.UploadingDate;
            //objToUpdate.FileType = obj.FileType;
                
            db.Files.Update(objToUpdate);

            await db.SaveChangesAsync();
            return FilesConverter.toDto(objToUpdate);
        }

        public async Task deleteAsync(int fileID, int personID)
        {
            File objToDelete = await db.Files.FirstOrDefaultAsync(item => item.Id== fileID);
            if (objToDelete != null && objToDelete.CreatorId == personID)
            {
                db.Files.Remove(objToDelete);
                await db.SaveChangesAsync();
            }
        }
    }
}

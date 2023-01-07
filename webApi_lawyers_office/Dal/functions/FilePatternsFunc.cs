using Dal.converters;
using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.functions
{
    public class FilePatternsFunc : IfilePatterns
    {
        Layers_OfficeContext db;
        public FilePatternsFunc(Layers_OfficeContext _db)
        {
            db = _db;
        }

        public List<FilePatternsDto> GetAll()
        {
            return FilePatternsConverter.toDtoList(db.FilePatterns.ToList());
        }

        public FilePatternsDto GetById(int id)
        {
            try
            {
                return FilePatternsConverter.toDto(db.FilePatterns.First(obj => obj.Id == id));
            }
            catch
            {
                return null;
            }
        }

        public FilePatternsDto post(FilePatternsDto obj)
        {
            try
            {
                FilePattern newObj = db.FilePatterns.Add(FilePatternsConverter.toDal(obj)).Entity;
                db.SaveChanges();
                return FilePatternsConverter.toDto(newObj);
            }
            catch
            {
                throw;
            }

        }

        public async Task<FilePatternsDto> putAsync(FilePatternsDto obj)
        {
            FilePattern objToUpdate = await db.FilePatterns.FirstOrDefaultAsync(item=> item.Id== item.Id);
            objToUpdate.FilePatternName = obj.Title;
            objToUpdate.Access = obj.Access;
            await db.SaveChangesAsync();
            return FilePatternsConverter.toDto(objToUpdate);
        }

        public FilePatternsDto delete(int id)
        {
            try
            {
                FilePattern objToRemove = db.FilePatterns.First(item=> item.Id==id);
                db.FilePatterns.Remove(objToRemove);
                db.SaveChanges();
                return FilePatternsConverter.toDto(objToRemove);
            }
            catch
            {
                throw;
            }
        }
    }
}

using System;

namespace EntitiesDTO
{
    public class FilesDto
    {
        public int? Id { get; set; }
        public int BagId { get; set; }
        public int FilePatternId { get; set; }
        public byte[] Document { get; set; }
        public string? FileName { get; set; }
        public int CreatorId { get; set; }
        public DateTime? UploadingDate { get; set; }
        public int Access { get; set; }
        //public string? FileType { get; set; }
    }
}

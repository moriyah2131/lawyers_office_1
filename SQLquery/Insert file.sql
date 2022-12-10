GO
USE [Layers_Office]
GO

INSERT INTO [dbo].[Files]
           ([bag_id]
           ,[file_pattern_id]
           ,[file_name]
           ,[creator_id]
           ,[document]
		   )
     SELECT 3 AS [bag_id]
           ,3 AS [file_pattern_id]
           ,'ולר-אלתר חוזה.docx' AS [file_name]
           ,2 AS [creator_id]
           ,* FROM OPENROWSET(BULK N'F:\Documents\ולר-אלתר חוזה.docx', SINGLE_BLOB) AS [document]          
GO


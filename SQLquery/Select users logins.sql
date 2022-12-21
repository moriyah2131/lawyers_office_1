/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000)
	   [last_name]
      ,[email]
	  ,[user_password]
  FROM [Layers_Office].[dbo].[People]
  JOIN Users ON People.id = Users.person_id
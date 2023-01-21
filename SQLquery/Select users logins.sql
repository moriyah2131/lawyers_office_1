/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000)
		[person_id]
	  ,[last_name]
      ,[email]
	  ,[user_password]
	  ,[user_type]
  FROM [Layers_Office].[dbo].[People]
  JOIN Users ON People.id = Users.person_id

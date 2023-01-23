/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) 
      [bag_id]
      ,[action_id]
	  ,ap.action_pattern_name
	  ,Actions.whom_for_id
	  ,ap.whom_for
  FROM [Layers_Office].[dbo].[Actions_to_Bags]
  JOIN Actions ON action_id = Actions.id
  JOIN Action_patterns ap ON ap.id = action_pattern_id
  WHERE bag_id = 5
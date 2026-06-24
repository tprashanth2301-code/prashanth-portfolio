-- Generic Data Quality Check Templates

-- 1. Completeness: Check for NULLs in mandatory columns
SELECT COUNT(*) 
FROM {{table_name}} 
WHERE {{column_name}} IS NULL;

-- 2. Uniqueness: Check for duplicate primary keys
SELECT {{pk_column}}, COUNT(*)
FROM {{table_name}}
GROUP BY {{pk_column}}
HAVING COUNT(*) > 1;

-- 3. Validity: Check for values outside of allowed range
SELECT COUNT(*)
FROM {{table_name}}
WHERE {{column_name}} NOT BETWEEN {{min_val}} AND {{max_val}};

-- 4. Consistency: Check for referential integrity
SELECT COUNT(*)
FROM {{child_table}} c
LEFT JOIN {{parent_table}} p ON c.{{fk_column}} = p.{{pk_column}}
WHERE p.{{pk_column}} IS NULL;

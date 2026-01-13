# Claude Instructions - PAES Backend Project

## Project Overview
The main objetive of the front-end of the aplication. You must to show the data of the PAES. 

## Tech Stack
- **Language**: React
- **Deploy**: TypeScript and Docker
- **REST APIs**



## Coding Standards

## Development Guidelines

### Objetives 
   1- Showing a map (a nice map of the whole screen, that request the REGION Y COMUNA of Chile and then if the user select it, you can see the whole school in the comuna, showing the point using the latitut and longitud and the score of the PUNTAJE_PROMEDIO_2017_2026 as the value of the point. The Map should be like in black and white, and you should use a Google or other library to get the map of Chile)

## Common Tasks

### PAES Context
- PAES is the Chilean university admission test
- Multiple subjects: CLEC (Reading), MATE (Math), HCSOC (History/Social Sciences), CIEN (Sciences)
- Students from different educational backgrounds (RAMA_EDUCACIONAL)
- Various school dependencies (GRUPO_DEPENDENCIA)
- Regional data (CODIGO_REGION, CODIGO_COMUNA)

### Important Abbreviations
- RBD: School identification code
- COD_ENS: Teaching code
- CLEC: Competencia Lectora (Reading Comprehension)
- MATE1/MATE2: Mathematics tests
- HCSOC: Historia y Ciencias Sociales (History and Social Sciences)
- CIEN: Ciencias (Sciences)
- REG_ANTERIOR: Previous regular test
- INV_ANTERIOR: Previous winter test

## Security & Privacy
- All data files should remain in the data/ directory
- Do not commit raw data files to version control
- Handle student data responsibly
- Anonymize results when sharing analysis

## Testing
- Validate data integrity after each transformation
- Check for expected data ranges
- Verify aggregations make sense
- Test edge cases (missing data, outliers)


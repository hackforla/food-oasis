// TODO: build robust data validation for imported files

interface SchemaField {
  name: string;
  validation?: {
    isValid: (value: any) => Promise<boolean>;
  };
}

interface Row {
  id?: string | number;
  name: string;
  [key: string]: any;
}

interface ValidatedFields {
  _id: string | number | null;
  _name: string;
  [key: string]: any;
}

async function importValidation(
  rows: Row[],
  schema: SchemaField[],
  fieldNames: string[] | null = null
): Promise<ValidatedFields[]> {
  const validatedRows: ValidatedFields[] = [];

  for (const row of rows) {
    const validatedFields: ValidatedFields = {
      _id: row.id || null,
      _name: row.name,
    };

    const fieldsToValidate = fieldNames || Object.keys(row);
    
    for (const fieldName of fieldsToValidate) {
      // if we want to strictly enforce rows match schema
      // if (
      //   fieldName !== "tenantId" &&
      //   !schema.find((field) => field.name === fieldName)
      // ) {
      //   throw new Error(
      //     `${fieldName} field not found in schema. Please check if there are any missing, extra, or misspelled columns.`
      //   );
      // }

      const schemaField = schema.find((field) => field.name === fieldName);
      const validator = schemaField?.validation;

      if (validator) {
        const valid = await validator.isValid(row[fieldName]);
        validatedFields[fieldName] = valid;
      } else {
        validatedFields[fieldName] = "N/A";
      }
    }

    validatedRows.push(validatedFields);
  }
  
  return validatedRows;
}

export default importValidation;

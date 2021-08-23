// TODO: build robust data validation for imported files

function importValidation(rows, schema, fieldNames = null) {
  let validatedRows = [];
  rows.forEach((row) => {
    let validatedFields = {
      _id: row.id || null,
      _name: row.name,
    };

    fieldNames = fieldNames || Object.keys(row);
    fieldNames.forEach((fieldName) => {
      // if we want to strictly enforce rows match schema
      // if (
      // 	fieldName !== "tenantId" &&
      // 	!schema.find((field) => field.name === fieldName)
      // ) {
      // 	throw new Error(
      // 		`${fieldName} field not found in schema. Please check if there are any missing, extra, or misspelled columns.`
      // 	);
      // }

      const validator =
        schema.find((field) => field.name === fieldName) &&
        schema.find((field) => field.name === fieldName).validation;

      if (validator) {
        validator.isValid(row[fieldName]).then((valid) => {
          validatedFields[fieldName] = valid;
        });
      } else {
        validatedFields[fieldName] = "N/A";
      }
    });

    validatedRows.push(validatedFields);
  });
  return validatedRows;
}

export default importValidation;

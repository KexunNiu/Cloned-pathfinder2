/**
 * A readonly form component with a label and a value.
 * @param {*} param0
 * @returns
 */
const ReadonlyField = ({ label, value }) => {
  return (
    <div>
      {/* TODO: Implement custom formatting here? */}
      <h5 className="mb-2 block text-sm font-bold text-gray-700">{label}</h5>
      <p>{value}</p>
    </div>
  );
};


/**
 * A readonly form component that contains a list of ReadonlyField components. Takes a fieldMap object that has labels as keys and values as values.
 * @param {*} param0
 * @returns
 */
const ReadonlyForm = ({ fieldMap }) => {
  let fieldElements = [];

  for (const [key, value] of Object.entries(fieldMap)) {
    fieldElements.push(
      <ReadonlyField key={key} label={key} value={value} />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {fieldElements}
    </div>
  );
};


export { ReadonlyForm };

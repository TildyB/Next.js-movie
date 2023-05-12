
const safeParseFc = (schema, data) => {
  const result = schema.safeParse(data);
  if (result.success === false) {
    console.log(result.error);
    return null
  }
  return result.data;
}

export default safeParseFc;



const isObject = value => typeof value === 'object' && value !== null;

/*
  * Function to add create subobject
  * and remove _id from graphql
*/
const parseGraphQL = (obj) => {
  let innerObj = {};
  const parse = Object.keys(obj).find(e => e === 'graphql_create');
  if (parse) innerObj['create'] = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (!isObject(value) && parse && key !== 'graphql_create' && key !== '_id') {
      innerObj.create[key] = value;
    } else if (!isObject(value) && !parse) {
      innerObj[key] = value;
    }
    if (isObject(value)) {
      innerObj.create[key] = parseGraphQL(value)
    }
  });
  return  { ...innerObj }
}
module.exports = parseGraphQL;
import { faker } from "@faker-js/faker";

export const negtiveCasesProductCreate = [
  {
    description: "name less than min valid length",
    testData: { name: faker.string.alphanumeric({ length: 2 }) }
  },
  {
    description: "name more than max valid length",
    testData: { name: faker.string.alphanumeric({ length: 41 }) }
  },
  {
    description: "name has invalid format",
    testData: { name: faker.number.int({ min: 1, max: 99999 }) }
  },
  {
    description: "name with more than one space",
    testData: { name: `${faker.string.alphanumeric({ length: 8 })}  ${faker.string.alphanumeric({ length: 6 })}` }
  },
  {
    description: "price less than min valid",
    testData: { price: 0 }
  },
  {
    description: "price more than max valid",
    testData: { price: 100000 }
  },
  {
    description: "price is not a number",
    testData: { price: faker.string.alphanumeric({ length: 41 }) }
  },
  {
    description: "amount less than min valid",
    testData: { amount: -1 }
  },
  {
    description: "amount more than max valid",
    testData: { amount: 1000 }
  },
  {
    description: "amount is not a number",
    testData: { amount: faker.string.alphanumeric({ length: 41 }) }
  },
  {
    description: "notes length more than max valid",
    testData: { notes: faker.string.alphanumeric({ length: 251 }) }
  },
  {
    description: "notes with < symbol",
    testData: { notes: `${faker.string.alphanumeric({ length: 8 })} < ${faker.string.alphanumeric({ length: 6 })}` }
  },
  {
    description: "notes with > symbol",
    testData: { notes: `${faker.string.alphanumeric({ length: 8 })} > ${faker.string.alphanumeric({ length: 6 })}` }
  }
];

export const requiredFieldsCases = [
  {
    description: "missing required field: name",
    omitField: "name"
  },
  {
    description: "missing required field: price",
    omitField: "price"
  },
  {
    description: "missing required field: amount",
    omitField: "amount"
  },
  {
    description: "missing required field: manufacturer",
    omitField: "manufacturer"
  }
];
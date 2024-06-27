import { buildSchema } from "graphql";

const typeDefs = buildSchema(`
  type Person {
    id: String!
    firstName: String
    lastName: String
    carsOwned: [Car]
  }
  type Car {
    id: String!
    year: Int
    make: String
    model: String
    price: Float
    personId: String!
  }
  type Query {
    person(
      id: String!
    ): Person
    people: [Person]
    car(
      id: String!
    ): Car
    cars: [Car]
  }
  type Mutation {
    addPerson(
      id: String!,
      firstName: String!,
      lastName: String!
    ): Person
    updatePerson(
      id: String!,
      firstName: String!,
      lastName: String!
    ): Person
    removePerson(
      id: String!
    ): Person
    addCar(
      id: String!,
      year: Int!,
      make: String!,
      model: String!,
      price: Float!,
      personId: String!
    ): Car
    updateCar(
      id: String!,
      year: Int!,
      make: String!,
      model: String!,
      price: Float!,
      personId:
      String!
    ): Car
    removeCar(
      id: String!
    ): Car
  }
`);


export default typeDefs;

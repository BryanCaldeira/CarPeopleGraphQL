import { cars, people } from "./data";

import find from "lodash.find";
import remove from "lodash.remove";
import typeDefs from "./schema";

const resolvers = {
  Query: {
    people: () => people,
    person(root, args) {
      return find(people, { id: args.id });
    },
    cars: () => cars,
    car(root, args) {
      return find(cars, { id: args.id });
    },
  },
  Person: {
    carsOwned: (person) => {
      return cars.filter((car) => car.personId === person.id);
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };

      people.push(newPerson);
      return newPerson;
    },

    updatePerson: (root, args) => {
      const updatePerson = find(people, { id: args.id });

      if (!updatePerson) {
        throw new Error(`Couldn\'t find person with id ${args.id}`);
      } else {
        updatePerson.firstName = args.firstName;
        updatePerson.lastName = args.lastName;

        return updatePerson;
      }
    },

    removePerson: (root, args) => {
      const removePerson = find(people, { id: args.id });
      if (!removePerson) {
        throw new Error(`Couldn\'t find person with id ${args.id}`);
      } else {
        remove(people, (person) => {
          return person.id === removePerson.id;
        });

        remove(cars, (car) => {
          return car.personId === removePerson.id;
        });

        return removePerson;
      }
    },

    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };

      const checkPersonId = find(people, { id: args.personId });

      if (!checkPersonId) {
        throw new Error(`Couldn\'t find person with id ${args.personId}`);
      } else {
        cars.push(newCar);
        return newCar;
      }
    },

    updateCar: (root, args) => {
      const updateCar = find(cars, { id: args.id });

      if (!updateCar) {
        throw new Error("Couldnot find car with id " + args.id);
      } else {
        updateCar.year = args.year;
        updateCar.make = args.make;
        updateCar.model = args.model;
        updateCar.price = args.price;
        updateCar.personId = args.personId;
        return updateCar;
      }
    },

    removeCar: (root, args) => {
      const removeCar = find(cars, { id: args.id });
      if (!removeCar) {
        throw new Error("Couldnot find car with id " + args.id);
      } else {
        remove(cars, (car) => {
          return car.id === removeCar.id;
        });
        return removeCar;
      }
    },
  },
};

export { typeDefs, resolvers };

const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("missing password argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://phonebook:${password}@phonebook.l9akdha.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=phonebook`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
  return;
}

const name = process.argv[3];
const number = process.argv[4];

const person = new Person({ name, number });

person.save().then((result) => {
  console.log(`added ${name} number ${number} to phonebook`);
  mongoose.connection.close();
});

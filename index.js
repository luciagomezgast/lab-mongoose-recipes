const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipes-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Lemon Pie",
      level: "Amateur Chef",
      ingredients: [
        "6 Organic Lemons",
        "1 cup Flour",
        "1/3 cup milk",
        "6 Eggs",
        "1 cup sugar"
      ],
      cuisine: "American",
      dishType: "dessert",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 60,
      creator: "Chef Piepie",
    })
  }
  )
  .then((result)=>{
    console.log("success adding:", result.title )
    return Recipe.insertMany( data)
  })
  .then((result)=>{
    result.forEach((res)=>{
      console.log(res.title)
    })
    return  Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100}, {new:true})
  })
  .then(()=>{
    return Recipe.deleteOne({title:"Carrot Cake"})
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(()=>{
    console.log("disconected")
    mongoose.disconnect();
  })

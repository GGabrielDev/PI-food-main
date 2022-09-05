require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

// Test function to check the connectivity to the database.
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe, Diet } = sequelize.models;

// Aca vendrian las relaciones
const Recipe_Diets = sequelize.define(
  "recipe_diets",
  {
    dietId: {
      type: DataTypes.INTEGER,
      references: {
        model: Diet,
        key: "id",
      },
    },
    recipeId: {
      type: DataTypes.STRING,
      references: {
        model: Recipe,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

Recipe.belongsToMany(Diet, { through: Recipe_Diets });
Diet.belongsToMany(Recipe, { through: Recipe_Diets });

// Aqui el programa revisa si las dietas estan cargadas en la DB, sino, las carga.
const dietCreator = () => {
  const dietArray = [
    "gluten free",
    "dairy free",
    "ketogenic",
    "vegetarian",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "low fodmap",
    "whole 30",
  ];
  dietArray.forEach(async (dietName) => {
    const diet = await Diet.findOne({ where: { name: dietName } });
    if (diet === null) {
      await Diet.create({ name: dietName });
    }
  });
};

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  checkConnection,
  dietCreator,
};

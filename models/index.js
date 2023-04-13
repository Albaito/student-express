let { Sequelize, DataTypes } = require('sequelize')

let env = process.env.NODE_ENV || 'development'

let configFile = require(__dirname + '/../config.json')
let config = configFile[env]


let password = process.env.DB_PASSWORD

config.password = password

let db = {}

let sequelize =  new Sequelize(config)

let studentModel = require('./student')(sequelize, DataTypes)
db[studentModel.name] = studentModel

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
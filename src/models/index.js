import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",  // 172.17.0.2
    port: 5431,
    username: "postgres",
    password: "1234",
    database: "users"
})

try {
    await sequelize.authenticate()
    console.log("Connection success!");
} catch (err) {
    console.log("Catch error:", err);
}

export default sequelize
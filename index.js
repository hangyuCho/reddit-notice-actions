const dotenv = require('dotenv')
import getData  from "./src/getData"
dotenv.config();

const dailyReport = async () => {
    console.log(getData)
    const list = await getData("korea")
    console.log("report : ", list)
}

dailyReport()
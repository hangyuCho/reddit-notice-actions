const dotenv = require('dotenv')
import getData  from "./src/getData"
import sendReport from "./src/createReport"
dotenv.config();

const dailyReport = async () => {
    const list = await getData("apple")
    
    console.log("report : ", list)
    sendReport(list)
}

dailyReport()
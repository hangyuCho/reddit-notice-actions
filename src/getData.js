import axios from "axios"
import cheerio from "cheerio"

const selector1 = "#t3_p8uqj4 > div._1poyrkZ7g36PawDueRza-J > div > div._1Y6dfr4zLlrygH-FLmr8x- > div._2FCtq-QzlfuN-SwVMUZMM3.t3_p8uqj4 > div.y8HYJ-y_lTUHkQIc1mdCq._2INHSNB8V5eaWp4P0rY_mE > a > div > h3 > span"
const getReport = async(query) => {
    return await axios.get(`https://www.reddit.com/search/?q=${query}`)
    .then(html => {
        const $ = cheerio.load(html.data)
        let result = translate($(selector1).text())
        return result
    })
}

const getData = async (query) => {
    return await getReport(query)
}

const translate = async (query) => {
    var client_id = process.env.CLIENT_ID;
    var client_secret = process.env.CLIENT_SECRET;

    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var options = {
        url: api_url,
        form: {'source':'en', 'target':'ko', 'text':query},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    // return request.post(options,  (error, response, body) => {
    //   if (!error && response.statusCode == 200) {
    //     //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    //     res.end(body);
    //   } else {
    //     //res.status(response.statusCode).end();
    //     console.log('error = ' + response.statusCode);
    //   }
    // })
     let body = await axios.post(api_url, options.form, {
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    })
    return body.data.message.result.translatedText

}

export default getData
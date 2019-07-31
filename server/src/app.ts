import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();
app.set("port", 3000);

app.use(bodyParser.json());

app.listen(app.get("port"), () => {
    console.log("App is running")
});
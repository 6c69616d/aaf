import express from 'express';
import crmRoutes from './src/routes/crmRoutes';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 3000;

routes(app);

app.get('/', (req, res)=>
    res.send(`Node and express server is running on ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on ${PORT}`)
);
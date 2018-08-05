import * as dotenv from 'dotenv';
import 'module-alias/register';
import 'reflect-metadata';

import { App } from './app/app';

dotenv.config();
const app: App = new App();

app.run()
    .then(o => console.log(`> Running ${o.environment} server on http://localhost:${o.port}/`))
    .catch(error => console.log(error));

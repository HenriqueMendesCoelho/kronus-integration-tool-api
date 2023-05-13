import { app } from './app';
import { validationIfExistUser } from './startup';

process.env.TZ = 'America/Sao_Paulo';

app.listen(3333, () =>
  console.log(
    `Express started at http:localhost:3333 -> ${new Date().toLocaleString(
      'pt-Br'
    )}`
  )
);

validationIfExistUser();

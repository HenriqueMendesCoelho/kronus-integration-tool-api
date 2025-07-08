import { app } from './app';
import { validateFirstStart } from './startup';

process.env.TZ = 'America/Sao_Paulo';

const PORT = 3333;

app.listen(PORT, () =>
  console.log(
    `Express started at http://0.0.0.0:${PORT} -> ${new Date().toLocaleString(
      'pt-Br'
    )}`
  )
);

validateFirstStart();

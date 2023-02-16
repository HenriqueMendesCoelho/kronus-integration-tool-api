import { app } from './app';
import { validationIfExistUser } from './startup';

app.listen(3333, () => console.log('Express started at http:localhost:3333'));

validationIfExistUser();

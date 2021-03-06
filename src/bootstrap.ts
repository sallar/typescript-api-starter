require('dotenv').config();
import { connect as dbConnect } from './utils/db';
import { start as startServer, stop as stopServer } from './server';

dbConnect()
  .then(() => console.log('Connected to db'))
  .then(() => startServer(process.env.PORT || 4003))
  .then(() => console.log(`Server started at port ${process.env.PORT || 4003}`));

process.on('SIGTERM', () => {
  console.log('Caught SIGTERM, cleaning up...');
  stopServer();
  setTimeout(() => {
    console.log('Exiting...');
    process.exit(1);
  }, 15000);
});

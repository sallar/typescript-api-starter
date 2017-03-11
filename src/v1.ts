import * as express from 'express';

export const router = express.Router();

router.get('/test', (req, res, next) => {
  res.json([
    {
      id: 1,
      name: 'One'
    },
    {
      id: 2,
      name: 'Two'
    },
    {
      id: 3,
      name: 'Three'
    }
  ]);
});

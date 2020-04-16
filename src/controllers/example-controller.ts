import { Router } from 'express';
import { CREATED } from 'http-status-codes';

import * as example_facade from '../facades/example-facade';

const router = Router();

router.get('/', async (_, res) => {
  return res.send(await example_facade.getAll());
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const example = await example_facade.get(id);
    return res.send(example);
  } catch ({ status, message }) {
    return res.status(status).send(message);
  }
});

router.post('/', async (req, res) => {
  const example = req.body;
  try {
    await example_facade.addExample(example);
    return res.sendStatus(CREATED);
  } catch ({ status, message }) {
    return res.status(status).send(message);
  }
});

export default router;

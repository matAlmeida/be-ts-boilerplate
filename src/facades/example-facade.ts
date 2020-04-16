import { assertEquals, TypeGuardError } from 'typescript-is';

import example_service, { Example } from '../services/example-service';
import { NoContentError, BadRequestError } from '../models/errors';

const getAll = example_service.getExample;

const get = async (id: string): Promise<Example> => {
  const all_examples = await getAll();
  const filtered_examples = all_examples.find((e) => e.id === Number(id));

  if (filtered_examples) {
    return filtered_examples;
  }

  throw new NoContentError(`get example with id ${id}`);
};

const addExample = async (example: Example): Promise<void> => {
  try {
    assertEquals<Example>(example);
  } catch (error) {
    if (error instanceof TypeGuardError) {
      const errorMessage = `Expected "${error.path}" to be "${error.reason.type}"`;
      throw new BadRequestError(errorMessage);
    }
  }

  const all_examples = await getAll();

  const filtered_examples = all_examples.find((e) => e.id === example.id);

  if (filtered_examples) {
    throw new BadRequestError(`example with id ${example.id} already exists`);
  }

  example_service.addExample(example);
};

export { getAll, get, addExample };

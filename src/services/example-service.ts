import { Example } from '../models/entity/Example';

export { Example };

const EXAMPLES: Example[] = [
  {
    id: 1,
    name: 'Gabriel',
    email: 'gabrielr@take.net',
  },
  {
    id: 2,
    name: 'Chr0m1ng',
    email: 'gabrielrsantoss@icloud.com',
  },
];

const getExample = async (): Promise<Example[]> => EXAMPLES;

const addExample = async (example: Example): Promise<void> => {
  EXAMPLES.push(example);
};

export default { getExample, addExample };

import generate from 'nanoid/generate';

const randChars = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function genId(size: number) {
  return generate(randChars, size);
}

export function serialize(obj: any): string {
  return JSON.stringify(obj);
}

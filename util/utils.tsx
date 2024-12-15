export function randomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

export function randomArrayElem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

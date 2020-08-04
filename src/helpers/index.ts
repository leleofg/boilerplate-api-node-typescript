export function onlyNumbers(str: string): string {
  return str.replace(/[^0-9]/gu, "");
}

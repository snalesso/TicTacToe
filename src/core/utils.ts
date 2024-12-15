export default function calcActiveFields(map: { [key: string]: boolean }): readonly string[] {
  return Object.entries(map).filter(([_, v]) => v).map(([k, _]) => k);
}
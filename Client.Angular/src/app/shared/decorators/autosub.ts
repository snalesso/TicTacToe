export function Autosub() {
  console.log("second(): factory evaluated");
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
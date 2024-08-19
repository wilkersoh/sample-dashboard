export namespace StringHelper {
  export const truncate = (value: string, max: number) => {
    if (value.length > max) return value.slice(0, max) + "...";
    return value;
  };
}

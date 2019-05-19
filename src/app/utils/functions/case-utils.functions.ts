export class CaseUtilsFunctions {
  public static generateComponentId() {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
}

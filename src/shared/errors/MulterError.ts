class MulterError {
  public readonly name: string;

  public readonly message: string;

  public readonly code: string;

  constructor(message: string, code = '400', name: string) {
    this.name = name;
    this.message = message;
    this.code = code;
  }
}

export default MulterError;

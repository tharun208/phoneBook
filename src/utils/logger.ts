interface defaultLog {
  [key: string]: string | number;
}
export default class Logger {
  private defaultLog: defaultLog;
  constructor(private name: string) {
    this.defaultLog = { name };
  }
  log(message: string, obj?: any) {
    console.log(
      JSON.stringify({
        ...this.defaultLog,
        message,
        ...obj,
      })
    );
  }
  info(message: string, obj?: any) {
    console.error(
      JSON.stringify({
        ...this.defaultLog,
        severity: 'INFO',
        message,
        ...obj,
      })
    );
  }
  warn(message: string, obj?: any) {
    console.error(
      JSON.stringify({
        ...this.defaultLog,
        severity: 'WARNING',
        message,
        ...obj,
      })
    );
  }
  error(message: string, err: any, obj?: any) {
    console.error(
      JSON.stringify({
        ...this.defaultLog,
        severity: 'ERROR',
        message,
        ...err,
        ...obj,
      })
    );
  }
}

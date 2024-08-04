import * as rTracer from 'cls-rtracer';

export class LoggerUtil {
  static info = (...args: any[]) => {
    console.info(`${rTracer.id()}`, ...args);
  };

  static warn = (...args: any[]) => {
    console.warn(`${rTracer.id()}`, ...args);
  };

  static error = (...args: any[]) => {
    console.error(`${rTracer.id()}`, ...args);
  };
}

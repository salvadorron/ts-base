export interface Logger {
  error(message: string, detail?: any): void
  log(message: string, detail?: any): void
  info(message: string, detail?: any): void
  debug(message: string, detail?: any): void
  cleanLog?(messge: string): void
}

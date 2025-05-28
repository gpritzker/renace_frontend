export const sleep = (seconds: number = 1) => {
  return new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000))
}

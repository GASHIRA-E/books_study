const log = (message: string, userId?: string) => {
  console.log(message, userId);
}

log('Error');

log('Error', '1234');

const add = (...num: number[]) => {
  return num.reduce((total, n) => total + n, 0);
}

function generateDate(this: Date) {
  return `${this.getMonth() + 1}/${this.getDate()}`;
}
generateDate.call(new Date);

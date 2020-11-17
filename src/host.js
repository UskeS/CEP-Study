class Hoge {
    constructor() {
      this.x = 10;
      this.y = 2;
    }
    add() {
      return this.x + this.y;
    }
  }
  const exp = (x, y) => x ** y;
  const hoge = new Hoge();
  console.log(exp(hoge.x, hoge.y));
  console.log(hoge.add());
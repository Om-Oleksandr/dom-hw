class Slider {
  constructor(collection = [], currentIndex = 0) {
    this.collection = collection;
    this.currentIndex = currentIndex;
  }
  set collection(value) {
    if (Array.isArray(value) === false) {
      throw new TypeError("must be Array");
    }
    this._collection = value;
  }
  get collection() {
    return this._collection;
  }
  set currentIndex(value) {
    if (
      typeof value !== "number" ||
      value < 0 ||
      Number.isInteger(value) === false
    ) {
      throw new Error("must be positive integer");
    }
    this._currentIndex = value;
  }
  get currentIndex() {
    return this._currentIndex;
  }
  get currentSlide() {
    return this._collection[this._currentIndex];
  }
  get nextIndex() {
    return (this._currentIndex + 1) % this.collection.length;
  }
  get prevIndex() {
    return (this._currentIndex - 1 + this.collection.length) % this.collection.length;
  }
}


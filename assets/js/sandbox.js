const createAdder =
  (initialValue = 0) =>
  (m) =>
    (initialValue += m);

const add = createAdder(50);

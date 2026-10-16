class ArrayInitializers
{
  int[] empty = {};
  int[] numbers = { 1, 2, 3, 4, 5 };
  String[][] matrix = { { "a", "b" }, { "c", "d" } };
  String[] longOnes =
  {
    "aaaaaaaaaaaaaaaaaaaaaaa",
    "bbbbbbbbbbbbbbbbbbbbbbb",
    "ccccccccccccccccccccccc",
  };
  String[][] longMatrix =
  {
    { "aaaaaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbb" },
    { "c", "d" },
  };

  @SuppressWarnings({ "unchecked", "rawtypes" })
  void arrays(int x)
  {
    Object[] created = new Object[] { 1, 2, 3 };
    switch (x)
    {
      case 1 -> assertArrayEquals(new Object[] { 1, 2, 3 }, array);
      default -> assertArrayEquals(
        new Object[] { "aaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbb" },
        array
      );
    }
  }
}

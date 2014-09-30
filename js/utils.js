// A better alternative to
//   array.indexOf(value) >= 0;
// because this works with `value` being
// an array as well.
var arrayContains = function(array, value) {
  return array.some( function(row) {
    return row.toString() == value.toString();
  });
};

// Returns the index of the array `sub` in the
// super-array `array`.
var subArrayIndex = function(array, sub) {
  for (var i = 0; i < array.length; i++) {
    if ( array[i].toString() == sub.toString() ) {
      return i;
    }
  }
  return -1; // 'not found'
}

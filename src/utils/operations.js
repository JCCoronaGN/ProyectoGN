
function compact (array) {
    return array.filter(function (element) {
      return !!element
    })
  }
  export {compact};
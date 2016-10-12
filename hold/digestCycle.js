//Digest cycle stuff
$scope.$apply()
// which actually calls
$scope.digest()
watchers exist for each place that value is considered
For each watcher, if the watched value has changed since the previous digest cycle, the watcher's listener function gets called.

$scope.$apply(doSomething)
is nearly equivalent to

doSomething();
$scope.digest();
  except $scope.$apply has good error handling, is wrapped in a try/catch block

  $scope.watch('enabled', function(val){
    console.log('enabled changed');
  })
  or
  $scope.$watchCollection(): to watch an array
  $scope.$watchGroup() to watch a group of expressions
  Thus to make things easier for the developer, special services such as $http and $timeout are provided to encapsulate the asynchronous operation to keep track of when it starts and ends.

Therefore, if you're using an Angular service that performs an asynchronous operation, chances are that you don't need to call $scope.$apply(). However, if you're listening on DOM events or waiting for an external event to complete itself then you'll need to run $scope.$apply() on your own.

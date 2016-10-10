Angular provider
Only gives the value once..
mod.provider("myProvider", function() {
    this.$get = function() {
        return "My Value";
    };
});
http://www.simplygoodcode.com/2015/11/the-difference-between-service-provider-and-factory-in-angularjs/
Provider vs Factory vs Service

So in summary, provider, factory, and service are all providers. A factory is a special case of a provider when all you need in your provider is a $get() function. It allows you to write it with less code. A service is a special case of a factory when you want to return an instance of a new object, with the same benefit of writing less code.

Setting up a basic service to get emails
  Use it for things you would use a constructor for.
function InboxService($http) {
this.getEmails = function getEmails() {
  return $http.get('/emails');
};
}
//
angular
.module('app')
.service('InboxService', InboxService);
////
function InboxController(InboxService) {
  InboxService
    .getEmails()
    .then(function (response) {
      // use response
    });
}
angular
  .module('app')
  .controller('InboxController', InboxController);
  Conclusion
  Both .service() and .factory() are both singletons as you’ll only get one instance of each Service regardless of what API created it.

Remember that .service() is just a Constructor, it’s called with new, whereas .factory() is just a function that returns a value.

Using .factory() gives us much more power and flexibility, whereas a .service() is essentially the “end result” of a .factory() call. The .service() gives us the returned value by calling new on the function, which can be limiting, whereas a .factory() is one-step before this compile process as we get to choose which pattern to implement and return.

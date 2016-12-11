angular.module('myApp.service',[])
.factory('DataSource', ['$http',function($http){
 return {
   get: function(file,callback,transform){
    $http.get(
      file,
      {transformResponse:transform}
      ).
    success(function(data, status) {
      console.log("Request succeeded");
      callback(data);
    }).
    error(function(data, status) {
      alert(status);
      console.log("Request failed " + status);
    });
  }
};
}]);

angular.module('myApp',['myApp.service', 'ngSanitize']);

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination','myApp.service','ngSanitize']);

function MyController($scope,DataSource) {

  var post_file = "../xml/Posts.xml";
  var badge_file = "../xml/Badges.xml";
  var users_file = "../xml/Users.xml";
  var comments_file = "../xml/Comments.xml";

  xmlTransform = function(data) {
    console.log("transform data");
    var x2js = new X2JS();
    var json = x2js.xml_str2json( data );
    // Local storage commented due to cache size exception
    // window.localStorage['LocalPosts'] = angular.toJson(json.posts.row);
    // var accessData = window.localStorage['LocalPosts'];
    // console.log(json.posts.row);
    // return json.users.row;
    // return json.comments.row;
    return json.posts.row;
    // return accessData;
  };

  setData = function(data) {
    $scope.dataSet = data;
  };
  // if (localStorage.getItem("infiniteScrollEnabled") === null) {
  DataSource.get(post_file,setData,xmlTransform);
  // }else{
  //   var accessData = window.localStorage['LocalPosts'];
  //   return accessData;
  // }

  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.go = function(param) {
    $scope.username = param;
  }
}

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
}

myApp.controller('MyController', MyController);
myApp.controller('OtherController', OtherController);
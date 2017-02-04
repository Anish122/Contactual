/**
 * Created by MIcKeY on 29/01/17.
 */
var app = angular.module("contactual",[]);

app.controller("userloginController", function ($scope, $http) {

    $scope.togglePanel = function() {
        $scope.isSigninPanelDisabled = !($scope.isSigninPanelDisabled);
        $scope.isSignupPanelDisabled = !($scope.isSignupPanelDisabled);
        $scope.submitted = false;
    }

    $scope.clearForm = function() {
        $scope.user = '';
        $scope.newuser ='';
    }

    $scope.registerUser = function() {
        //{ userName: "Anish", age: 25, dob: "30/11/1991", email: "agarwalanish91@gmail.com", phone: 8754534902, password: "testing", cpassword: "testing" }
        console.log("Registering user.... ");
        $http.post('/registerUser', $scope.newuser).success(function(response){
            console.log("User registered!!");
            $scope.newuser = '';
            //TODO :to refresh page when user is successfully registered. refresh();
            });
    };

    $scope.authorizeUser = function() {

        console.log($scope.user);
    };

});

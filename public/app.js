//Declaratie van de app
var app = angular.module('app', ['ngRoute']);
// Configuratie van de app o.a. routing
app.config(function configure($routeProvider){
	$routeProvider
		.when('/', { controller: 'CustomersController', templateUrl: './templates/customers.html'})
		.when('/customer/:id', { controller: 'CustomersController', templateUrl: './templates/customer.html'})
		.otherwise({ redirect: '/'});
}
//Gebruik maken van de functie 'factory', waardoor klanten/transacties toegevoegd kunnen worden
app.factory('Data', function Data($http){
	return {
		//CRUD-functies voor klanten
		getCustomers : 	 function getCustomers()			{ return $http.get('/customer/all');},
		getCustomers : 	 function getCustomers(id)			{ return $http.get('/customer?id='+ id);},
		addCustomers : 	 function getCustomers(data)		{ return $http.post('/customers',data);},
		removeCustomers: function removeCustomers(id) 		{ return $http.delete('/customers?id='+id);},
		//CRUD-functies voor transacties
		getTransactions: 	function getTransactions(id) 	{ return $http.get('/transactions?id='+id);},
		addTransactions: 	function addTransactions(data)	{ return $http.post('/transactions?',data);},
		removeTransactions: function removeTransactions(id) { return $http.delete('/transactions?id='+id);}
		}
	}
);
//Controller voor beheer van klanten
app.controller('CustomersController', function CustomersController($scope, Data){
		Data.getCustomers().success(parseCustomers);
			//Functie voor het verwerken van klantgegevens
			function parseCustomers(data) { 
				$scope.customers = data; 
			}

			$scope.newCustomer  = { name: '', email: ''};

			$scope.addCustomers = { function addCustomer(){
				var names = $scope.newCustomer.name.split(' ');
				Data.addCustomer({ 
					first_name: names[0], 
					last_name: names[1], 
					email: $scope.newCustomer.email
				})
				.success(customerAddSuccess).error(customerAddError); 
			}
			//Success
			function customerAddSuccess(data){
				$scope.error= null;
				$scope.customer.push(data);
				$scope.newCustomer = { name: '', email: ''}; 
			}
			//Error
			function customerAddError(data) { 
				$scope.error = data; 
			}			
		}			
	}
});
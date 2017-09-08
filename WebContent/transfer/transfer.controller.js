(function () {
    'use strict';

    angular
        .module('app')
        .controller('TransferController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$scope', '$location', '$http', '$timeout', 
    	'$interval', 'uiGridConstants', 'uiGridGroupingConstants'];
    function HomeController(UserService, $rootScope, $scope, $location, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants) {
        var vm = this;
        var isDragging = false;
        var dStart = false;
        var dEnd = false;
        var initX = 0;
        var initY = 0;
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        var gridApi;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            console.log('Swati',$rootScope.globals.currentUser.email,$rootScope.globals.currentUser.password);
            var Indata = {'email': $rootScope.globals.currentUser.email, 'password': $rootScope.globals.currentUser.password };
            $http.post('http://18.220.138.212:8080/clogin/',Indata)
  		   .then(function (response) {

  		    var data = response.data;
  		    var status = response.status;
  		    var statusText = response.statusText;
  		    var headers = response.headers;
  		    var config = response.config;
  		    $scope.amountCheck = data.userDetails.amountCheck;
  		    $scope.amountDeposit = data.userDetails.amountDeposit;
  		    $scope.amountSaving = data.userDetails.amountSaving;
  		    vm.user = data.userDetails;
  		    console.log(vm.user);
  		}).catch(function (err) {console.log(err)});
        }

        function loadCurrentUser() {
            /*UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });*/
        }


        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
        //$scope.transfer='';
        $scope.transferMoney = function(amount){
        	console.log($scope.selected.value,$scope.selected.value1,amount);
        	if($scope.selected.value!=undefined && amount!=undefined && amount!=null && amount!= ""){
        		var Indata = {'email': $rootScope.globals.currentUser.email, 'accountType': $scope.selected.value.name, 'amount':amount.transfer };
                $http.post('http://18.220.138.212:8080/ctransfer/',Indata)
      		   .then(function (response) {

      		    var data = response.data;
      		    var status = response.status;
      		    var statusText = response.statusText;
      		    var headers = response.headers;
      		    var config = response.config;
      		    $scope.amountCheck = data.userDetails.amountCheck;
      		    $scope.amountDeposit = data.userDetails.amountDeposit;
      		    $scope.amountSaving = data.userDetails.amountSaving;
      		    console.log(data);
      		   });
        	}
        }
        
        $scope.button = function (text){
        	console.log("Inside button:", isDragging, text);
            if(isDragging) 
            	isDragging=false;
            else{
            	//dStart = false;
            	if(text == 'Transfer'){
            		console.log("Inside button12");
            		$location.path('/transfer');
            		//$location.path('#!/register');
            	} else if (text == 'Home'){
            		$location.path('/');
            	} else if (text == 'Accounts'){
            		$location.path('/accounts');
            	} else if (text == 'My Profile'){
            		$location.path('/profile');
            	}
            	
            }
        	
        }
        $scope.list1 = [];
        $scope.list2 = [];
        $scope.list3 = [];
        $scope.list4 = [];
        
        $scope.list5 = [
          { 'title': 'Reports', 'drag': true },
          { 'title': 'Analytics', 'drag': true },
          { 'title': 'Export', 'drag': true },
          { 'title': 'Nav item', 'drag': true },
          { 'title': 'Nav item again', 'drag': true },
          { 'title': 'One more nav', 'drag': true },
          { 'title': 'Another nav item', 'drag': true },
          { 'title': 'Another nav item', 'drag': true }
        ];
        $scope.account = [{name: 'Savings'},
        	{name: 'Checking'},
        	{name: 'Deposit'}
        ]
        $scope.itemArray = [
            {id: 1, name: 'Savings'},
            {id: 2, name: 'Checking'},
            {id: 3, name: 'Deposit'}
        ];

        $scope.selected = { value: $scope.itemArray[0] };
        $scope.people = [
            { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
            { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
            { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
            { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
          ];

        // Limit items to be dropped in list1
        $scope.optionsList1 = {
          accept: function(dragEl) {
            if ($scope.list1.length >= 3) {
              return false;
            } else {
              return true;
            }
          }
        };
        $scope.alert = function(text) {
        	console.log("Inside alert:", $scope.droppedObjects.findIndex(i => i.title === text));
            if(isDragging) 
            	isDragging=false;
            else{
            	//dStart = false;
            	alert(text); 
            	 $scope.droppedObjects.splice($scope.droppedObjects.findIndex(i => i.title === text));
            }
        };
        
        $scope.alert1 = function(text) {
        	alert(text);
        };
        
        $scope.listItems = [{
            name: "Home",
            title: "Home"
          }, {
            name: "Accounts",
            title: "Accounts"
          }, {
            name: "Transfer",
            title: "Transfer"
          }, {
              name: "My Profile",
              title: "My Profile"
          }, {
              name: "Deposit",
              title: "Deposit"
          }, {
              name: "Reports",
              title: "Reports"
          }, {
              name: "Analytics",
              title: "Analytics"
          }, {
              name: "Bill Pay",
              title: "Bill Pay"
          } ];
        
          $scope.droppedObjects = [];
          $scope.input = {};
        
          // drag complete over drop area
          $scope.onDragComplete = function(data, evt) {
            console.log("drag success, data23:", data);
            var index = $scope.droppedObjects.indexOf(data);
            if (index > -1) {
              $scope.droppedObjects.splice(index, 1);
            }
          }
          
          // drop complete over drop area
          $scope.onDropComplete = function(data, evt) {
        	dStart = false;
        	isDragging=false;
        	 initX=0;
            console.log("drop success, data:", data);
            var index = $scope.droppedObjects.indexOf(data);
            if (index == -1){
            	$scope.droppedObjects.push(data);
                $scope.active = 'active';	
            }
              
          }
          
          // drop complete over input box
          $scope.onDropCompleteInput = function(data, evt) {
            console.log("drop on input success, data:", data);
            $scope.input = data;
          }
          
          // drop complete over items area (remove from dropped list)
          $scope.onDropCompleteRemove = function(data, evt) {
            console.log("drop success - remove, data:", data);
            var index = $scope.droppedObjects.indexOf(data);
            if (index != -1 && isDragging == true){
            	console.log('sw');
                $scope.droppedObjects.splice(index);
            }
            else{
            	console.log('sw1');
            	isDragging=false;
            }
            	
            console.log('index',$scope.droppedObjects.length);
            if($scope.droppedObjects.length == 0){
            	$scope.active = null;	
            }
            dStart = false;
      	  	isDragging=false;
      	  	initX=0;
          }
          
          // other draggable events handlers

          var onDraggableEvent = function(evt, data) {
        	 isDragging=true;
            console.log("128", "onDraggableEvent",evt.name, isDragging, dStart);
            if(evt.name == 'draggable:start' && dStart != true)
            	console.log(1,isDragging,dStart,initX);
            	if(initX==0){
            		dStart = true;
            		isDragging=true;
            		initX = data.x;
                	initY = data.y;
            	}
            	
            if(evt.name == 'draggable:end' && dStart == false){
            	console.log(2,isDragging,dStart);
            	isDragging=false;
            	initX = 0;
            	initY = 0;
            } else if(evt.name == 'draggable:end' && dStart == true){
            	if(initX == data.x && initY == data.y){
            		console.log(3,initX,initY,data.x,data.y);
            		isDragging=false;
            	}
            	//isDragging=false;
            }
            console.log("129", "onDraggableEvent",evt.name, isDragging, dStart);
            //console.log("128", "onDraggableEvent", evt.name, data.x);
          }
          $scope.$on('draggable:start', onDraggableEvent);
          //$scope.$on('draggable:move', onDraggableEvent);
          $scope.$on('draggable:end', onDraggableEvent);
          
          $scope.myDataSource = {
                  chart: {
                      caption: "Balance",
                      subCaption: "Accounts",
                  },
                  data:[{
                      label: "Savings",
                      value: "4000"
                  },
                  {
                      label: "Deposit",
                      value: "5600"
                  },
                  {
                      label: "Checkings",
                      value: "1200"
                  }]
                };
          
          $scope.gridOptions = {
        		    data: 'myData',
        		    enableCellEditOnFocus: true,
        		    enableColumnResizing: true,
        		    enableFiltering: true,
        		    enableGridMenu: true,
        		    showGridFooter: true,
        		    showColumnFooter: true,
        		    fastWatch: true,
        		    rowIdentity: getRowId,
        		    getRowIdentity: getRowId,
        		    exporterMenuPdf: false,
        		    importerShowMenu: false,
        		    exporterMenuVisibleData: false,
        		    importerDataAddCallback: function importerDataAddCallback( grid, newObjects ) {
        		      $scope.myData = $scope.data.concat( newObjects );
        		    },
        		    columnDefs: [
        		      { name:'id', width:50 },
        		      { name:'age', width:100, enableCellEdit: true, aggregationType: uiGridConstants.aggregationTypes.avg, 
        		    	  treeAggregationType: uiGridGroupingConstants.aggregation.AVG },
        		    	  { name:'name', width:100 }
        		      ],
        		    onRegisterApi: function onRegisterApi(registeredApi) {
        		      gridApi = registeredApi;
        		    }
        		  };
        		 
        		  function getRowId(row) {
        		    return row.id;
        		  }
        		 
        		  $scope.toggleFilterRow = function() {
        		    $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        		    gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        		  };
        		 
        		  $scope.callsPending = 0;
        		 
        		  $http.get('/data/500_complex.json')
        		  .then(function (response) {

        		    var data = response.data;
        		    var status = response.status;
        		    var statusText = response.statusText;
        		    var headers = response.headers;
        		    var config = response.config;

        		    $scope.gridOptions.data = data;
        		    $scope.myData = data;
        		    console.log(data);
        		}).catch(function (err) {console.log(err)});
        		  
        		  
        		  
    }

})();
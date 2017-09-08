(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

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
        	{"S No": "1", "Account Number": 23, "Transaction Date": "04/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":23456},
        	      {"S No": "2", "Account Number": 23, "Transaction Date": "05/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":67},
        	{"S No": "3", "Account Number": 23, "Transaction Date": "06/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":3434},
        	{"S No": "4", "Account Number": 23, "Transaction Date": "07/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":56},
        	      {"S No": "2", "Account Number": 12233456, "Transaction Date": "05/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":67},
        	{"S No": "3", "Account Number": 12233456, "Transaction Date": "06/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":3434},
        	{"S No": "4", "Account Number": 23, "Transaction Date": "07/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":56},
        	      {"S No": "2", "Account Number": 123456, "Transaction Date": "05/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":67},
        	{"S No": "3", "Account Number": 123456, "Transaction Date": "06/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":3434},
        	{"S No": "4", "Account Number": 123456, "Transaction Date": "07/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":56},
        	      {"S No": "2", "Account Number": 123456, "Transaction Date": "05/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":67},
        	{"S No": "3", "Account Number": 123456, "Transaction Date": "06/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":3434},
        	{"S No": "4", "Account Number": 123456, "Transaction Date": "07/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":56},
        	      {"S No": "2", "Account Number": 123456, "Transaction Date": "05/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":67},
        	{"S No": "3", "Account Number": 123456, "Transaction Date": "06/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":3434},
        	{"S No": "4", "Account Number": 123456, "Transaction Date": "07/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":56},
        	      {"S No": "2", "Account Number": 123456, "Transaction Date": "05/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":67},
        	{"S No": "3", "Account Number": 123456, "Transaction Date": "06/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":3434},
        	{"S No": "4", "Account Number": 123456, "Transaction Date": "07/09/2017","Transaction Remark":"BIL/001285218452/credit/HDFCCARD_JICI56","CR/DR":"CR","Amount":56}
        	       
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
            	//alert(text); 
            	 $scope.droppedObjects.splice($scope.droppedObjects.findIndex(i => i.title === text));
            }
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
            var index = $scope.droppedObjects.indexOf(data);
            if (index == -1){
            	$scope.droppedObjects.push(data);
                $scope.active = 'active';	
            }
              
          }
          
          // drop complete over input box
          $scope.onDropCompleteInput = function(data, evt) {
            $scope.input = data;
          }
          
          // drop complete over items area (remove from dropped list)
          $scope.onDropCompleteRemove = function(data, evt) {
            var index = $scope.droppedObjects.indexOf(data);
            if (index != -1 && isDragging == true){
                $scope.droppedObjects.splice(index);
            }
            else{
            	isDragging=false;
            }
            	
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
            if(evt.name == 'draggable:start' && dStart != true)
            	if(initX==0){
            		dStart = true;
            		isDragging=true;
            		initX = data.x;
                	initY = data.y;
            	}
            	
            if(evt.name == 'draggable:end' && dStart == false){
            	isDragging=false;
            	initX = 0;
            	initY = 0;
            } else if(evt.name == 'draggable:end' && dStart == true){
            	if(initX == data.x && initY == data.y){
            		isDragging=false;
            	}
            	//isDragging=false;
            }
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
var pushNotMod = angular.module('pushNotificationModule', []);
    pushNotMod.factory('pushNotificationService', function($q, $ionicPopup, $ionicPlatform){

        var deferred  = $q.defer();
        document.addEventListener("deviceready", function(){
            deferred.resolve(PushNotification);

            var push = PushNotification.init({ "android":
                                                            {"senderID": "714035949489"},
                                                        "ios":
                                                            {"alert": "true",
                                                            "badge": "true",
                                                            "sound": "true"},
                                                            "windows": {} } );
                     push.on('registration', function(data) {
                         var register_id = data.registrationId;
                         var data = {user_app_id: register_id, platform:''};
                         var isIOS = ionic.Platform.isIOS();
                         if(isIOS){
                           console.log('iOS device detected');
                           data.platform = "ios";
                         }
                         $.ajax({
                             url:"http://cinemagharhd.com/php/register_user_app.php",
                             type:"POST",
                             data: data,
                             success: function(data){
                                console.log("Device successfully registered : "+ JSON.stringify(data));
                              }
                         });
                         console.log("registration event fired");
                         console.log(JSON.stringify(data));
                     });

                     push.on('notification', function(data) {
                        console.log("notification event :");
                         console.log(JSON.stringify(data));

                         $ionicPopup.show({
                            title: "<h4><span class='title'>"+data.title+"</span></h4>",
                            template: "<span>"+data.message+"</span>",
                            buttons:[{
                                text:'OK',
                                type: "button-positive"
                            }]
                         })

                             push.finish(function () {
                             console.log('finish successfully called');
                         });
                     });

                     push.on('error', function(e) {
                         console.log("push error");
                     });
    }, false);

    return deferred.promise;

<<<<<<< HEAD
    });
=======
    });	
         
    
>>>>>>> parent of 4cd1727... before new implementation of player

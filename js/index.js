/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //CODE UNDER THIS!
        this.receivedEvent('deviceready');

        //Including firebase
        var config = {
            apiKey: "AIzaSyB5oZuvylRr_LwK4cbC12RZWYpLYoQKBoI",
            authDomain: "photoplay-2018.firebaseapp.com",
            databaseURL: "https://photoplay-2018.firebaseio.com",
            projectId: "photoplay-2018",
            storageBucket: "photoplay-2018.appspot.com",
            messagingSenderId: "204245404390"
        };
        firebase.initializeApp(config);

        // Write
        // getElementById
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
        document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture);
        document.getElementById("speichern").addEventListener("click", speichern);
        document.getElementById("cameraUploadPicture").addEventListener("click", cameraUploadPicture);
        //document.getElementById("weiter").addEventListener("click", weiter);

        // readDB();
    },



    receivedEvent: function(id) {


        console.log('Received Event: ' + id);
    }


};
    //Fotoeigenschaften
    function cameraTakePicture(){

        console.log(cameraTakePicture);

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            correctOrientation: true,
            targetWidth: 300,
            targetHeight: 200
    });
    //Foto ausgeben
    function onSuccess(imageData)
{
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
}
    //Alert
    function onFail(message) {
        alert('Failed because: ' + message);
    }
}


function cameraGetPicture() {

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true,
        targetWidth: 300,
        targetHeight: 200
    });

    function onSuccess(imageURL) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageURL;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

}


//Upload pic in Firebase
function cameraUploadPicture(imageData){
    var storageRef = firebase.storage().ref('/');
    var timestamp = Math.round(+new Date()/1000);
    var picture = storageRef.child('fname' + timestamp + '.jpg');

    picture.putString(imageData, 'base64', {contentType:'image/jpg'});

    setTimeout(function(){
        downloadLink(picture);
    }, 500);

}

function downloadLink(picture) {
    picture.getDownloadURL().then(function(url){
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + String(url);
    }).catch(function(error){
        console.log(error);
    });
}



function speichern() {
    var name = document.getElementById("fname").value;

    var obj = {};
    obj = {
        "name": name
    };

    console.log(obj);
    writeFirebaseObject(obj);

    console.log("verschickt");
}

function getdbId() {
    var database = firebase.database();

    return("null");
}

function writeFirebaseObject(obj){
    firebase.database().ref("name/").push(obj);
}

function readDB(){
    var firebaseHeadingRef = firebase.database().ref("name");

    firebaseHeadingRef.on('value', function (datasnapshot){
        consolge.log(datasnapshot.val());
    });
    console.log("anzahl");
}




/*function weiter() {
        document.getElementById('fname');
        document.getElementById('speichern');
}*/




//Menu-Bar
window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};




/*function onDeviceReady() {
    console.log(navigator.camera);
}*/

app.initialize();
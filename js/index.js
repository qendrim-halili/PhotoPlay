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

        this.receivedEvent('deviceready');

        //local Storage
        window.localStorage.setItem("id", "546");
        var value = window.localStorage.getItem("id");
        console.log(value);

        // Schrib wat wötsch
       // document.getElementById('suchen').addEventListener('click', suchen, false);
       // document.addEventListener('click', init);
        document.getElementById("cameraTakePicture").addEventListener
        ("click", cameraTakePicture);


    },


    receivedEvent: function(id) {


        console.log('Received Event: ' + id);
    }


};

function cameraTakePicture(){

console.log(cameraTakePicture);

navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL });

    function onSuccess(imageData)
{
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
}





/*let init = {
    function () {
        document.getElementById('foto').addEventListener('click', app.takephoto);
    },
    takephoto: function () {
        let opts = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
        };

        navigator.camera.getPicture(app.ftw, app.wtf, opts);
    },
    ftw: function (imgURI) {
        document.getElementById('msg').textContent = imgURI;
        document.getElementById('photo').src = imgURI;

    },
    wtf: function (msg) {
        document.getElementById('msg').textContent = msg;
    }
};*/



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
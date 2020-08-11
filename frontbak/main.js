function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
    const selectCamera = document.querySelector('select#videoSource');
    const screenshotButton = document.querySelector('#screenshot-button');
    const img = document.querySelector('#resultPic');
    // const img = document.querySelector('#resultPic');
    const canvas = document.createElement('canvas');
    const videoElement = document.querySelector('video');
    const sendToBackend = document.querySelector('#sendToBackend');
    
    navigator.mediaDevices.enumerateDevices()
        .then(gotDevices)
        .then(getStream)
        .catch(handleError);

    selectCamera.onchange = getStream;

    screenshotButton.onclick = videoElement.onclick = function() {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0);
        // Other browsers will fall back to image/png
        img.src = canvas.toDataURL('image/webp');
    };

    sendToBackend.onclick = (e) => {
        // e.preventDefault();
        alert('Process...');
        var data = new FormData();
        jQuery.each(jQuery('#avatar')[0].files, function(i, file) {
            data.append('file-'+i, file);
        });
        jQuery.ajax({
            url: 'http://localhost:3001/api/face',
            data: data,
            // cache: false,
            // contentType: false,
            // processData: false,
            method: 'POST',
            type: 'POST', // For jQuery < 1.9
            success: function(data, textStatus) {
                if (data.redirect) {
                    alert('data.redirect', data.redirect);
                    console.log('data.redirect', data.redirect);
                    // data.redirect contains the string URL to redirect to
                    window.location.href = data.redirect;
                } else {
                    // data.form contains the HTML for the replacement form
                    alert('data.form', data.form);
                    console.log('data.form', data.form);
                    $("#myform").replaceWith(data.form);
                }
            }
        });
        // var dataURL = canvas.toDataURL('image/jpg');
        // // var xhttp = new XMLHttpRequest();
        // // xhttp.onreadystatechange = function() {
        // //     if (this.readyState == 4 && this.status == 200) {
        // //     //   document.getElementById("demo").innerHTML = this.responseText;
        // //         dataURL;
        // //     }
        // //   };
        // // xhttp.open("POST", "http://localhost:3001/api/face", true);
        // // xhttp.send();
        // $.ajax({
        //     type: "POST",
        //     url: "http://localhost:3001/api/face",
        //     data: { 
        //        imgBase64: dataURL
        //     }
        // }).done(() => {
        //     alert('Send success');
        // }).catch(err => alert(`Send failed ${JSON.stringify(err)}`));
    }

    function gotDevices(deviceInfos) {
        for (let i = 0; i !== deviceInfos.length; ++i) {
            const deviceInfo = deviceInfos[i];
            const option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            
            if (deviceInfo.kind === 'videoinput') {
                option.text = deviceInfo.label || 'camera ' + (selectCamera.length + 1);
                selectCamera.appendChild(option);
            } else {
                console.log('Found another kind of device: ', deviceInfo);
            }
        }
    }

    function getStream() {
        if (window.stream) {
            window.stream.getTracks().forEach(function(track) {
                track.stop();
            });
        }
      
        const constraints = {
            video: {
                deviceId: {exact: selectCamera.value}
            }
        };
      
        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotStream)
            .catch(handleError);
    }

    function gotStream(stream) {
        window.stream = stream;
        videoElement.srcObject = stream;
    }

    function handleError(error) {
        console.error('Error: ', error);
    }
} else {
    alert('Camera access is not supported by your browser, please update your browser');
}
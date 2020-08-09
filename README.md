# 1. What is React Face Recognition
Simple web application for face recognition using ***React*** as front end. ***Node*** and ***Express*** as back end.
***AWS Rekognition / Google Vision API*** for face recognition service.

# 2. How to use
This web app will uses user cameras to take picture and then recognize the faces inside taken picture, it will return message
based on result, whether the face is exist or not.

Therefore it is required for the user to give access to the camera. 

# 3. Project structure
This project consists of two main folder, _front/_ and _back/_, which represent **front end** and **back end**

# 4. How to run this project on local environment
Node and NPM must be installed in your local machine.

After project is forked or downloaded, if you want to run some command line, don't forget to move into designated folder.

For example, if you want to run backend using ```npm start``` then dont forget to open command prompt (cmd) inside the folder
_react_face_recognition/back_ and vice versa for front end.


**FRONT END SIDE :**

Because this project required camera then you must connect or turn on your camera on your laptop/PC.

Don't forget to give permission to the browser to access the camera.


**BACK END SIDE :**
1. Run this on the command prompt ```npm install``` to install required node packages.
2. After successfully installed, type ```nodemon``` into command prompt for run backend server. Make sure port 3001 is not used. 
3. If success there will be message in command prompt.
```
    App is running on http://localhost:3001
    [nodemon] restarting due to changes...
    [nodemon] starting `node server.js`
```

# 5. Link
1. [Capturing Audio & Video in HTML5 by Eric Bidelman](https://www.html5rocks.com/en/tutorials/getusermedia/intro/)
2. [Web component for React](https://www.npmjs.com/package/react-webcam)
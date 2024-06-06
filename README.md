### Steps to run the project

1 Clone the repository: git clone https://github.com/Akash-Rajmane/Abhiman-Chat-App.git

2 Install dependencies: npm install

3 Create a .env file and add the following environment variables:
PORT=
JWT_SECRET=
DB_PORT=3306
DATABASE=
DB_USER=
DB_HOST=
DB_PASSWORD=
CLIENT_ENDPOINT=http://localhost:3000

4 Run the application: npm start


### API ENDPOINTS

##### 'api/sign-up'  
##### Type: POST 
##### Fn: To sign up the user
##### SAMPLE JSON
{
    "userId": "user",
    "deviceId": "device456",
    "name": "John Doe",
    "phone": "+12340",
    "password": "hashed_password"
}


##### 'api/login'  
##### Type: POST 
##### Fn: To log the user in
##### SAMPLE JSON
{
    "phone": "+12390",
    "password": "user12"
}

##### 'api/profile/:userId'  
##### Type: GET 
##### Fn: To get user profile data


##### 'api/friend-requests'  
##### Type: POST 
##### Fn: To send a friend request
##### SAMPLE JSON
{
    "receiverId":"u1"
}

##### 'api/chatrooms'  
##### Type: POST 
##### Fn: To create a chat room 
##### SAMPLE JSON
{
    "plan":"1 year"
}

##### 'api/joinroom'  
##### Type: POST 
##### Fn: To join a chat room 
##### SAMPLE JSON
{
    "roomId":"r1",
    "password": "pw"
}

##### 'api/messages'  
##### Type: POST 
##### Fn: To send a message in a chat room
##### SAMPLE JSON
{
    "roomId":"r1",
    "content":"Hi, a msg from postman"
}

##### 'api/messages/:roomId'  
##### Type: POST 
##### Fn: To get all the messages in a chat room


##### 'api/buy-prime'  
##### Type: POST 
##### Fn: To buy the prime membership
##### SAMPLE JSON
{
    "plan":"1 year"
}

##### 'api/buy-coins'  
##### Type: POST 
##### Fn: To buy the coins
##### SAMPLE JSON
{
    "coins": "500" 
}







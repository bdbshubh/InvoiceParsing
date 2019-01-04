# ScheduleOnce
MarcoPolo and Digital Character
ScheduleOnce

In this programming folder you will find 2 tasks and 1 theory answer mentioned below:
1. MarcoPolo Game
2. When is it a good idea to not use NodeJs? Why? -------->> This is explained at the end of this README file.
3. Parse Invoice Numbers

For both tasks I have created web services (REST APIs) and the endpoint for both APIs are mentioned below with their detailed description.

1. For the MarcoPolo Game:
	Endpoint: localhost:3000/gameapi
	Query string: n (required)
	n shuold be less than or equal to 1000000 and should be a number (as explained in question)
	For eg: localhost:3000/gameapi?n=1000000

3. For Parsing Invoice Number:
I have created an API in which when you hit its endpoint it will ask you to upload the file (your invoice character file) and once you click on upload button, you will get a downloaded file with the name 'output.txt'. In this 'output.txt' file you will get your parsed invoice numbers.
	Endpoint: localhost:3000


Prerequisites:
1. Node
2. npm
3. Install all dependencies(npm-packages)---> [express, body-parser, formidable, path, fs].
	To install see below syntax:
	npm i <npm-package name>
4. Before hit the endpoints please make sure your server should be up and running. To run the server, copy below command on command prompt or gitbash, under the project directory:
	node app.js


**********************************************************************************************************

2. When is it a good idea to not use NodeJs? Why?
It is not advisable to use Node.js for CPU intensive applications such as grid computing or for any blocking computations. This means when any computer application demands a lot of computation then use of Node.js is not a good approach. Because node.js is a single threaded, event driven, non-blocking(asynchronous) server-side platform.

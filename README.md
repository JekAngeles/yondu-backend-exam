Yondo Backend Exam Submission (By: Jason Eric Angeles)

below are the scripts used for migration and seeders. I used npm-sequelize.

For creating migration file for table `users`:

`sequelize model:generate --name User --attributes firstName:string,lastName:string,address:string,postcode:string,phone:string,email:string,username:string,password:string`

For initiating migration process: 

`sequelize db:migrate`

For creating seeder file:

`sequelize seed:generate --name user-seeder`

For initiating seeding process:

`sequelize db:seed:all`

Guide on testing script
1. Import "Yondu Tests.postman_collection" from root directory of repo onto Postman. That should import a Collection named "Yondu Tests".
2. On the right hand side of the collection name, click the arrow icon then click "Run". It should pop out a Collection Runner
3. Tick all of the tests then click "Run Yondu Tests". All 10 test cases should pass.

## Deploy app

1. `yarn build`
2. Create zip file from the `build folder`, `prisma folder` & `package.json` file
3. upload to `https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/environment/dashboard?applicationName=slackql&environmentId=e-ncggdtm4p6`

## Create elastic beanstalk service

1. Head to `https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/applications`
2. Create a new application
3. Keep all presets
4. Add additional config
5. Scroll down to database and click modify
6. Select Postgres
7. Select db.t3.micro
8. Create username & password
9. Click create and wait 10 mins
10. On the Left click `Configuration` Edit `Software` scroll to the bottom & add in environment variables

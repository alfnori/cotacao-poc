This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Some advice

### Test configuration for Linux:

If you got some errors about watcher (or like error recursive-readdir/test/testdir/b/b ENOSPC) when running tests try to execute in terminal:

### `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

### Running jest:
-u updates snaps, --coverage to update % --silent without console.log
### `jest -u --coverage --silent`





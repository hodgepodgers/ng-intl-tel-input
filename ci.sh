npm install && ./node_modules/bower/bin/bower install
nohup ./node_modules/http-server/bin/http-server &
./node_modules/jshint/bin/jshint *.js
./node_modules/karma/bin/karma start karma.conf.js
./node_modules/protractor/bin/webdriver-manager update
./node_modules/protractor/bin/protractor protractor.conf.js


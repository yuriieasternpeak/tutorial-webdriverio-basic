FROM selenium/standalone-chrome-debug
RUN apt-get update
RUN apt-get install -y nodejs
RUN npm install
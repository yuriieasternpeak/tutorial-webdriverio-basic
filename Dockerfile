FROM selenium/standalone-chrome-debug
RUN sudo apt update
RUN sudo apt install -y nodejs
RUN sudo apt install -y npm
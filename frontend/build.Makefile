all: build run

retrieve:
    git clone -b static-build --single-branch https://github.com/UAlberta-CMPUT401/pathfinder-2
run:
    docker run -d -p 80:80 static
build:
    docker image build -t static .
build:
	docker build -t react-app .
build-production:
	docker build -t react-app-production -f Dockerfile.production .
build-dev:
	docker build -t react-app .
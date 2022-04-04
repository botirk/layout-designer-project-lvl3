run:
	npx gulp

clean:
	rm -rf build

install:
	npm install

lint:
	npx stylelint ./src/**/*.scss
	npx htmlhint ./src/*.html

deploy:
	npx surge ./src/

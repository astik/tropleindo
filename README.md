# tropleindo

> Display various metrics through graphs

Because "There is "tropleindo chez Chachado" =)

Web application is available on http://astik.github.io/tropleindo.
It is a full client-side application ; everything is stored into the browser's local storage, be sure to purge it wisely !

## Getting Started

This project requires Grunt `0.4.5` to build

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
git clone https://github.com/astik/tropleindo.git
cd tropleindo
npm install
bower install
```

## Development

To launch a development web server :
```shell
grunt serve
```


## Release

To release a new version (depending of the version update you want) :
```shell
grunt release
#grunt release:patch
#grunt release:major
#grunt release:minor
```

Check grunt-release documentation for more informations : https://github.com/geddski/grunt-release

## Release web application

To launch a development web server :
```shell
grunt ghDeploy
```


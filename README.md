# WebFaas - Server
WebFaaS Server AWS for [node](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

### Example
```shell
curl -XPOST "http://localhost:8080/@webfaaslabs/math:sum/0" -H "content-type:application/json" -d '{"x":2,"y":3}' -v
```
## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@webfaas/webfaas-server.svg
[npm-url]: https://npmjs.org/package/@webfaas/webfaas-server

[travis-image]: https://img.shields.io/travis/webfaas/webfaas-server/master.svg?label=linux
[travis-url]: https://travis-ci.org/webfaas/webfaas-server

[coveralls-image]: https://img.shields.io/coveralls/github/webfaas/webfaas-server/master.svg
[coveralls-url]: https://coveralls.io/github/webfaas/webfaas-server?branch=master
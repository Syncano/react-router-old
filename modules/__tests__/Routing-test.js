var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');
var Router = require('../index');
var Route = require('../components/Route');
var { Foo, Bar, Nested } = require('../TestUtils');

describe('creating routes from ReactChildren', function () {
  it('works with falsy children', function (done) {
    var routes = [
      <Route handler={Foo} path="/foo"/>,
      null,
      <Route handler={Bar} path="/bar"/>,
      undefined
    ];

    Router.run(routes, '/foo', function (Handler, state) {
      var html = ReactDOMServer.renderToString(<Handler/>);
      expect(html).toMatch(/Foo/);
      done();
    });
  });

  it('works with comments', function (done) {
    var routes = [
      <Route handler={Nested} path="/foo">
        // This is a comment.
        <Route handler={Bar} path="/bar"/>
      </Route>
    ];

    Router.run(routes, '/bar', function (Handler, state) {
      var html = ReactDOMServer.renderToString(<Handler/>);
      expect(html).toMatch(/Bar/);
      done();
    });
  });
});

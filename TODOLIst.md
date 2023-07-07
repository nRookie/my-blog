#

use JWT


#

show different page based on the user role.



#

    throw new ERR_HTTP_HEADERS_SENT('set');
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:393:5)
    at ServerResponse.setHeader (node:_http_outgoing:644:11)
    at ServerResponse.header (/Users/kestrel/playground/js/react-project/my-blog-backed/node_modules/express/lib/response.js:794:10)
    at ServerResponse.send (/Users/kestrel/playground/js/react-project/my-blog-backed/node_modules/express/lib/response.js:174:12)
    at ServerResponse.json (/Users/kestrel/playground/js/react-project/my-blog-backed/node_modules/express/lib/response.js:278:15)
    at /Users/kestrel/playground/js/react-project/my-blog-backed/server.js:272:29
    at /Users/kestrel/playground/js/react-project/my-blog-backed/models/User.js:28:20
    at /Users/kestrel/playground/js/react-project/my-blog-backed/node_modules/bcryptjs/dist/bcrypt.js:297:21
    at /Users/kestrel/playground/js/react-project/my-blog-backed/node_modules/bcryptjs/dist/bcrypt.js:1353:21
    at Immediate.next (/Users/kestrel/playground/js/react-project/my-blog-backed/node_modules/bcryptjs/dist/bcrypt.js:1233:21) {
  code: 'ERR_HTTP_HEADERS_SENT'
}

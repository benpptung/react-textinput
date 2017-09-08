module.exports = [
  {
    name: 'react',
    nature: 'js',
    files: [
      'site/polyfill-object.assign.js',
      'prop-types',
      'react',
      'site/react-dom.js'
    ],
    browserify: {
      // Cannot use `*` here, because `*` automatically expose npm module name.
      // In this stack, we have to do some tricks to build react
      exposes: 'prop-types, react, react-dom.js:react-dom'
    }
  },
  {
    name: 'bundle',
    nature: 'js',
    files: [
      'inherits',
      'inject-css',
      'component-emitter',
      'react-style-prefix'
    ],
    browserify: {
      exposes: '*'
    }
  },
  {
    name: 'react-textinput',
    nature: 'js',
    files: 'rendering.js',
    watch: 'rendering.js, lib/**/*.*',
    browserify: {
      // add React Add-Ons, if this component needs them
      externals: [
        'prop-types', 'react', 'react-dom',
        'inherits',
        'inject-css',
        'component-emitter',
        'react-style-prefix'
      ]
    }
  }
]
Example of adapting yeoman angular generator to grunt-reduce
============================================================

Take a look at the commit log to see how to adapt your gruntfile to replace the default build taske with a custom one that uses grunt-reduce for building your web application.

Please note that grunt-reduce only concerns itself with postprocessing. So if you need any preprocessors like coffee or compass, set them up to output their files in `app` so you have a working web application in `app`.

When you run `yeoman build` all your preprocessors will run. Then grunt-reduce will run and built your application for you.

When you have made the changes you see in this changelog, run the following commands:
```
npm install
yeoman build
```

Questions and issues
====================

Please direct any question or issues here:
https://github.com/Munter/grunt-reduce/issues

module.exports = (/browserify$/).test(process.argv[1]) ? (function (req){
  try {
    return req('./browser' + 'ify');
  } catch(_){}
}(require)) : require('./lib/main.js')

npm i dotenv // download locally, must commit
npm i dotenv --save-dev // download locally, no need to commit, saves only locally

npm i chalk --save-dev // another package, can be found at
# https://www.npmjs.com/package/chalk
the link is used to see what the package is capable of



running on a different machine? Simply do
# npm i
to download all dev and prod dependencies
# npm i --omit=dev 
to only download production dependencies

# npm remove [packageName] 
to delete package files locally


yarn is better to use





by default devs use CommonJS modules, but sometimes devs also use ECMAModules (required for working with typeScript)

CommonJS always runs synchronously



Cycled modules in js are auto-detected by node, which creates unexpected, but safe environment
example
Main Start > Main require(A) > A require(B) > B NOT require(A), skip this require > A complete > Main require(B) > B require(A) > A NOT require(B), skip this require > B complete > Main complete!
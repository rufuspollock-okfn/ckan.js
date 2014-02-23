A Javascript client library for [CKAN][] designed for both the browser and
NodeJS.

The library provides full support for accessing both the CKAN Catalog and [CKAN
DataStore API][ckan-api].

It also provides a [Recline compatible backend][recline-backend].

[CKAN]: http://ckan.org/
[ckan-api]: http://docs.ckan.org/en/latest/datastore-api.html
[recline-backend]: http://reclinejs.com/docs/backends.html
[Recline]: http://reclinejs.com/

## Installing

### Browser

Just add the `ckan.js` to your page.

```
<script src="ckan.js"></script>
```

You can also use our hosted one:

```
<script src="http://okfnlabs.org/ckan.js/ckan.js"></script>
```

### Node

```
npm install ckan
```

Then in your code:

```
var CKAN = require('ckan')
```


## Usage

Usage is generally similar across Node and Browser versions.

Callback structure follows Node conventions, that is:

`function(err, data)`

### Catalog

Set it up:

```
var catalog = new CKAN.Catalog('http://my-ckan-site.com');

// You can also provide an API key (for operations that require one)
var catalog = new CKAN.Catalog('http://my-ckan-site.com', 'my-api-key');
```

Use the [action API][]

[action API]: ...

```
catalog.action('dataset_create', { name: 'my-dataset' }, callback)
```
### DataStore

Set it up:


```
// as for Catalog you can provide an API key if needed
var datastore = new CKAN.DataStore('http://my-ckan-site.com');
```

Search a Dataset Resource (see `datastore_search` for details of options)

```
datastore.search({resource_id: '...', q: '...'});
```


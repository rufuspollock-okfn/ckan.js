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
var client = new CKAN.Client('http://my-ckan-site.com');

// You can also provide an API key (for operations that require one)
var client = new CKAN.Client('http://my-ckan-site.com', 'my-api-key');
```

You can now use any part of the [action API][]:

[action API]: http://docs.ckan.org/en/latest/api/index.html

```
client.action('action_name', data, callback)
```

For example, to create a dataset using `dataset_create` action you would do:

```
client.action('dataset_create', { name: 'my-dataset' }, function(err, result) {
  console.log(err);
  console.log(result);
})
```

### DataStore

The DataStore is also supported via the action API so use is also via the standard Client.

Search a Dataset Resource (see `datastore_search` for details of options)

```
client.action('dataset_search', {resource_id: '...', q: '...'}, function(err, out) {
  console.log(err, out);
});
```

### Recline JS Backend

This module also provides a Recline compatible backend available as:

`recline.backend.Ckan`

The backend supports `fetch` and `query` but no write APIs at the present time.



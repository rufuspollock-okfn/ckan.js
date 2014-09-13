A Javascript client library for [CKAN][] designed for both the browser and
NodeJS.

The library provides full support for accessing both the CKAN Catalog and [CKAN
DataStore API][ckan-api].

It also provides a [Recline compatible backend][recline-backend].

[CKAN]: http://ckan.org/
[ckan-api]: http://docs.ckan.org/en/latest/maintaining/datastore.html#the-datastore-api
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

Here's a more complex example showing several commands to do a Dataset upsert
(create if not exists, otherwise update):

```
var datasetInfo = {
  name: 'ckan.js-example',
  title: 'CKAN.JS Example',
  tags: ['amazing']
};
client.action('dataset_show', { id: datasetInfo.name }, function(err, out) {
  // dataset exists
  if (!err) {
    // TODO: you'd really want to extend the existing dataset object returned
    // in out with the datasetInfo we have but we are being simple here
    client.action('dataset_update', datasetInfo, cb);
  } else {
    client.action('dataset_create', datasetInfo, cb);
  }
});
```

### DataStore

The DataStore feature of CKAN allows you to store structured data in CKAN and
to create a rich API for it. It is also accessible via the action API -
[details in the docs here][datastore] - and and you can therefore access using
the CKAN client. Here are a few examples:

[datastore]: http://docs.ckan.org/en/latest/maintaining/datastore.html

#### Store Data

Store data into the DataStore for an existing resource

```
// 2 rows or data (with columns/fields named 'A' and 'B'
var data = [
  { A: 1, B: 2 },
  { A: 10, B: 16}
];
// the id of a CKAN DataSet resource (the data that we store will be associated with that resource)
// this resource will need to already exist
resourceId = 'abc-efg';
client.action('datastore_create', {
    resource_id: resourceId,
    records: data
  },
  function(err) {
    if (err) console.log(err);
    console.log('All done');
  })
```

Store data into a new DataStore resource:

```
// the id of a CKAN dataset that already exists
packageId = 'the-best-dataset-ever';
client.action('datastore_create', {
    resource: {package_id: packageId},
    records: data
  },
  function(err) {
    if (err) console.log(err);
    console.log('All done');
  })
```

Here's an example of loading data from a CSV file into the DataStore:

```
// npm's csv file
var csv = require('csv');
csv()
  .from('path/to/csv-file.csv', {columns: true})
  .to.array(function(data, count) {
    client.action('datastore_create', {
        resource_id: resourceId,
        records: data
      },
      function(err) {
        if (err) console.log(err);
        console.log('All done');
      })
    })
    ;
```

#### Search Data

Search data using the Data API - see [`datastore_search`][ds-search] for
details of options:

[ds-search]: http://docs.ckan.org/en/latest/maintaining/datastore.html#ckanext.datastore.logic.action.datastore_search

```
client.action('datastore_search', {
    resource_id: '...',
    q: '...'
  },
  function(err, out) {
    if (err) console.log(err);
    console.log(out);
  })
});
```

Or using SQL support:

```
client.action('datastore_search_sql', {
    sql: '...'
  },
  function(err, out) {
    if (err) console.log(err);
    console.log(out);
  })
});
```

There are also a couple of nice wrapper methods:

```
// queryObj should be like the Recline Query structure
// http://okfnlabs.org/recline/docs/models.html#query
client.datastoreQuery(queryObj, function(err, out) {
  // out will follow recline structure, viz
  {
    total: ..
    fields: ... (fields will have Recline / JSON Table Schema types)
    hits: array of results ...
  }
});
```

And for SQL

```
client.datastoreSqlQuery(sql, function(err, out) {
  // out will follow recline structure, viz
  {
    total: ..
    fields: ... (fields will have Recline / JSON Table Schema types)
    hits: array of results ...
  }
});
```

### Recline JS Backend

This module also provides a Recline compatible backend available as:

`recline.backend.Ckan`

The backend supports `fetch` and `query` but does not provide write support at
the present time.


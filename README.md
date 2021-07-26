![JacobEM](https://jacobem.com/assets/media/JacobEM.png)


# Omeka Subject Heading Extractor

Omeka Subject Heading Extractor is a node.js application for retrieving all the subject headings from an Omeka website.
This application uses the Omeka API to get all items which it then formats into a custom JSON object. This object is then searched through and then all duplicates are discarded.


![Version: 3.2](https://img.shields.io/badge/Version-3.2-00e0a7)

![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC--BY--SA-776bff)
## Documentation

### How to run

Simply run the `run.bat` script, this will open your terminal executing the script on Node.JS.

Alternatively, you can simply run
```bash
node OSHE.js
```

**Note:** Please see the [Dependecies](#dependecies).

### How to use

You will be prompted to input your Omeka site's items API URL. Example: https://example.com/api/items/

Then the program will prompt you for a search query. Example: Toast

The program will then return non duplicated values related* to your query.

*If an item had the query you are searching for, it would count other subjects found on that particular item to be 'related', and therefor shown to the user.

### Dependecies

* You must have Node.JS installed.

Once Node.JS is installed please run the following to install the necessary dependencies.
```bash
npm install
```

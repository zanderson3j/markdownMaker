const fs = require('fs');
const gitlog = require('gitlog');

const options =
    { repo: __dirname + '/kroger-basket'
    , number: 10
    , fields:
      [ 'hash'
      , 'subject'
      , 'authorName'
      , 'authorDateRel'
      ]
    , execOptions:
      { maxBuffer: 200 * 1024
      }
    };

// Asynchronous (with Callback)
gitlog(options, function(error, commits) {

  let dataString = '# Change Log\n\n';
  let re = new RegExp('v[0-9].[0-9].[0-9]');

  for(let i = 0; i < commits.length; ++ i)
  {
    if(re.test(commits[i].subject)) {
      dataString += "## " + commits[i].subject + "\n\n";
    }
    else {
      dataString += "### commit " + commits[i].hash + "\n* Author: " + commits[i].authorName
                  + "\n* Date: " + commits[i].authorDateRel + "\n\n" + commits[i].subject + "\n\n";
    }
  }

  fs.writeFile('markedDownFile.md', dataString, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});

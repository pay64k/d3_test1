var treeDataORG = [
{
  "name": "System1",
  "parent": "null",
  "children": [
  {
    "name": "BTS1",
    "parent": "System1",
    "children": [
    {
      "name": "Radio1-1",
      "parent": "BTS1"
    },
    {
      "name": "Radio1-2",
      "parent": "BTS1"
    },
    {
      "name": "Radio1-3",
      "parent": "BTS1"
    },
    {
      "name": "Radio1-4",
      "parent": "BTS1"
    },
    {
      "name": "Radio1-5",
      "parent": "BTS1"
    }
    ]
  },
  {
    "name": "BTS2",
    "parent": "System1",
    "children": [
    {
      "name": "Radio2-1",
      "parent": "BTS2"
    },
    {
      "name": "Radio2-2",
      "parent": "BTS2"
    },
    {
      "name": "Radio2-3",
      "parent": "BTS2",
      "children": [
      {
        "name": "Radio8-1",
        "parent": "Radio2-3"
      }],
    },
    {
      "name": "Radio2-4",
      "parent": "BTS2"
    },
    ]
  }
  ]
}
];

var treeData = [
{
  "name": "Client1",
  "parent": "null",
  "type": "Client",
  "children": [],
  "inner_children": []
}
];

var treeDataEMPTY = [];

{
  "name": "Client1",
  "parent": "null",
  "type": "Client",
  "children": [
    {
      "name":"System1",
      "parent":"Client1",
      "children":[
        {
          "name":"Radio1",
          "type":"Radio",
          "parent":"System1",
          "children":[]
        },
        {
          "name":"Radio2",
          "type":"Radio",
          "parent":"System1",
          "children":[]
        }
      ]
    }
  ]
}
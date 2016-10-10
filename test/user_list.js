export const Permissions = [
  {name: 'read'}, {name: 'write'}, {name: 'delete'}, {name: 'modify'}
];

export const Usertypes = [
  {name: 'developer'}, {name: 'admin'}, {name: 'consumer'}
];

export const UsertypeToPermissionMap =
  {
    developer: ['read', 'write', 'delete', 'modify'],
    admin: ['read', 'write', 'delete', 'modify'],
    consumer: ['read']
  };

export const users = [
  {
    email: 'admin123@gmail.com',
    name: 'Cool Dude',
    password: 'password',
    active: true
  },
  {
    email: 'admin@gmail.com',
    name: 'Al Gore',
    password: 'password',
    active: true
  },
  {
    email: 'developer_admin@gmail.com',
    name: 'Lulz Cat',
    password: 'password',
    active: true
  },
  {
    email: 'user@gmail.com',
    name: 'Monarail Kitty',
    password: 'password',
    active: true
  },
  {
    email: 'inactiveDude@gmail.com',
    name: 'Sloth Coder',
    password: 'password',
    active: false
  }
];
export const userTypesAssignments = [2, 2, 1, 3, 1];

export const projects = [
  {
    name: 'Polo Shirts Christmas Promo',
    description: 'Doner pork loin sirloin tri-tip sausage flank cupim.'
  },
  {
    name: 'Jeggings Promo Site',
    description: 'Tenderloin landjaeger drumstick frankfurter doner.'
  },
  {
    name: 'Hat Sale',
    description: 'Kinfolk jean shorts magna echo park blue bottle health goth, paleo try-hard church-key selfies yuccie sed asymmetrical narwhal. Pour-over velit aliquip, twee narwhal farm-to-table raclette.'
  },
  {
    name: 'Parade Collectables',
    description: 'Prosciutto capicola bacon fatback beef ribs. Brisket alcatra pig spare ribs pastrami.'
  },
  {
    name: 'Christmas Sweaters',
    description: 'Brisket alcatra pig spare ribs pastrami.'
  },
  {
    name: 'Rugged Wear Specials Promo',
    description: 'Unicorn hoodie kinfolk, occupy taxidermy photo booth disrupt viral hella knausgaard letterpress normcore brunch scenester vaporware.'
  },
  {
    name: 'Cat Costumes',
    description: 'Flexitarian leggings raclette, wolf tbh lomo waistcoat keytar chicharrones sriracha tacos blog trust fund pickled.'
  },
  {
    name: 'Scarf Blowout',
    description: 'Four loko venmo 3 wolf moon, pug subway tile raclette flannel drinking vinegar stumptown hoodie.'
  },
  {
    name: 'Cool Hats',
    description: 'Bushwick keffiyeh vice pour-over kale chips, skateboard four dollar toast yuccie crucifix you probably havent heard of them pork belly bicycle rights forage four loko.'
  },
  {
    name: 'Hipster Wear',
    description: 'Pitchfork echo park skateboard, DIY umami bespoke cronut taxidermy gastropub tousled sriracha jianbing XOXO. '
  }
];

export const categories = [
  {
    name: 'assets',
    visible: true
  },
  {
    name: 'banners',
    visible: true
  },
  {
    name: 'brands',
    visible: true
  },
  {
    name: 'pages',
    visible: true
  },
  {
    name: 'scripts',
    visible: false
  }
];

export const datatypes = [
  {
    name: 'asset',
    description: 'asset',
    visible: true,
    categoryId: 1
  },
  {
    name: 'script',
    description: 'some scripts 2',
    visible: true,
    categoryId: 2
  },
  {
    name: 'script',
    description: 'some scripts 3',
    visible: true,
    categoryId: 3
  },
  {
    name: 'script',
    description: 'some scripts 4',
    visible: true,
    categoryId: 4
  },
  {
    name: 'script',
    description: 'some scripts 5',
    visible: true,
    categoryId: 5
  }
];
export const fields = [
  {
    name: 'Text',
    description: 'Text Input',
    required: true,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'CSS',
    description: 'some CSS',
    required: true,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'Gallery Field',
    description: 'a Gallery Field',
    required: true,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'Image Field',
    description: 'a Image Field',
    required: true,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'Select List',
    description: 'a Select List',
    required: true,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'Gallery Field',
    description: 'a Gallery Field',
    required: true,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'Date',
    description: 'a Date',
    required: true,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'Gallery Field',
    description: 'a Gallery Field',
    required: false,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'Geolocation',
    description: 'a Geolocation Field',
    required: false,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'End Date',
    description: 'an End Date',
    required: false,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  },
  {
    name: 'Field Label',
    description: 'a Gallery Field',
    required: false,
    dataJSON: {stuff: "stuff", mosttuff: "yet mo stuff"}
  }
];
export const assets = [
  {
    name: 'Lots of Macys Logos',
    description: 'very useful logos',
    url: 'http://www.macys.com'
  },
  {
    name: 'Style Guide',
    description: 'some style guides',
    url: 'http://www.newstimes.com'
  },
  {
    name: 'Partner links',
    description: 'some HTML',
    url: 'http://www.amazon.com'
  }
];

export const entries = [
  {
    title: 'Some Web Stuff',
    projectId: 1,
    datatypeId: 1,
    visible: true,
    categoryId: 1,
    data: {
  "some_stuff": "Oyoba",
  "entry": "Multi-channelled",
  "entryTwo": "Synergistic encompassing circuit"
    }
  },
  {
    title: 'Some Web Stuff Two',
    projectId: 1,
    datatypeId: 2,
    visible: true,
    categoryId: 1,
      data: {
    "some_stuff": "Rhyzio",
    "entry": "Organic",
    "entryTwo": "Self-enabling incremental local area network"
    }
  },
  {
    title: 'Yet Web Stuff',
    projectId: 2,
    datatypeId: 1,
    visible: true,
    categoryId: 2,
    data: {
  "some_stuff": "Oyoba",
  "entry": "Multi-channelled",
  "entryTwo": "Synergistic encompassing circuit"
    }
  },
  {
    title: 'Yet Web Stuff Two Dude',
    projectId: 2,
    datatypeId: 2,
    visible: true,
    categoryId: 2,
    data: {
  "some_stuff": "Rhyzio",
  "entry": "Organic",
  "entryTwo": "Self-enabling incremental local area network"
  }
}
,
// start some new entries here
  {
    title: 'Some Web Stuff',
    projectId: 3,
    datatypeId: 1,
    visible: true,
    categoryId: 3,
    data: {
  "some_stuff": "Oyoba",
  "entry": "Multi-channelled",
  "entryTwo": "Synergistic encompassing circuit"
    }
  },
  {
    title: 'Some Web Stuff Two',
    projectId: 4,
    datatypeId: 2,
    visible: true,
    categoryId: 3,
      data: {
    "some_stuff": "Rhyzio",
    "entry": "Organic",
    "entryTwo": "Self-enabling incremental local area network"
    }
  },
  {
    title: 'Yet Web Stuff',
    projectId: 5,
    datatypeId: 1,
    visible: true,
    categoryId: 4,
    data: {
  "some_stuff": "Oyoba",
  "entry": "Multi-channelled",
  "entryTwo": "Synergistic encompassing circuit"
    }
  },
  {
    title: 'Yet Web Stuff Two Dude',
    projectId: 6,
    datatypeId: 2,
    visible: true,
    categoryId: 4,
    data: {
  "some_stuff": "Rhyzio",
  "entry": "Organic",
  "entryTwo": "Self-enabling incremental local area network"
  }
},
// third block of entries
{
  title: 'Some Web Stuff',
  projectId: 7,
  datatypeId: 1,
  visible: true,
  categoryId: 5,
  data: {
"some_stuff": "Oyoba",
"entry": "Multi-channelled",
"entryTwo": "Synergistic encompassing circuit"
  }
},
{
  title: 'Some Web Stuff Two',
  projectId: 8,
  datatypeId: 2,
  visible: true,
  categoryId: 5,
    data: {
  "some_stuff": "Rhyzio",
  "entry": "Organic",
  "entryTwo": "Self-enabling incremental local area network"
  }
},
{
  title: 'Yet Web Stuff',
  projectId: 9,
  datatypeId: 1,
  visible: true,
  categoryId: 4,
  data: {
"some_stuff": "Oyoba",
"entry": "Multi-channelled",
"entryTwo": "Synergistic encompassing circuit"
  }
},
{
  title: 'Yet Web Stuff Two Dude',
  projectId: 10,
  datatypeId: 2,
  visible: true,
  categoryId: 4,
  data: {
"some_stuff": "Rhyzio",
"entry": "Organic",
"entryTwo": "Self-enabling incremental local area network"
}
}
]

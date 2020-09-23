export const users = [
  {
    id: 1,
    name: "Alice Blue",
    firstname: "Alice",
    lastname: "Blue",
    email: "aliceblue@example.com",
    avatar: `/static/doc-images/lists/ali.jpg`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "success",
      icon: "check_circle"
    }
  },
  {
    id: 2,
    name: "Jack Johnson",
    firstname: "Jack",
    lastname: "Johnson",
    email: "jack@example.com",
    avatar: `/static/doc-images/lists/men1.png`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "success",
      icon: "check_circle"
    }
  },
  {
    id: 3,
    name: "Bruce Canta",
    firstname: "Bruce",
    lastname: "Canta",
    email: "bruce@example.com",
    avatar: `/static/doc-images/lists/jack.png`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "warning",
      icon: "access_time"
    }
  },
  {
    id: 4,
    name: "Camelia Lopez",
    firstname: "Camelia",
    lastname: "Lopez",
    email: "camelia@example.com",
    avatar: `/static/doc-images/lists/julieta.png`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "grey",
      icon: "not_interested"
    }
  },
  {
    id: 5,
    name: "Denis Richard",
    firstname: "Denis",
    lastname: "Richard",
    email: "denis@example.com",
    avatar: `/static/doc-images/lists/2.jpg`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "secondary",
      icon: "stars"
    }
  },
  {
    id: 6,
    name: "Mia Willson",
    firstname: "Mia",
    lastname: "Willson",
    email: "mia@example.com",
    avatar: `/static/doc-images/lists/lily.png`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "success",
      icon: "check_circle"
    }
  }
];

export const authUser = users[0];

export const conversation = [
  {
    id: 1,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "We are planning to move with GrapQL API with Board section. What do you think on it",
    created_at: 1528104070
  },
  {
    id: 2,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "I mean for scrum board. A part from this, I have design some layouts in Sketch for it. Did you get chance to see those?",
    created_at: 1528104071
  },
  {
    id: 3,
    group_id: 1,
    user_id: 1,
    user: authUser,
    message: `Yeah, that's really sounds good. I loved it. Can you please connet with Mia for further implementation?`,
    created_at: 1528104072
  },
  {
    id: 4,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "I am scheduling a meeting with Team today at 5:00PM. Hope you are available.",
    created_at: 1528104073
  },
  {
    id: 5,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "I also need your assistance for GraphQL API structuring. Are you gonna make APIs in Laravel for it?",
    created_at: 1528104074
  },
  {
    id: 6,
    group_id: 2,
    user_id: 3,
    user: users[2],
    message: `I have started reviewing <b>MaterialCSS</b> framework. It seems that they have improved the Framework.`,
    created_at: 1528104074
  },
  {
    id: 7,
    group_id: 2,
    user_id: 3,
    user: users[2],
    message:
      "How do you plan for Forge Admin new version, we need to talk about his.",
    created_at: 1528104075
  },
  {
    id: 8,
    group_id: 2,
    user_id: 3,
    user: authUser,
    message:
      "Sure, we can arrage a meeting tomorrow in the morning. I have planned a few things. I will share you details tomorrow. Will it be fine?",
    created_at: 1528104076
  },
  {
    id: 9,
    group_id: 3,
    user_id: 3,
    user: users[3],
    message: `We are planning some activities in this weekends. So you can provide your inputs.`,
    created_at: 1528104075
  },
  {
    id: 10,
    group_id: 3,
    user_id: 3,
    user: users[3],
    message: `let's play Table-Tennis in the evening, after that we can discuss about the weekends suggestions. What do you say?`,
    created_at: 1528104076
  },
  {
    id: 11,
    group_id: 4,
    user_id: 4,
    user: users[4],
    message: `we have received a mail from Envato regarding new Taxation policy. Once you get chance to have look into that.`,
    created_at: 1528104076
  },
  {
    id: 12,
    group_id: 5,
    user_id: 5,
    user: users[5],
    message: `Forge Admin needs some improvements in designs. We have very nice features, but old design is factor of less sales.`,
    created_at: 1528104076
  },
  {
    id: 13,
    group_id: 5,
    user_id: 5,
    user: users[5],
    message: `We need to think about this.`,
    created_at: 1528104077
  },
  {
    id: 14,
    group_id: 5,
    user_id: 5,
    user: users[5],
    message: `As I know - Bruce is reviewing the details for MaterialCSS. Let me know once you planned a meeting.`,
    created_at: 1528104078
  }
];

export const groups = [
  {
    id: 1,
    user: {
      ...users[1],
      last_message: "Jan 20 , 2018"
    },
    unread: 2
  },
  {
    id: 2,
    user: {
      ...users[2],
      last_message: "Jan 20 , 2018"
    },
    unread: 0
  },
  {
    id: 3,
    user: {
      ...users[3],
      last_message: "Jan 20 , 2018"
    },
    unread: 2
  },
  {
    id: 4,
    user: {
      ...users[4],
      last_message: "Jan 20 , 2018"
    },
    unread: 0
  },
  {
    id: 5,
    user: {
      ...users[5],
      last_message: "Jan 20 , 2018"
    },
    unread: 3
  }
];

export const defaultUserPic = "/static/default/user.svg";

export const orderList = [
  { 
    id:0,
    value: false,
    name: "Offer",
    commodity: "Sorghum",
    date: "06/03",
    deliveryPeriod: "09/26",
    volume: 500,
    price: "$200.00",
    detailData: []
  },
  {
    id:1,
    value: false,
    name: "C.Bid",
    commodity: "Sorghum",
    date: "06/02",
    deliveryPeriod: "08/14",
    volume: 500,
    price: "$200.00",
    detailData: [],
    
  },
  {
    id:2,
    value: false,
    name: "Bid",
    commodity: "Sorghum",
    date: "06/02",
    deliveryPeriod: "09/16",
    volume: 500,
    price: "$200.00",
    detailData: []

  },
  { 
    id:3,
    value: false,
    name: "C.Offer",
    commodity: "",
    date: "06/02",
    deliveryPeriod: "10/22",
    volume: 500,
    price: "$200.00",
    detailData: []

  },
  { 
    id:4,
    value: false,
    name: "SPREAD",
    commodity: "",
    date: "06/07",
    deliveryPeriod: "",
    volume: 1000,
    price: "$200.00",
    detailData: [
      {
        value: false,
        name: "BUY",
        commodity: "Sorghum",
        date: "",
        deliveryPeriod: "",
        volume: "",
        price: "",
      },
      {
        value: false,
        name: "SELL",
        commodity: "Sorghum",
        date: "",
        deliveryPeriod: "",
        vol: "",
        price: "",
      }

    ]

  }

];

export const trades = [
  { 
    id:0,
    value: false,
    tradType: "BUY",
    commodity: "Sorghum",
    commodityGrade: "APW Wheat CSC-11",
    deliveryPeriod: "winter 2020",
    deliveryPoint: "BNE Ex Farm",
    volume: 500,
    price: "$200.00",
    expires: 11,
    isExpired: true,
    detailData: []
  },
  {
    id:1,
    value: false,
    tradType: "SELL",
    commodity: "Sorghum",
    commodityGrade: "APW Wheat CSC-11",
    deliveryPeriod: "02/03",
    deliveryPoint: "BNE T/M/A",
    volume: 1500,
    price: "$200.00",
    expires: 32,
    isExpired: false,
    detailData: [],
    
  },
  {
    id:2,
    value: false,
    tradType: "SELL",
    commodity: "Wheat",
    commodityGrade: "APW Wheat CSC-11",
    deliveryPeriod: "02/03",
    deliveryPoint: "BNE T/M/A",
    volume: 500,
    price: "$200.00",
    expires: 44,
    isExpired: true,
    detailData: []

  },
  { 
    id:3,
    value: false,
    tradType: "SPREAD",
    commodity: "",
    commodityGrade: "APW Wheat CSC-11",
    deliveryPeriod: "02/03",
    deliveryPoint: "BNE T/M/A",
    volume: 500,
    price: "$200.00",
    expires: 56,
    isExpired: false,
    detailData: [
      {
        value: false,
        tradType: "BUY",
        commodity: "Sorghum",
        deliveryPoint: "BNE T/M/A",
        deliveryPeriod: "",
        volume: "",
        price: "",
      },
      {
        value: false,
        tradType: "SELL",
        commodity: "Sorghum",
        deliveryPoint: "BNE T/M/A",
        deliveryPeriod: "",
        volume: "",
        price: "",
      }

    ]

  }

];

export const commodities = [
  {
    name: "Wheat",
    description: "",
    public: true,
    noOfMarket: 5,
    grades: [
      {
        name: "APW Wheat CSC-11",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-XY",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-AB",
        description: "",
        public: true,
        primary: false,
      },
      {
        name: "FR Wheat GRADEZ",
        description: "",
        public: false,
        primary: false,
      },
    ]
  },
  {
    name: "Sorghum",
    description: "",
    public: true,
    noOfMarket: 5,
    grades: [
      {
        name: "APW Wheat CSC-11",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-XY",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-AB",
        description: "",
        public: true,
        primary: false,
      },
      {
        name: "FR Wheat GRADEZ",
        description: "",
        public: false,
        primary: false,
      },
    ]
  },
  {
    name: "Rice",
    description: "",
    public: true,
    noOfMarket: 5,
    grades: [
      {
        name: "APW Wheat CSC-11",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-XY",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-AB",
        description: "",
        public: true,
        primary: false,
      },
      {
        name: "FR Wheat GRADEZ",
        description: "",
        public: false,
        primary: false,
      },
    ]
  },
  {
    name: "Maize",
    description: "",
    public: true,
    noOfMarket: 4,
    grades: [
      {
        name: "APW Wheat CSC-11",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-XY",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-AB",
        description: "",
        public: true,
        primary: false,
      },
      {
        name: "FR Wheat GRADEZ",
        description: "",
        public: false,
        primary: false,
      },
    ]
  },
  {
    name: "Ryco",
    description: "",
    public: false,
    noOfMarket: 2,
    grades: [
      {
        name: "APW Wheat CSC-11",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-XY",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-AB",
        description: "",
        public: true,
        primary: false,
      },
      {
        name: "FR Wheat GRADEZ",
        description: "",
        public: false,
        primary: false,
      },
    ]
  },
  {
    name: "Soya",
    description: "",
    public: true,
    noOfMarket: 6,
    grades: [
      {
        name: "APW Wheat CSC-11",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-XY",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-AB",
        description: "",
        public: true,
        primary: false,
      },
      {
        name: "FR Wheat GRADEZ",
        description: "",
        public: false,
        primary: false,
      },
    ]
  },
  {
    name: "Fraco",
    description: "",
    public: false,
    noOfMarket: 0,
    grades: [
      {
        name: "APW Wheat CSC-11",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-XY",
        description: "",
        public: true,
        primary: true,
      },
      {
        name: "APW Wheat GRADE-AB",
        description: "",
        public: true,
        primary: false,
      },
      {
        name: "FR GRADEZ",
        description: "",
        public: false,
        primary: false,
      },
    ]
  },

]

export const companies = [
  {
    first: users[1].firstname,
    last: users[1].lastname,
    nickname: null,
    email: users[1].email,
    avatar: users[1].avatar,
    contactnumber: "+617-555-0135",
    company: null,
    job: null,
    birthdate: null,
    address: null,
    notes: null,
    is_favourite: false,
    is_frequent: false,
    selected: false
  },
  {
    first: users[2].firstname,
    last: users[2].lastname,
    nickname: null,
    email: users[2].email,
    avatar: users[2].avatar,
    contactnumber: "+617-555-0135",
    company: null,
    job: null,
    birthdate: null,
    address: null,
    notes: null,
    is_favourite: true,
    is_frequent: false,
    selected: false
  },
  {
    first: users[3].firstname,
    last: users[3].lastname,
    nickname: null,
    email: users[3].email,
    avatar: users[3].avatar,
    contactnumber: "+617-555-0135",
    company: null,
    job: null,
    birthdate: null,
    address: null,
    notes: null,
    is_favourite: true,
    is_frequent: true,
    selected: false
  },
  {
    first: users[4].firstname,
    last: users[4].lastname,
    nickname: null,
    email: users[4].email,
    avatar: users[4].avatar,
    contactnumber: "+617-555-0135",
    company: null,
    job: null,
    birthdate: null,
    address: null,
    notes: null,
    is_favourite: true,
    is_frequent: true,
    selected: false
  },
  {
    first: users[5].firstname,
    last: users[5].lastname,
    nickname: null,
    email: users[5].email,
    avatar: users[5].avatar,
    contactnumber: "+617-555-0135",
    company: null,
    job: null,
    birthdate: null,
    address: null,
    notes: null,
    is_favourite: true,
    is_frequent: true,
    selected: false
  }
]


export const group = [
  {
    id: 1,
    name: "Primary",
    parties: 3,
  },
  {
    id: 2,
    name: "Secondary",
    parties: 2,
  },
  {
    id: 3,
    name: "Consumers",
    parties: 5
  }

]

export const countryParties = [
  { 
      id:1,
      companyID: 1,
      companyName: "Adams",
      counterPartyGroupId: 1,
      counterPartyGroupName: "",
      dailyLimit: true,
      dailyVolumeLimit: "5999",
  },
  { 
      id:2,
      companyID: 2,
      companyName: "ADM",
      counterPartyGroupId: 2,
      counterPartyGroupName: "",
      dailyLimit: false,
      dailyVolumeLimit: null,
  },
  { 
      id:3,
      companyID: 3,
      companyName: "Allianc",
      counterPartyGroupId: 3,
      counterPartyGroupName: "",
      dailyLimit: false,
      dailyVolumeLimit: null,
  },
  { 
    id:4,
    companyID: 4,
    companyName: "Asca",
    counterPartyGroupId: 1,
    counterPartyGroupName: "",
    dailyLimit: true,
    dailyVolumeLimit: "5351",
  },

]

export const markets = {
  market: "Wheat",
  deliveryPoints: [
    {
      deliveryPointId: 0,
      deliveryPoint: "Brisbane Ex-Farm",
      bookmarked: true,
      grades: [
        {
          grade: "APW Wheat CSC-11",
          deliveryPeriods: [
            {
              deliveryPeriodId: 0,
              deliveryPeriod: "Winter 2020",
              leadingOffers: [
                {
                  id: 0,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat CSC-11",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Brisbane Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 2000,
                  price: "$100.00",
                },
                {
                  id: 1,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat CSC-11",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Brisbane Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 1000,
                  price: "$95.00",
                }
              ],
              leadingBids: [
                {
                  id: 0,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat CSC-11",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Brisbane Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 2000,
                  price: "$105.00",
                },
                {
                  id: 0,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat CSC-11",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Brisbane Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 1000,
                  price: "$100.00",
                }
              ]
            }
          ]
        },
        {
          grade: "APW Wheat GRADE-XY",
          deliveryPeriods: [
            {
              deliveryPeriodId: 0,
              deliveryPeriod: "Winter 2020",
              leadingOffers: [
                {
                  id: 0,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat GRADE-XY",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Brisbane Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 2000,
                  price: "$100.00",
                },
                {
                  id: 1,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat GRADE-XY",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Brisbane Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 1000,
                  price: "$95.00",
                }
              ],
              leadingBids: [
                {
                  id: 0,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat GRADE-XY",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Brisbane Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 2000,
                  price: "$105.00",
                },
                {
                  id: 1,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat GRADE-XY",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Brisbane Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 1000,
                  price: "$100.00",
                }
              ]
            }
          ]
        }
      ]
    },
    {
      deliveryPointId: 1,
      deliveryPoint: "Newcastle Ex-Farm",
      bookmarked: true,
      grades: [
        {
          grade: "APW Wheat CSC-11",
          deliveryPeriods: [
            {
              deliveryPeriodId: 0,
              deliveryPeriod: "Winter 2020",
              leadingOffers: [
                {
                  id: 0,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat CSC-11",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Newcastle Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 2000,
                  price: "$100.00",
                },
                {
                  id: 1,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat CSC-11",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Newcastle Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 1000,
                  price: "$95.00",
                }
              ],
              leadingBids: [
                {
                  id: 0,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat CSC-11",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Newcastle Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 2000,
                  price: "$105.00",
                },
                {
                  id: 1,
                  tradType: "",
                  commodity: "",
                  commodityGrade: "APW Wheat CSC-11",
                  deliveryPeriod: "winter 2020",
                  deliveryPoint: "Newcastle Ex-Farm",
                  expires: 11,
                  isExpired: true,
                  volume: 1000,
                  price: "$100.00",
                }
              ]

            }
          ]
        }
      ]
    }
  ]
}

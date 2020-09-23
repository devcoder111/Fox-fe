export default [

  { header: "1 - USER ACCESS / GROWER REGISTRATION & PROFILE", role: "Other" },
  { icon: "bookmark", title: "Sign In", name: "SignIn", path: "/signin", role: "Other"},
  { icon: "bookmark", title: "Grower Registration", name: "Grower", path: "/grower-Registration", role: "Other" },
  { icon: "bookmark", title: "Grower Profile", name: "Profile", path: "/profile", role: "Other" },
  { icon: "bookmark", title: "Grower GROWER FARM ACCESS SETTINGS", name: "growersetting", path: "/grower/setting", role: "Other"},
  { icon: "bookmark", title: "Buyers", name: "Buyers", path: "/buyers", role: "Other"},
  { icon: "bookmark", title: "RESET PASSWORD", name: "ResetPassword", path: "/reset/request", role: "Other" },
  { icon: "bookmark", title: "NEW PASSWORD", name: "Newpass", path: "/reset/newpass", role: "Other" },
  // { icon: "bookmark", title: "Flow", name: "Flow", path: "/flow", role: "Other"},
  
  { header: "Home", role: "Broker" },
  { icon: "pages", title: "PROFILE", name: "Trade", path: "/main/trade", role: "Trader"},
  { icon: "bookmark", title: "PROFILE", name: "Profile", path: "/profile", role: "Grower" },
  { icon: "pages", title: "COUNTER PARTIES", name: "CParties", path: "/main/countparties", role: "Other"},
  { icon: "pages", title: "RECENT ORDERS - TRADER", name: "RecentOrders", path: "/main/recent/trader", role: "Other"},
  { icon: "pages", title: "VIEW ORDER", name: "ViewOrder", path: "/main/orderdetail", role: "Other"},
  { icon: "pages", title: "RECENT TRADES", name: "RecentTrades", path: "/main/recent/filter", role: "Other"},
  { icon: "pages", title: "CLIENT / TRADE GROUPS", name: "ClientTrade", path: "/main/countparties", role: "Other"},
  { icon: "pages", title: "GROWER RECENT ORDERS", name: "GrowerOrder", path: "/main/recent/trader", role: "Other"},
  
  { header: "MARKET", role: "Broker" },
  { icon: "grain", title: "COMMODITY SELECTION", name: "CommoditySelection", path: "/market/commodity", role: "Broker"},
  { icon: "location_on", title: "DELIVERY POINT SELECTION", name: "DeliveryPointSelection", path: "/market/delivery", role: "Broker"},
  // { icon: "toys", title: "MARKET", name: "StackedLayout", path: "/stacked_layout", role: "Common"},
  { icon: "dashboard", title: "MARKET TRADE", name: "MarketTrade", path: "/market/trade", role: "Broker"},

  { header: "ORDERS", role: "Trader" },
  { icon: "insert_drive_file", title: "ORDER LIST", name: "OrderList", path: "/order/orderList", role: "Trader"},

  { header: "FLOW", role: "Grower" },
  { icon: "layers", title: "FLOW", name: "Flow", path: "/flow", role: "Grower"},

  { header: "5 - BID/OFFER", role: "Other" },
  { icon: "local_play", title: "NEW BID", name: "NewBid", path: "/new/bid", role: "Other"},
  { icon: "local_play", title: "NEW OFFER", name: "NewOffer", path: "/new/offer", role: "Other"},
  { icon: "local_play", title: "NEW SPREAD OFFER", name: "NewSpread", path: "/new/spread/order", role: "Other"},
  { icon: "local_play", title: "VIEW/EDIT/RE-ISSUE SPREAD", name: "ReissueSpread", path: "/new/spread/reissue-spread", role: "Other"},

  // { header: "6 - ADVICE", role: "Other" },
  // { icon: "face", title: "ADVICE CONFIRMATION", name: "AdviceConfirmation", path: "/advice/confirmation", role: "Other"},

  { header: "ADMIN", role: "Admin" },
  { icon: "domain", title: "Companies", name: "Companies", path: "/admin/companies", role: "Admin" },
  { icon: "contacts", title: "Contacts", name: "Contacts", path: "/admin/contacts", role: "Admin" },
  { icon: "grain", title: "Commodities", name: "Commodities", path: "/admin/commodities", role: "Admin" },
  { icon: "gradient", title: "Commodity Grades", name: "Commodity Grades", path: "/admin/commoditygrades", role: "Admin" },
  { icon: "location_on", title: "Delivery Points", name: "Delivery Points", path: "/admin/deliverypoints", role: "Admin" },
  { icon: "date_range", title: "Delivery Periods", name: "Delivery Periods", path: "/admin/deliveryperiods", role: "Admin" },
  { icon: "book", title: "Broker Markets", name: "Broker Markets", path: "/admin/brokerMarkets", role: "Admin" },
  { icon: "assignment_returned", title: "Registration Queue", name: "registrationQueue", path: "/admin/registrationQueue", role: "Admin" },
  { icon: "headset_mic", title: "Support Queue", name: "supportQueue", path: "/admin/supportQueue", role: "Admin" },
  { icon: "donut_large", title: "Circular Trades", name: "circularTrades", path: "/admin/circularTrades", role: "Admin" },
  { icon: "settings", title: "System Settings", name: "SystemSettings", path: "/admin/settings", role: "Admin" },

  { header: "BROKER", role: "Common" },
  { icon: "dashboard", title: "MARKET", name: "StackedLayout", path: "/stacked_layout", role: "Common"},
  { icon: "receipt", title: "ADVICE CONFIRMATION", name: "AdviceConfirmation", path: "/advice/confirmation", role: "Common"},
  { icon: "attach_money", title: "INVOICES", name: "InvoiceReport", path: "/advice/invoices", role: "Common"},
  { icon: "compare_arrows", title: "TRANSACTIONS", name: "TransactionReport", path: "/advice/transactions", role: "Common"},
  
];

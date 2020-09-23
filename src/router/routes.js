import AppSidebar from "@/layouts/App/NavDrawer";
import AppFooter from "@/layouts/App/Footer";
import Signin from "@/views/SignInPage";
import GrowerRegistration from "@/views/Grower/GrowerRegistration";
import Profile from "@/views/Profile";
import Buyers from "@/views/Buyer/Buyers";
import Flow from "@/views/Flow";
import Bookmark from "@/views/Bookmark";
import Growersetting from "@/views/Grower/Growersetting";
import ResetPassword from "@/views/ResetPassword";
import NewPassword from "@/views/NewPassword";
import TradeMain from "@/views/Mains/TradeMain";
import CounterParties from "@/views/Mains/CounterParties";
import RecentOrdersTrade from "@/views/Mains/RecentOrdersTrade";
import OrderDetail from "@/views/Mains/OrderDetail";
import RecentTradeFilter from "@/views/Mains/RecentTradeFilter";
import ClientTradeGroups from "@/views/Mains/ClientTradeGroups";
import RecentOrdersGrower from "@/views/Mains/RecentOrdersGrower";
import OrderList from "@/views/Order/OrderList";
import CommoditySelection from "@/views/Market/CommoditySelection";
import DeliveryPointSelection from "@/views/Market/DeliveryPointSelection";
import MarketTradeScreen from "@/views/Market/MarketTradeScreen";
import NewBid from "@/views/BidOffer/NewBid";
import NewOffer from "@/views/BidOffer/NewOffer";
import NewSpreadOrder from "@/views/BidOffer/NewSpreadOrder";
import ReIssueSpread from "@/views/BidOffer/ReIssueSpread";
import AdviceConfirmation from "@/views/AdviceConfirmation"
import TransactionReport from "@/views/TransactionReport"
import CircularTrades from "@/views/Admin/CircularTrades"
import InvoiceReport from "@/views/InvoiceReport"
import Companies from "@/views/Admin/Companies"
import Contacts from "@/views/Admin/Contacts"
import Commodities from "@/views/Admin/Commodities"
import CommodityGrades from "@/views/Admin/CommodityGrades"
import DeliveryPeriods from "@/views/Admin/DeliveryPeriods"
import DeliveryPoints from "@/views/Admin/DeliveryPoints"
import BrokerMarkets from "@/views/Admin/BrokerMarkets"
import RegistrationQueue from "@/views/Admin/RegistrationQueue"
import SupportQueue from "@/views/Admin/SupportQueue"
import SystemSettings from "@/views/Admin/Settings"
import StackedLayout from "@/views/StackedLayout"

export const routes = [
  { path: "/", redirect: "/signin" },

  // 1. USER ACCESS / GROWER REGISTRATION & PROFILE
  {
    path: "/signin",
    name: "SignIn",
    components: {
      default: Signin,
    }
  },
  {
    path: "/grower-Registration",
    name: "Grower Registration",
    components: {
      default: GrowerRegistration,
    }
  },
  {
    path: "/profile",
    name: "Profile",
    components: {
      default: Profile,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },
  {
    path: "/grower/setting",
    name: "growersetting",
    components: {
      default: Growersetting,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },
  {
    path: "/buyers",
    name: "Buyers",
    components: {
      default: Buyers,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },
  {
    path: "/reset/request",
    name: "Resetpass",
    components: {
      default: ResetPassword,
    }
  },
  {
    path: "/reset/newpass",
    name: "Newpass",
    components: {
      default: NewPassword,
    }
  },
  {
    path: "/flow",
    name: "Flow",
    components: {
      default: Flow,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  // 2 MAIN SCREENS / PROFILE

  {
    path: "/main/trade",
    name: "Trade",
    components: {
      default: TradeMain,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },
  {
    path: "/main/countparties",
    name: "CParties",
    components: {
      default: CounterParties,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },
  {
    path: "/main/recent/trader",
    name: "RecentOrders",
    components: {
      default: RecentOrdersTrade,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },
  {
    path: "/main/orderdetail/:id",
    name: "ViewOrder",
    components: {
      default: OrderDetail,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    props: { default: true, sidebar: false, footer: false }
  },
  {
    path: "/main/recent/filter",
    name: "RecentTrades",
    components: {
      default: RecentTradeFilter,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },
  {
    path: "/main/countparties",
    name: "ClientTrade",
    components: {
      default: ClientTradeGroups,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },
  {
    path: "/main/recent/trader",
    name: "GrowerOrder",
    components: {
      default: RecentOrdersGrower,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  // 3 - ORDER FLOW
  {
    path: "/order/orderList",
    name: "OrderList",
    components: {
      default: OrderList,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  // 4 - MARKET

  {
    path: "/market/commodity",
    name: "CommoditySelection",
    components: {
      default: CommoditySelection,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  {
    path: "/market/delivery",
    redirect: "/market/commodity"
  },

  {
    path: "/market/delivery/:commName/:commId",
    name: "DeliveryPointSelection",
    components: {
      default: DeliveryPointSelection,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    props: { default: true, sidebar: false, footer: false }
  },

  {
    path: "/market/trade",
    name: "Market",
    components: {
      default: MarketTradeScreen,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
  },

  {
    path: "/market/trade/:commName/:pointName/:bookmark",
    name: "Market",
    components: {
      default: MarketTradeScreen,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    props: { default: true, sidebar: false, footer: false }
  },

  // 5 - BID/OFFER

  {
    path: "/new/bid",
    name: "NewBid",
    components: {
      default: NewBid,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  {
    path: "/new/offer",
    name: "NewOffer",
    components: {
      default: NewOffer,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  {
    path: "/new/spread/order",
    name: "NewSpread",
    components: {
      default: NewSpreadOrder,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  {
    path: "/new/spread/reissue-spread",
    name: "ReissueSpread",
    components: {
      default: ReIssueSpread,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  // Stacked layout
  {
    path: "/stacked_layout",
    name: "StackedLayout",
    components: {
      default: StackedLayout,
      sidebar: AppSidebar,
      footer: AppFooter,

    }
  },

  {
    path: "/advice/confirmation",
    name: "AdviceConfirmation",
    components: {
      default: AdviceConfirmation,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  {
    path: "/advice/invoices",
    name: "InvoiceReport",
    components: {
      default: InvoiceReport,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  //Advice
  {
    path: "/advice/transactions",
    name: "TransactionReport",
    components: {
      default: TransactionReport,
      sidebar: AppSidebar,
      footer: AppFooter,
    }
  },

  //ADMIN
  {
    path: "/admin/companies",
    components: {
      default: Companies,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "Companies"
  },
  {
    path: "/admin/contacts",
    components: {
      default: Contacts,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "Contacts"
  },
  {
    path: "/admin/commodities",
    components: {
      default: Commodities,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "Commodities"
  },
  {
    path: "/admin/commodityGrades",
    components: {
      default: CommodityGrades,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "CommodityGrades"
  },
  {
    path: "/admin/deliveryPoints",
    components: {
      default: DeliveryPoints,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "DeliveryPoints"
  },
  {
    path: "/admin/deliveryPeriods",
    components: {
      default: DeliveryPeriods,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "DeliveryPeriods"
  },
  {
    path: "/admin/brokerMarkets",
    components: {
      default: BrokerMarkets,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "BrokerMarkets"
  },
  {
    path: "/admin/registrationQueue",
    components: {
      default: RegistrationQueue,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "RegistrationQueue"
  },
  {
    path: "/admin/supportQueue",
    components: {
      default: SupportQueue,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "SupportQueue"
  },
  {
    path: "/admin/circularTrades",
    components: {
      default: CircularTrades,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "CircularTrades"
  },
  
  {
    path: "/admin/settings",
    components: {
      default: SystemSettings,
      sidebar: AppSidebar,
      footer: AppFooter,
    },
    name: "Settings"
  },
];

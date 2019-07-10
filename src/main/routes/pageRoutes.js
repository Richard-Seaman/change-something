import About from "../components/about/About";
import Privacy from "../components/privacy/Privacy";
import Contact from "../components/contact/Contact";
import Disclaimer from "../components/disclaimer/Disclaimer";
import PV from "../components/pv/PV";
import ListPledges from "../components/pledge/ListPledges";
import EditPledge from "../components/pledge/EditPledge";
import Home from "../components/home/Home";
import Test from "../components/Test";

export default [
  { path: "/test", component: Test },
  { path: "/contact", component: Contact },
  { path: "/disclaimer", component: Disclaimer },
  { path: "/privacy", component: Privacy },
  { path: "/about", component: About },
  { path: "/pledges/:pledgeId", component: EditPledge },
  { path: "/pledges", component: ListPledges },
  { path: "/pv", component: PV },
  { path: "/", component: Home }
];

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const links = {
    headerNavLinks: [
        { name: "/", href: "/", title: "Home", icon: undefined },
        { name: "/editor", href: "/editor", title: "Create", icon: undefined },
        // { name: "/dashboard", href: "/dashboard", title: "Dashboard", icon: undefined },
        { name: "/cart", href: "/cart", title: "Cart", icon: ShoppingCartIcon }, 
        { name: "/account", href: "/account", title: "Account", icon: AccountCircleIcon },
        // { name: "/faq", href: "/faq", title: "FAQ", icon: undefined },
        // { name: "/contact", href: "/contact", title: "Contact", icon: undefined },
    ],
    mainComponentLinks: [
        { name: "View the Editor", href: "/editor", title: "Get Started", icon: undefined },
        {
            name: "Templates",
            href: "/templates",
            title: "Templates", 
            icon: undefined
        },
        { name: "Frequently Asked Questions", href: "/faq", title: "FAQ", icon: undefined },
    ],
}

export default links

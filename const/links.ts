import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const links = {
    headerNavLinks: [
        { name: "/", href: "/", title: "Home", icon: undefined },
        { name: "/cart", href: "/cart", title: "Cart", icon: ShoppingCartIcon }, 
        { name: "/account", href: "/account", title: "Account", icon: AccountCircleIcon },
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

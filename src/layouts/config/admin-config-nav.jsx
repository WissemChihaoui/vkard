import { chartPie, cube, identification, userGroup, shoppingCart } from "../../assets/admin";
import { paths } from "../../routes/paths";

export const navData = [
    {
        subheader: "Tableau de bord",
        items: [
            { title: 'Tableau de bord', path: paths.admin.root, icon: <img src={chartPie} />},
            { title: 'Commandes', path: paths.admin.orders.root, icon: <img src={cube} />},
            { title: 'Clients', path: paths.admin.clients.root, icon: <img src={userGroup} />},
            { title: 'V-Cards', path: paths.admin.cards, icon: <img src={identification} />},
            { title: 'Cards', path: paths.admin.cardsEdit.root, icon: <img src={shoppingCart} />},
        ]
    }
]
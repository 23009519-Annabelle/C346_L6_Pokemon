import { faBolt, faTint, faFire, faLeaf } from '@fortawesome/free-solid-svg-icons';

const datasource = [
    {
        title: "ELECTRIC",
        bgcolor: '#FFD700',
        textColor: '#CC9900',
        icon: faBolt,
        data: [
            { key: 'Pikachu', cardNumber: 25 },
            { key: 'Voltorb', cardNumber: 100 },
        ]
    },
    {
        title: "FIRE",
        bgcolor: '#FF4500',
        textColor: '#B33D00',
        icon: faFire,
        data: [
            { key: 'Charmander', cardNumber: 4 },
            { key: 'Growlithe', cardNumber: 58 },
        ]
    },
    {
        title: "WATER",
        bgcolor: '#1E90FF',
        textColor: '#1A75D1',
        icon: faTint,
        data: [
            { key: 'Squirtle', cardNumber: 7 },
            { key: 'Psyduck', cardNumber: 54 },
        ]
    },
    {
        title: "GRASS",
        bgcolor: '#32CD32',
        textColor: '#2B7F2B',
        icon: faLeaf,
        data: [
            { key: 'Bulbasaur', cardNumber: 1 },
            { key: 'Oddish', cardNumber: 43 },
        ]
    },
];



export { datasource };
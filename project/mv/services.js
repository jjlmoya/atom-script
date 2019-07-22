import {icons} from './icon';

const filters = [
    {
        id: 'work',
        cta: 'ABC',
        svg: icons.work,
        brand: '',
    }
];
const categories = [
    {
        id: 'relax',
        cta: 'Relax',
        svg: icons.relax,
        brand: ''
    }, {
        id: 'work',
        cta: 'Trabajo',
        svg: icons.work,
        brand: '',
    }];

const subcategories = [
    {
        id: 'ski',
        cta: 'Esquí',
        svg: icons.ski,
        brand: '',
        categories: ['sports']
    }
];

const offers = [
    {
        "bhc": 23926,
        "name": "Comfort Inn",
        "gym": 58,
        "climatizedpool": 101
    },
    {
        "bhc": 23927,
        "name": "Rodeway Inn"
    },
    {
        "bhc": 23928,
        "name": "Magic Pas",
        "gym": 58
    },
    {
        "bhc": 23930,
        "name": "Econo Lodge, Main Street, Marion"
    },
    {
        "bhc": 23931,
        "name": "Comfort Inn & Suites",
        "gym": 58,
        "climatizedpool": 101
    },
    {
        "bhc": 23368,
        "name": "Jutlandia"
    },
    {
        "bhc": 23369,
        "name": "Crowne Plaza Fredericton Lord Beaverbrook",
        "gym": 58,
        "climatizedpool": 101,
        "seapool": 184
    },
    {
        "bhc": 23371,
        "name": "Holiday Inn Express Whitby Oshawa",
        "gym": 58
    },
    {
        "bhc": 23372,
        "name": "Kaikoura Gateway Motor Lodge"
    }
];

export const GetCategories = () => categories;

export const GetSubcategories = () => subcategories;

export const GetFilters = () => filters;

export const GetOffers = () => offers;
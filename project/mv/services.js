import {icons} from './icon';

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
    },
    {
        id: 'sport',
        cta: 'Deporte',
        svg: icons.sports,
        brand: '',
    },
    {
        id: 'party',
        cta: 'Ocio',
        svg: icons.party,
        brand: '',
    },
    {
        tag: 'culture',
        cta: 'Cultural',
        svg: icons.cultural,
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

export const GetCategories = () => categories;

export const GetSubcategories = () => subcategories;
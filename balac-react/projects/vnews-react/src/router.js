import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Category from './scripts/category.js';

const routes = Category.map((category) => ({
	path: category.title,
	component: ''
}));
// routes.push({
// 	path: '/',
//     exact: true,
// 	component: '/frontend'
// });

export default routes

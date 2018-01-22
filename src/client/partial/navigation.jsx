import React from 'react';
import { Link } from 'react-router-dom';

export default [
    <li key='cheat'><Link to="/cheatsheets">Cheatsheets</Link></li>,
    <li key='anon'><Link to="/chat">Anonymous questions</Link></li>,
    <li key='faq'><Link to='/faq'>Hackathon FAQ</Link></li>,
    <li key='gh'><a href="https://github.com/hjfitz/bootcamp">Github</a></li>,
];
import { hasOwn } from './index';

export function isVNode (node) {
    return typeof node === 'object' && hasOwn(node, 'componentOption');
};

export function getFirstComponentChild (children) {
    return children && children.filter(c => c && tag)[0];
};
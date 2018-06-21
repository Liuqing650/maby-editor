import getCurrentBlockquote from './getCurrentBlockquote';
const isSelectionInBlockquote = (value) => {
    return Boolean(getCurrentBlockquote(value));
}
export default isSelectionInBlockquote;

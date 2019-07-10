export default value => {
    const integer = (value || '').replace(/\D/g, '');

    return integer.length ? parseInt(integer, 10) : 0;
};

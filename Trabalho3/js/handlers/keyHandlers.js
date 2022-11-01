let keys = []

const actions = {
    w: () => head.rotate('y', 0.1),
    e: () => arms.right.rotate('x', -0.1),
    d: () => forearms.right.rotate('x', -0.1),
    c: () => hands.right.rotate('y', -0.1),
    q: () => arms.left.rotate('x', -0.1),
    a: () => forearms.left.rotate('x', -0.1),
    z: () => hands.left.rotate('y', -0.1),
    E: () => legs.right.rotate('x', -0.1),
    D: () => calfs.right.rotate('x', -0.1),
    C: () => foots.right.rotate('y', -0.1),
    Q: () => legs.left.rotate('x', -0.1),
    A: () => calfs.left.rotate('x', -0.1),
    Z: () => foots.left.rotate('y', -0.1)
}

const onKeyDown = ({ key }) => {
    if (!keys.includes(key)) keys.push(key);

    keys.forEach(key =>{
        const action = actions[key];

        if(action) action()
    })
};

const onKeyUp = ({ key }) => keys = keys.filter(k => key !== k);